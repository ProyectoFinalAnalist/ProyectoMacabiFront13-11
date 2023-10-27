<template>
    <div>Este es el detalle categoria. Estará la info de la categoria. Nombre, planilla de socios, boton de ir a editar y botones para ir a fechas</div>

   
    <router-link to="/">Volver al la lista de deportes</router-link>
    <td><router-link :to="`/modificarCategoria/${this.idCategoria}`"><strong>Editar categoria</strong></router-link></td>
    <td><router-link :to="`/fechasCategoria/${this.idCategoria}`"><strong>Fechas</strong></router-link></td>



</template>

<script>
import axios from 'axios';
import apiUrl from '../../../../config/config.js';

export default {
  data() {
    return {
     idCategoria:""
    };
  },
  created(){
    this.idCategoria =  this.$route.params.id;
  },
  methods: {
    
  },
};
</script>
