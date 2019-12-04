import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://vue-js-a1361.firebaseio.com';
axios.interceptors.request.use((config => config
));
axios.interceptors.response.use(res => res);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
