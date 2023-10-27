<template>
    <div>Este es el editar deporte. SOlo para coordinadores. Estará la lista de categorias de este deporte.</div>

   
    <router-link to="/">Volver a home</router-link>

    <router-link :to="`/editarDeporte/${this.idDeporte}`" class="btn btn-primary">Modificar</router-link> 
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../../config/config.js';

export default {
  data() {
    return {
     idDeporte:""
    };
  },
  created(){
    this.idDeporte =  this.$route.params.id;
    alert(this.idDeporte)
  },
  methods: {
    
  },
};
</script>
