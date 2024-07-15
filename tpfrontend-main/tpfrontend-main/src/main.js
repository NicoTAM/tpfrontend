import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
Axios.defaults.baseURL = 'https://localhost:7296/api'
var token = localStorage.getItem('token');
if (token){
  Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, Axios)



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
