<template>
    <div>
        <nav>
            <div class="nav-wrapper">
                <router-link to="/" class="right">LOGOUT</router-link>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li><router-link to="/Home">Home</router-link></li>
                    <li><router-link to="/User" >Usuarios</router-link></li>
                    <li><router-link to="/Product">Productos</router-link></li>
                </ul>
            </div>
        </nav>
    </div>

</template>
<script>
export default{
    name: 'HeaderView',
}

</script>
<style scoped>
nav{
    height: 100px;
}

</style>