<template>
    <div>
        <nav>
            <div class="nav-wrapper">
                <a @click="logout" class="right">LOGOUT</a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li><router-link to="/Home">Home</router-link></li>
                    <!-- <li ><router-link v-if="hasPrivilege(['Administrator','ProductAdministrator'])" to="/User" >Usuarios</router-link></li>-->
                    <li ><router-link to="/User" >Usuarios</router-link></li>
                    <li><router-link to="/Product">Productos</router-link></li>
                </ul>
            </div>
        </nav>
    </div>

</template>
<script>
import { hasPrivilege } from '@/auth';
export default{
    name: 'HeaderView',
    methods: {
        hasPrivilege,
        logout(){
            this.$router.push('/');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            
        }
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