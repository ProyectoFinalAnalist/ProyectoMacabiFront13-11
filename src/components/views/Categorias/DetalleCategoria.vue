<template>

  <div class="container-fluid ps-5 pe-5 mb-5">
    <div class="text text-center h1">
      <h1>Categoria: {{ nombreCategoria }}</h1>
      <h2>Deporte{{ deporteCategoria }}</h2>
    </div>

    <form @submit.prevent="buscar()">
                <div class="row d-flex justify-content-start">
                    <div class="col col-sm">
                        <select id="filtro" class="form-select">
                            <option disabled>Filtrar por:</option>
                            <option value="nroSocio">Número de Socio</option>
                            <option selected value="nombre">Nombre</option>
                            <option value="apellido">Apellido</option>
                            <option value="dni">Dni</option>
                            <option value="email">Mail</option>
                        </select>
                    </div>
                    <div class="col col-sm m-0 p-0 me-4">
                        <input type="text" class="form-control" placeholder="Buscar..." v-model="busqueda">
                    </div>
                    <div class="col col-sm m-0 p-0 me-4">
                        <button class="btn btn-danger" type="button" v-on:click="reiniciar">Reiniciar</button>
                    </div>
                    <div class="col col-sm d-none d-sm-table-cell">
                        <div class="d-flex justify-content-end mt-3 mb-0">
                            <p>Socios en total: <strong>{{ listSocios.length}}</strong></p>
                        </div>
                    </div>
                </div>
            </form>
            <br>
            <div v-if="listSocios || listSocios.length > 0">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th class="d-none d-sm-table-cell">NroSocio:
                                <button class="btn bg-success" @click="ordenar('nroSocio')"></button>
                            </th>
                            <th>Nombre:</th>
                            <th>Apellido:</th>
                            <th class="d-none d-sm-table-cell">Dni:
                                <button class="btn bg-success" @click="ordenar('dni')"></button>
                            </th>
                            <th class="d-none d-lg-table-cell">Email:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="socio in listSocios" :key="socio.idSocio" @click="irA(socio.idSocio)">
                            <td class="d-none d-sm-table-cell">{{ socio.nroSocio }}</td>
                            <td>{{ socio.nombre }}</td>
                            <td>{{ socio.apellido }}</td>
                            <td class="d-none d-sm-table-cell">{{ socio.dni }}</td>
                            <td class="d-none d-lg-table-cell">{{ socio.email }}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>

            <div class="d-flex justify-content-center align-items-center">
            <div class="btn-group">
                <button class="btn btn-macabi1">
                    <router-link class="nav-item nav-link" to="/">Volver al la lista de deportes</router-link>
                </button>
                <button class="btn btn-dark">
                    <td><router-link class="nav-item nav-link" :to="`/modificarCategoria/${this.idCategoria}`"><strong>Editar categoria</strong></router-link></td>
                </button>
                <button class="btn btn-danger">
                  <td><router-link class="nav-item nav-link" :to="`/fechasCategoria/${this.idCategoria}`"><strong>Fechas</strong></router-link></td>
                </button>
                <button class="btn btn-macabi1">
                  <td><router-link class="nav-item nav-link" :to="`/agregarSocio/${this.idCategoria}`"><strong>Añadir socio a la categoria</strong></router-link></td>

                </button>
              </div>
        </div>
            

    

   


  </div>

</template>

<script>
import axios from 'axios';
import apiUrl from '../../../../config/config.js';
import { useElementStore } from '../../../utils/Store';

export default {
  setup() {
    const socioStore = useElementStore("categoria")(); // Asegúrate de usar la tienda correcta
    const { currentElement, fetchElementById, elements } = socioStore;
    return { currentElement, fetchElementById , elements};
  },
  data() {
    return {
     idCategoria:"",
     nombreCategoria:"nombreCategoria",
     deporteCategoria:"nombreDeporteCategoria",
     listSocios:[]
    };
  },
 async created(){
    this.idCategoria =  this.$route.params.id;
    try {
      let respuesta = await axios.get(`${apiUrl}/categoria/${this.idCategoria}/nombreCategoria`, { withCredentials: true });
      this.nombreCategoria = respuesta.data.nombreCategoria
      let nombreDeporteBuscado = await axios.get(`${apiUrl}/categoria/${this.idCategoria}/nombreDeporte`, { withCredentials: true });
      this.deporteCategoria = nombreDeporteBuscado.data.nombreDeporte
      console.log(this.deporteCategoria);
      let respuestaSocios =   await axios.get(`${apiUrl}/sociosXCategoria/${this.idCategoria}`, { withCredentials: true });
      let sociosLista = respuestaSocios.data.sociosDatos
      sociosLista.forEach(socio => {
        this.listSocios.push(socio)
      });
      


    }catch(e) {
console.log("catch");
    }

  },
  methods: {
    
  },
};
</script>
