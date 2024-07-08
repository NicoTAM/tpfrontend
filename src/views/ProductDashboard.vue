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
                                        <a class="delete" v-on:click="deleteProduct(productos.id)" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
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
                </div>
        </div>
</template>

<script>
import HeaderView from '../components/HeaderView.vue';
import M from 'materialize-css';
import axios from 'axios';
axios.defaults.baseURL = 'https://localhost:7296/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
export default {
    name: "ProductDashboard",
    components: {
        HeaderView,
    },
    data(){
        return{
            Listaproductos: null,
            form:{
                "id": '',
                "name": '',
                "description": '',
                "price": ''
            },
            name: '',
            description: '',
            price: '',
            modales: [],

            errorMessages: []
        }
    },
    
    mounted:function(){
        this.getAllProduct();
        const modalAddElement = this.$refs.modalAdd;
        const modalEditElement = this.$refs.modalEdit;
        
        M.Modal.init(modalAddElement);
        M.Modal.init(modalEditElement);

    },
    methods:{
        getAllProduct(){
            let direccion = "https://localhost:7296/api/Product/GetAll"
            axios.get(direccion).then(data =>{
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
            axios.post('https://localhost:7296/api/Product/Create', data)
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
            axios.get(`https://localhost:7296/api/Product/GetById/`+ id)
            .then(response => {
                this.form = response.data;
            })
            .catch(error =>{
                console.error(error);
            });
        },
        editProduct(producto){
            axios.put(`https://localhost:7296/api/Product/Update/`+ producto.id, producto)
            .then(response =>{
                console.log(response);
                this.getAllProduct();
                this.mostrarMensaje('El producto fue editado');
                this.closeModal('modalEdit');
            });
            
        },
        deleteProduct(id){
            axios.delete(`https://localhost:7296/api/Product/Delete/`+ id)
            .then(response =>{
                console.log(response);
                this.mostrarMensaje('El producto fue eliminado');
                this.getAllProduct();
            });

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

</style>