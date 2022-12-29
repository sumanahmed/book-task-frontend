import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './plugins'

import { router } from './router'
import store from './store'

Vue.prototype.$image_path = 'https://localhost:8000/';
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

//if unauthenticated redirect to login page
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    this.$router.push('/login')
  }
  return error;
});

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.vm = vm