import Vue from 'vue';
import Vuex from 'vuex';
import globalAxios from 'axios';
import authAxios from './axios-auth';
// eslint-disable-next-line import/no-cycle
import router from '../router';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    appApiKey: 'AIzaSyDJ9EBc1mm14Zlx6UOTWFKPOXtnrfIGnQQ',
    idToken: null,
    userId: null,
    user: '',
  },
  mutations: {
    authUser(state, payload) {
      state.idToken = payload.token;
      state.userId = payload.userId;
    },
    storeUser(state, payload) {
      state.user = payload;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    },
  },
  actions: {
    setLogoutTimer({ commit }, payload) {
      setTimeout(() => {
        commit('clearAuthData');
        router.replace('/signin');
      }, payload * 1000);
    },
    signUp({ commit, dispatch }, payload) {
      console.log('signup');
      authAxios.post(`/accounts:signUp?key=${this.state.appApiKey}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }).then((res) => {
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        const now = new Date();
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        const data = payload;
        delete data.password;
        delete data.confirmPassword;
        commit('storeUser', data);
        dispatch('storeUser', data);
        dispatch('setLogoutTimer', res.data.expiresIn);
        router.replace('/dashboard');
      }).catch((err) => {
        console.log(err);
      });
    },
    login({ commit, dispatch }, payload) {
      authAxios.post(`/accounts:signInWithPassword?key=${this.state.appApiKey}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }).then((res) => {
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        const now = new Date();
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch('setLogoutTimer', res.data.expiresIn);
        dispatch('fetchUser');
        router.replace('/dashboard');
      }).catch((err) => {
        console.log(err);
      });
    },
    autoLogin({ commit, dispatch }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }

      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token,
        userId,
      });
      dispatch('fetchUser');
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');
      router.replace('/');
    },
    storeUser({ state }, payload) {
      if (!state.idToken) {
        return;
      }

      globalAxios.post(`/users/${state.userId}.json?auth=${state.idToken}`, payload).then(() => {
        console.log('User created');
      }).catch(err => console.log(err));
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios.get(`/users/${state.userId}.json?auth=${state.idToken}`).then((res) => {
        const obj = res.data;
        const data = Object.values(obj)[0];
        commit('storeUser', data);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return state.idToken !== null;
    },
  },
});
