<template>
    <div>
      <nav>
        <div class="nav-wrapper">
          <a @click="logout" class="right">LOGOUT</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li><router-link to="/Home">Home</router-link></li>
            <li v-if="hasPrivilege(['Administrator', 'ProductAdministrator'])"><router-link to="/User">Usuarios</router-link></li>
            <li><router-link to="/Product">Productos</router-link></li>
          </ul>
        </div>
      </nav>
  
      <ul class="sidenav" id="mobile-demo">
        <li><router-link to="/Home">Home</router-link></li>
        <li v-if="hasPrivilege(['Administrator', 'ProductAdministrator'])"><router-link to="/User">Usuarios</router-link></li>
        <li><router-link to="/Product">Productos</router-link></li>
      </ul>
    </div>
  </template>
  
<script>
import { hasPrivilege } from '@/auth';
import M from 'materialize-css';
export default{
    name: 'HeaderView',
    methods: {
        hasPrivilege,
        logout(){
            this.$router.push('/');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            
        }
    },
    mounted() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    
    }
}

</script>
<style scoped>
nav{
    height: 100px;
    padding: 20px;
    background-color: grey !important;
}

a:hover{
    cursor: pointer;
}


</style>