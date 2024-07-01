import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import ProductDashboard from '../views/ProductDashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/User',
    name: 'UserDashboard',
    component: UserDashboard,
  },
  {
    path: '/Product',
    name: 'ProductDashboard',
    component: ProductDashboard
  }
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


export default router
