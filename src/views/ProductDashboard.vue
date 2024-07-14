<template>
        <div>
            <HeaderView/>
                <div class="row" id="tabla">
                    <div class="col m12">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8"><h2><b>PRODUCTOS</b></h2></div>
                                <div class="col-sm-4">
                                    <a href="#!" @click="openAdd()"><i class="material-icons">add_circle</i></a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 50px;">ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th style="width: 80px;">Precio</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="productos in Listaproductos" :key="productos.id">
                                    <th scope="row">{{productos.id}}</th>
                                    <td>{{productos.name}}</td>
                                    <td>{{productos.description}}</td>
                                    <td>{{productos.price}}</td>
                                    <td>
                                        <a class="edit" v-on:click="getIdProduct(productos.id)" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                        <a class="delete" v-on:click="openConfirmDelte(productos.id)" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
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
                                    <label>Nombre</label>
                                    <input type="text"  v-model="name">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Descripción</label>
                                    <input type="text"  v-model="description">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Precio</label>
                                    <input type="text"  v-model="price">
                                    <span class="helper-text"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col m12">
                                    <button class="btn teal" @click="addProduct()">AGREGAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="productos-modal" ref="modalEdit">
                        <div class="modal-content">
                            <div class="row">    
                                <div class="col m3">
                                    <label>Nombre</label>
                                    <input type="text"  v-model="form.name">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Descripción</label>
                                    <input type="text"  v-model="form.description">
                                    <span class="helper-text"></span>
                                </div>
                                <div class="col m3">
                                    <label>Precio</label>
                                    <input type="text"  v-model="form.price">
                                    <span class="helper-text"></span>
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col m12">
                                    <button class="btn teal" @click="editProduct(form)">EDITAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="confirm-modal" ref="modalConfirm">
                        <div class="modal-content">
                            <h4>Confirmación</h4>
                            <p>¿Estás seguro de que deseas eliminar este producto?</p>
                        </div>
                        <div class="row" >
                            <div class="col m12">
                                <button class="btn teal" @click="deleteProduct()">ELIMINAR</button>
                                <button class="btn teal" @click="closeModal('modalConfirm')">CANCELAR</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</template>

<script>
import HeaderView from '../components/HeaderView.vue';
import M from 'materialize-css';
import axios from 'axios';
export default {
    name: "ProductDashboard",
    components: {
        HeaderView,
    },
    data(){
        return{
            Listaproductos: null,
            productIdToDelete: null,
            form:{
                "id": '',
                "name": '',
                "description": '',
                "price": ''
            },
            name: '',
            description: '',
            price: '',

            errorMessages: []
        }
    },
    
    mounted:function(){
        this.getAllProduct();
        const modalAddElement = this.$refs.modalAdd;
        const modalEditElement = this.$refs.modalEdit;
        const modalConfirmElement = this.$refs.modalConfirm;
        
        M.Modal.init(modalAddElement);
        M.Modal.init(modalEditElement);
        M.Modal.init(modalConfirmElement);

    },
    methods:{
        getAllProduct(){
            axios.get('/Product/GetAll').then(data =>{
                this.Listaproductos = data.data;
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
        addProduct(){
            var data= {
                "name": this.name,
                "description": this.description,
                "price": Number(this.price),
            };
            axios.post('/Product/Create', data)
            .then(response =>{
                console.log(response);
                this.getAllProduct();
                this.mostrarMensaje('El producto fue guardado');
                this.closeModal('modalAdd');
            })
            .catch(error =>{
                console.error(error);
            });
            
        },
        getIdProduct(id){
            const modalEditElement = this.$refs.modalEdit;
            const modalInstance = M.Modal.getInstance(modalEditElement);
            if (modalInstance) {
             modalInstance.open();
            } else {
            console.error('El modal no está disponible.');
            }
            axios.get(`/Product/GetById/`+ id)
            .then(response => {
                this.form = response.data;
            })
            .catch(error =>{
                console.error(error);
            });
        },
        editProduct(producto){
            axios.put(`/Product/Update/`+ producto.id, producto)
            .then(response =>{
                console.log(response);
                this.getAllProduct();
                this.mostrarMensaje('El producto fue editado');
                this.closeModal('modalEdit');
            })
            .catch(error=>{
                console.error(error);
            })
            
        },
        openConfirmDelte(id) {
            this.productIdToDelete = id;
            const modalConfirmElement = this.$refs.modalConfirm;
            const modalInstance = M.Modal.getInstance(modalConfirmElement);
            if (modalInstance) {
                modalInstance.open();
            } else {
                console.error('El modal de confirmación no está disponible.');
            }
        },
        deleteProduct(){
            axios.delete(`/Product/Delete/`+ this.productIdToDelete)
            .then(response =>{
                console.log(response);
                this.getAllProduct();
                this.closeModal('modalConfirm');
                this.mostrarMensaje('El producto fue eliminado');
            })
            .catch(error=>{
                console.error(error);
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
    padding: 30px 150px 30px 150px;
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
#confirm-modal{
    height: 200px;
    width: 450px;
}
#confirm-modal button{
    margin-left:20px; 
}

</style>