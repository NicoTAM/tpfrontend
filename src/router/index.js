import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import ProductDashboard from '../views/ProductDashboard.vue'
import {isTokenExpired} from '@/auth';
/*import { hasPrivilege, isTokenExpired} from '@/auth';*/

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
    /*meta: { requiredPrivileges: ['Administrator', 'ProductAdministrator'] }*/
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

router.beforeEach((to, from, next) => {
 /* const { requiredPrivileges } = to.meta;*/

  if (to.path !== '/' && isTokenExpired()) {
    alert('Tu sesión ha expirado, por favor inicia sesión de nuevo.');
    return next('/');
}

  /*if (requiredPrivileges && !hasPrivilege(requiredPrivileges)) {
      alert('No tienes permiso para acceder a esta página.');
      return history();
  }*/
  next();
});

export default router;
