<template>
  <div class="container_grid tamaño_xs">

    <div class="titulo_container">
      Agregar Categoría
    </div>

    <div class="formulario_container">


      <div class="form-floating mb-4 mt-3">
        <input type="text" class="form-control" :class="this.nombreCatError" id="nombreCat" v-model="nombreCat"
          placeholder="" style="font-weight: 540;">
        <label for="nombreCat">Nombre de la Categoría</label>
      </div>

      <div class="form-floating mb-4">
        <select class="form-select" :class="this.deporteSeleccionadoError" id="deporte-select" v-model="deporteSeleccionado" style="font-weight: 540;"
          aria-label="Floating label select example">

          <option class="opcion-default" value="default" disabled :selected="isSelected(0)">Seleccione Un Deporte</option>

          <option v-for="deporte in deportes" :key="deporte.idDeporte" :disabled="isDisabled()" :selected="isSelected(deporte)" :value="deporte.idDeporte">{{ deporte.nombre }}
          </option>

        </select>
        <label for="deporte-select">Deporte</label>
      </div>

      <div class="form-floating mb-4">
        <select class="form-select" :class="this.profesorSeleccionadoError" id="profesor-select" aria-label="Floating label select example"
          v-model="profesorSeleccionado" style="font-weight: 540;">

          <option class="opcion-default" value="default" disabled selected>Seleccione Un Profesor</option>

          <option v-for="profesor in profesores" :key="profesor.idUsuario" :value="profesor.idUsuario">{{
            profesor.nombre + " " + profesor.apellido }}</option>

        </select>

        <label for="profesor-select">Profesor</label>
      </div>

      <div class="container_buttons">
        <button type="button" class="btn btn-danger" @click="cancelar">Cancelar</button>
        <button type="submit" class="btn btn-macabi1" @click="validarCampos">Agregar</button>
      </div>

    </div>

  </div>


  <div class="alert" v-if="mostrarMensaje">
    <p>{{ mensaje }}</p>
    <div class="alert-buttons">
      <button v-if="mostrarBotonesSiNo" class="btn btn-success" @click="crearCategoria">Sí</button>
      <button v-if="mostrarBotonesSiNo" class="btn btn-danger" @click="ocultarMensaje">No</button>
      <button v-if="mostrarBotonOk" class="btn btn-primary" @click="ocultarMensaje">OK</button>

    </div>
  </div>
</template>


<script>
import axios from 'axios';
import apiUrl from "../../../../config/config.js"

import { useRoute } from "vue-router";

export default {
  data() {
    return {
      //bind  de inputs
      nombreCat: null,
      deporteSeleccionado: 'default',
      profesorSeleccionado: 'default',

      nombreCatError: null,
      deporteSeleccionadoError: null,
      profesorSeleccionadoError: null,

      //Opciones de Selects
      deportes: [],
      profesores: [],

      mostrarBotonesSiNo: false,
      mostrarBotonOk: false,
      mostrarMensaje: false,

      mensaje: "",
      
      select: false,
      route: useRoute(),
      idDeporte: null

    };
  },
  mounted() {
    this.obtenerDeportes();
    this.obtenerProfesores();

    this.idDeporte = this.$route.params.idDeporte;
  },
  methods: {

    isSelected(deporte){
      if(!this.select && this.idDeporte != null && deporte.idDeporte == this.idDeporte){
        this.deporteSeleccionado = deporte.idDeporte
        this.select = true
      }
      this.select
    },

    isDisabled(){
      return this.idDeporte != null
    },

    validarCampos() {

      console.log(this.nombreCatError);

      let error = false

      if (this.nombreCat == null || this.nombreCat == '') {
        this.nombreCatError = "is-invalid"
        error = true
      } else {
        this.nombreCatError = null
      }
      if (this.deporteSeleccionado == 'default') {
        this.deporteSeleccionadoError = "is-invalid"
        error = true
      } else {
        this.deporteSeleccionadoError = null
      }
      if (this.profesorSeleccionado == 'default') {
        this.profesorSeleccionadoError = "is-invalid"
        error = true
      } else {
        this.profesorSeleccionadoError = null
      }

      if(!error){
        
        this.mostrarConfirmacion()
        
      }

    },

    obtenerDeportes() {
      // Hacer una solicitud al servidor para obtener la lista de deportes.
      axios.get(apiUrl + '/deporte/getAll', { withCredentials: true })

        .then(response => {
          this.deportes = response.data.result;
        })
        .catch(error => {
          console.error('Error al obtener la lista de deportes:', error);
        });
    },

    obtenerProfesores() {

      // Hacer una solicitud al servidor para obtener la lista de profesores.
      axios.get(apiUrl + '/usuario/3/rol', { withCredentials: true })
        .then(response => {
          console.log(response.data.result);
          this.profesores = response.data.result;
        })
        .catch(error => {
          console.error('Error al obtener la lista de profesores:', error);
        });
    },

    mostrarConfirmacion() {
      console.log('Valor de deporteSeleccionado:', this.nombreCat);
      this.mostrarMensaje = true;
      this.mostrarBotonesSiNo = true;
      this.mostrarBotonOk = false;
      this.mensaje = `¿Estás seguro de crear la categoría "${this.nombreCat}"?`;
      crearCategoria()
    },

    async crearCategoria() {




      this.mostrarBotonesSiNo = false
      const nuevaCategoria = {
        nombreCategoria: this.nombreCat.toString(),
        idDeporte: this.deporteSeleccionado,
        idUsuario: this.profesorSeleccionado,
      };

      console.log(nuevaCategoria);

      try {
        const response = await axios.post(apiUrl + '/categoria', nuevaCategoria, { withCredentials: true });
        console.log('Respuesta del servidor:', response.data);
        this.mostrarBotonOk = true;
        this.mensaje = "Categoria creada con exito";
        this.nombreCat = "";
        this.deporteSeleccionado = "",
          this.profesorSeleccionado = ""
          this.$router.go(-1);
      } catch (error) {
        this.mensaje = "Error al crear la categoría. Por favor, inténtalo nuevamente.";
        console.error('Error al crear la categoría:', error);
        this.mostrarBotonOk = true;
        this.mostrarBotonesSiNo = false
      }

      this.mostrarMensaje = true;

      

    },

 

    ocultarMensaje() {
      this.mostrarMensaje = false;
      this.mostrarBotonesSiNo = false,
        this.mostrarBotonOk = false,
        this.mostrarMensaje = false
    },

    cancelar() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.container_grid {
  grid-template-rows: 1fr 4fr;
}

.form-select option{
  font-weight: 540;
}

.opcion-default {
  color: #adadad;
  
}

.btn-macabi1 {
    color: white;
    background-color: #004896;
    border: 1px solid #013a77;
}

.btn-macabi1:hover {
    color: white;
    background-color: #013368;
}

.btn-macabi1:active  {
    background-color: #002b58; 
}

.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #f5c6cb;
  animation: slide-down 2s ease;
}

.alert p {
  margin: 0;
}

.alert-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.alert-buttons button {
  margin: 5px;
}

@keyframes slide-down {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>