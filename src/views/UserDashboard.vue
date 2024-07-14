<template>
    <div>
            <HeaderView/>
                <div class="row" id="tabla">
                    <div class="col m12">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8"><h2><b>USUARIOS</b></h2></div>
                                <div class="col-sm-4">
                                    <a href="#!" @click="openAdd()"><i class="material-icons">add_circle</i></a>
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
                                    <td>
                                        <ul>
                                            <li v-for="privilege in users.privileges" :key="privilege">
                                            {{ privilege }}
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <a class="edit" v-on:click="openEdit(users.id)" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                        <a class="delete" v-on:click="openConfirmDelte(users.id)" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                    </td>
                                    <td>
                                        <a class="addPrivilege" v-on:click="openAddPrivilege(users.id)" title="Add_Privilege" data-toggle="tooltip"><i class="material-icons">person_add</i></a>
                                        <a class="deletePrivilege" v-on:click="openDeletePrivilege(users.id)" title="Delete_Privilege" data-toggle="tooltip"><i class="material-icons">removeperson</i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div class="modal" id="user-modal" ref="modalAdd">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Usuario</label>
                                    <input type="text" v-model="user">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Contraseña</label>
                                    <input type="password" v-model="pass">
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
                    <div class="modal" id="user-modal" ref="modalEdit">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Usuario</label>
                                    <input type="text" v-model="form.username" disabled>
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Contraseña actual</label>
                                    <input type="text" v-model="oldpass">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Contraseña nueva</label>
                                    <input type="text" v-model="newpass">
                                    <span class="helper-text"></span>
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col m12">
                                    <button class="btn teal" @click="changePass()">EDITAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="privilege-modal" ref="modalPrivilege">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Usuario</label>
                                    <input type="text" v-model="form.username" disabled>
                                </div>
                                <div class="col m3">
                                    <label>Privilegio</label>
                                    <select v-model="selectedPrivilegeId" ref="selectPrivilege">
                                        <option v-for="privilege in privileges" :key="privilege.id" :value="privilege.id">
                                         {{ privilege.description }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col m12">
                                    <button class="btn teal" @click="putPrivilege()">AGREGAR PRIVILEGIO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="privilege-modal" ref="modalDeletePrivilege">
                        <div class="modal-content">
                            <div class="row">
                                <table class="table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Privilegio</th>
                                            <th>Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="privilege in form.privileges" :key="privilege">
                                            <td>{{ privilege}}</td>
                                            <td> 
                                                <label>
                                                    <input type="checkbox"/>
                                                </label>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                <div class="row" >
                            <div class="col m12">
                                <button class="btn teal" @click="deletePrivilege()">ELIMINAR</button>
                                <button class="btn teal" @click="closeModal('modalDeletePrivilege')">CANCELAR</button>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="confirm-modal" ref="modalConfirm">
                        <div class="modal-content">
                            <h4>Confirmación</h4>
                            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                        </div>
                        <div class="row" >
                            <div class="col m12">
                                <button class="btn teal" @click="deleteUser()">ELIMINAR</button>
                                <button class="btn teal" @click="closeModal('modalConfirm')">CANCELAR</button>
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
            user: '',
            pass: '',
            oldpass: '',
            newpass: '',
            privileges: [],
            selectedPrivilegeId: null,
            selectedUserId: null,
            userIdToDelete: null,
            form:{
                "id": '',
                "username": '',
                "privileges":[]
            }
        }
    },
    mounted:function(){
        this.getAllUsers();
        const modalAddElement = this.$refs.modalAdd;
        const modalEditElement = this.$refs.modalEdit;
        const modalPrivilegeElement = this.$refs.modalPrivilege;
        const modalDeletePrivilegeElement = this.$refs.modalConfirm;
        const modalConfirmElement = this.$refs.modalDeletePrivilege;
        
        M.Modal.init(modalAddElement);
        M.Modal.init(modalEditElement);
        M.Modal.init(modalPrivilegeElement);
        M.Modal.init(modalDeletePrivilegeElement);
        M.Modal.init(modalConfirmElement);

    },
        methods:{
        getAllUsers(){
            axios.get('/User/GetAllUsers').then(data =>{
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
                "username": this.user,
                "password": this.pass,
            };
            axios.post('/User/CreateUser', data)
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
            axios.get('/User/GetUserById/'+ id)
            .then(response => {
                console.log(response);
                this.form = response.data;
            })
            .catch(error =>{
                console.error(error);
            });
        },
        openEdit(userId){
            this.selectedUserId = userId;
            const modalEditElement = this.$refs.modalEdit;
            const modalInstance = M.Modal.getInstance(modalEditElement);
            if (modalInstance) {
             modalInstance.open();
            } else {
            console.error('El modal no está disponible.');
            }
            this.getIdUser(userId);
        },
        changePass(){
            var data ={
                "oldPassword": this.oldpass,
                "newPassword": this.newpass
            }
            axios.put(`/User/ChangePassword/`+ this.selectedUserId, data)
            .then(response =>{
                console.log(response);
                this.getAllUsers();
                this.mostrarMensaje('La contraseña fue editada');
                this.closeModal('modalEdit');
                this.oldpass = '';
                this.newpass = '';
            })
            .catch(error=>{
                console.error(error);
            })
        },
        openConfirmDelte(id) {
            this.userIdToDelete = id;
            const modalConfirmElement = this.$refs.modalConfirm;
            const modalInstance = M.Modal.getInstance(modalConfirmElement);
            if (modalInstance) {
                modalInstance.open();
            } else {
                console.error('El modal de confirmación no está disponible.');
            }
        },
        deleteUser(){
            axios.delete('/User/DeleteUser/'+ this.userIdToDelete)
            .then(response =>{
                console.log(response);
                this.getAllUsers();
                this.closeModal('modalConfirm');
                this.mostrarMensaje('El Usuario fue eliminado');
            });

        },
        getAllPrivileges() {
            axios.get('/User/GetAllPrivileges')
                .then(response => {
                    this.privileges = response.data;
                    this.$nextTick(() => {
                        M.FormSelect.init(this.$refs.selectPrivilege);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        },
        openAddPrivilege(userId){
            this.selectedUserId = userId;
            const modalPrivilegeElement = this.$refs.modalPrivilege;
            const modalInstance = M.Modal.getInstance(modalPrivilegeElement);
            if (modalInstance) {
             modalInstance.open();
            } else {
            console.error('El modal no está disponible.');
            }
            this.getAllPrivileges();
            this.getIdUser(userId);

        },
        putPrivilege(){
            var data ={
                'userId': this.selectedUserId,
                'privilegeId': this.selectedPrivilegeId
            }
            axios.post(`/User/AddPrivilege`,data )
            .then(response =>{
                console.log(response);
                this.getAllUsers();
                this.closeModal('modalPrivilege');
            })
            .catch(error => {
                console.error(error);
            });
        },
        openDeletePrivilege(userId){
            const modalDeletePrivilegeElement = this.$refs.modalDeletePrivilege;
            const modalInstance = M.Modal.getInstance(modalDeletePrivilegeElement);
            if (modalInstance) {
             modalInstance.open();
            } else {
            console.error('El modal no está disponible.');
            }
            this.getAllPrivileges();
            this.getIdUser(userId);

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
table.table td a.addPrivilege {
    color: #0fbb43;
}
table.table td a.deletePrivilege {
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
#user-modal, #privilege-modal{
    height: 240px;
}
#privilege-modal button{
    margin-left:20px;
}
#confirm-modal{
    height: 200px;
    width: 450px;
}
#confirm-modal, #user-modal button{
    margin-left:20px; 
}

</style>