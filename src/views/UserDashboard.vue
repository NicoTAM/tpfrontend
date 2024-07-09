<template>
    <div>
            <HeaderView/>
                <div class="row" id="tabla">
                    <div class="col m12">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8"><h2><b>USUARIOS</b></h2></div>
                                <div class="col-sm-4">
                                    <a href="#!" @click="openAdd()"><i class="material-icons">person_add</i></a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 30px;">ID</th>
                                    <th style="width: 100px;">Usuario</th>
                                    <th style="width: 100px;">Rol</th>
                                    <th style="width: 50px;">Acción</th>
                                    <th>Privilegio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="users in listUsers" :key="users.id">
                                    <th scope="row">{{users.id}}</th>
                                    <td>{{users.username}}</td>
                                    <td>{{users.privileges[0]}}</td>
                                    <td>
                                        <a class="edit" v-on:click="obtenerId()" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                        <a class="delete" v-on:click="eliminar()" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                    </td>
                                    <td>
                                        <a class="privilege" v-on:click="getPrivilege()" title="Privilege" data-toggle="tooltip"><i class="material-icons">person</i></a>
                                    </td>
                                </tr>
                                    
                            </tbody>

                        </table>
                    </div>
                    </div>
                    <div class="modal" id="productos-modal" ref="modalAdd">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Usuario</label>
                                    <input type="text" v-model="username">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Contraseña</label>
                                    <input type="password" v-model="password">
                                    <span class="helper-text"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col m12">
                                    <button class="btn teal" @click="addUser()">AGREGAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="productos-modal" ref="modalEdit">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Nombre</label>
                                    <input type="text"  >
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Descripción</label>
                                    <input type="text"  >
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Precio</label>
                                    <input type="text"  >
                                    <span class="helper-text"></span>
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col m12">
                                    <button class="btn teal" @click="editar(form)">EDITAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="privilege-modal" ref="modalPrivilege">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Usuario</label>
                                    <input type="text"  >
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Privilegio</label>
                                    <select>
                                        <option v-for="privilege in privileges" :key="privilege.id" :value="privilege.id">
                                         {{ privilege.description }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col m12">
                                    <button class="btn teal" @click="editar()">AGREGAR PRIVILEGIO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import M from 'materialize-css';
import axios from 'axios';
export default{
    name: 'UserDashoard',
    components:{
        HeaderView
    },
    data(){
        return{
            listUsers: null,
            username: '',
            password: '',
            privileges: []
        }
    },
    mounted:function(){
        this.getAllUsers();
        const modalAddElement = this.$refs.modalAdd;
        const modalEditElement = this.$refs.modalEdit;
        const modalPrivilegeElement = this.$refs.modalPrivilege;
        
        M.Modal.init(modalAddElement);
        M.Modal.init(modalEditElement);
        M.Modal.init(modalPrivilegeElement);

    },
        methods:{
        getAllUsers(){
            let direccion = "https://localhost:7296/api/User/GetAllUsers"
            axios.get(direccion).then(data =>{
                this.listUsers = data.data;
            })
            .catch(error =>{
                console.error(error);
            })
        },
        openAdd(){
            const modalAddElement = this.$refs.modalAdd;
            const modalInstance = M.Modal.getInstance(modalAddElement);
            if (modalInstance) {
             modalInstance.open();
            } else {
            console.error('El modal no está disponible.');
            }
        },
        addUser(){
            var data= {
                "username": this.username,
                "password": this.password,
            };
            axios.post('https://localhost:7296/api/User/CreateUser', data)
            .then(response =>{
                console.log(response);
                this.getAllUsers();
                this.mostrarMensaje('El usuario fue guardado');
                this.closeModal('modalAdd');
            })
            .catch(error =>{
                console.error(error);
            });
        },
        getIdUser(id){
            axios.get(`https://localhost:7296/api/User/GetUserById/`+ id)
            .then(response => {
                console.log(response);
                this.form = response.data;
            })
            .catch(error =>{
                console.error(error);
            });
        },
        getPrivilege(){
            const modalPrivilegeElement = this.$refs.modalPrivilege;
            const modalInstance = M.Modal.getInstance(modalPrivilegeElement);
            if (modalInstance) {
             modalInstance.open();
            } else {
            console.error('El modal no está disponible.');
            }
            axios.get('https://localhost:7296/api/User/GetAllPrivileges')
            .then(response =>{
                console.log(response);
                this.privileges = response.data;
                console.log(this.privileges);
            })

        },
        putPrivilege(event, id){
            const privilege = event.target.value;
            var data ={
                'userId': id,
                'privilegeId': privilege
            }
            axios.post(`https://localhost:7296/api/User/AddPrivilege`,data )
            .then(response =>{
                console.log(response);
                this.getAllUsers();
            })
        },
        mostrarMensaje(mensaje) {
            M.toast({html: mensaje});
        },
        closeModal(modalRef) {
            const modalElement = this.$refs[modalRef];
            const modalInstance = M.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.close();
            }
        }
        }
    

}

</script>

<style scoped>
body {
    color: #404E67;
    background: #F5F7FA;
    font-family: 'Open Sans', sans-serif;
}
.table-wrapper {
    width: 1000px;
    margin: 30px auto;
    background: #fff;
    padding: 20px;	
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
#tabla {
    padding: 30px 200px 30px 200px;
}
.table-title {
    padding-bottom: 10px;
    margin: 0 0 10px;
}
.table-title h2 {
    margin: 6px 0 0;
    font-size: 22px;
}

table.table {
    table-layout: fixed;
}
table.table tr th, table.table tr td {
    border-color: #e9e9e9;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}
table.table th:last-child {
    width: 100px;
}
table.table td a {
    cursor: pointer;
    display: inline-block;
    margin: 0 5px;
    min-width: 24px;
}
table.table tr td{
    text-align: center;
} 
table.table tr th{
    text-align: center;
} 

table.table td a.edit {
    color: #FFC107;
}
table.table td a.delete {
    color: #E34724;
}
table.table td i {
    font-size: 19px;
}
    
table.table .form-control {
    height: 32px;
    line-height: 32px;
    box-shadow: none;
    border-radius: 2px;
}
table.table .form-control.error {
    border-color: #f50000;
}
#productos-modal{
    height: 240px;
}
.radio-buttons-container {
    display: flex;
    align-items: center;
    gap: 2px;
}

.radio-buttons-container label {
    display: flex;
    align-items: center;
    margin-left: 0;
}

</style>