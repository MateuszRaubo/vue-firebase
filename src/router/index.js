import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// eslint-disable-next-line import/no-cycle
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter(to, from, next) {
      if (store.getters.isAuth) {
        next();
      } else if (localStorage.getItem('token')) {
        next('/');
      } else {
        next('/sign-in');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes,
});

export default router;
