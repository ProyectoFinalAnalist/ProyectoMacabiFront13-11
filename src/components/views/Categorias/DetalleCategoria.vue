<template>
    <div>Este es el detalle categoria. Estará la info de la categoria. Nombre, planilla de socios, boton de ir a editar y botones para ir a fechas</div>

    <h1>Categoria: {{ nombreCategoria }}</h1>
    <h2>Deporte{{ deporteCategoria }}</h2>
    <div>
      <h2>Socios de la categoria:</h2>
      <div>

      </div>
    </div>

   
    <router-link to="/">Volver al la lista de deportes</router-link>
    <td><router-link :to="`/modificarCategoria/${this.idCategoria}`"><strong>Editar categoria</strong></router-link></td>
    <td><router-link :to="`/fechasCategoria/${this.idCategoria}`"><strong>Fechas</strong></router-link></td>
    <td><router-link :to="`/agregarSocio/${this.idCategoria}`"><strong>Añadir socio a la categoria</strong></router-link></td>




</template>

<script>
import axios from 'axios';
import apiUrl from '../../../../config/config.js';

export default {
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
      this.nombreDeLaCategoria = await axios.get(`${apiUrl}/categoria/${this.idCategoria}/nombreCategoria`, { withCredentials: true });
    }catch(e) {
      
    }

  },
  methods: {
    
  },
};
</script>
