<template>
  <div class="formulario-container">
    <div class="formulario-box">
      <h2>Agregar Categoría</h2>
      <form @submit.prevent="mostrarConfirmacion">
        <div class="form-group">
          <label for="nombreCat">Nombre de la Categoría:</label>
          <input
            type="text"
            id="nombreCat"
            v-model="nombreCat"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="deporte">Deporte:</label>
          <select id="deporte" v-model="deporteSeleccionado" class="form-control">
            <option value="">Seleccione un deporte</option>
            <option v-for="deporte in deportes" :key="deporte.idDeporte" :value="deporte.idDeporte">{{ deporte.nombre }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="profesor">Profesor:</label>
          <select id="profesor" v-model="profesorSeleccionado" class="form-control">
            <option value="">Seleccione un profesor</option>
            <option v-for="profesor in profesores" :key="profesor.idUsuario" :value="profesor.idUsuario">{{ profesor.nombre + " " + profesor.apellido}}</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success">Crear</button>
          <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

    <div class="alert" v-if="mostrarMensaje" >
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

export default {
  data() {
    return {
      nombreCat: "",
      deporteSeleccionado: "",
      profesorSeleccionado: "",
      deportes: [],
      profesores: [],
      mostrarBotonesSiNo: false,
      mostrarBotonOk: false,
      mostrarMensaje: false,
      mensaje: "",
    };
  },
  mounted() {
    this.obtenerDeportes();
    this.obtenerProfesores();
  },
  methods: {
    obtenerDeportes() {
      // Hacer una solicitud al servidor para obtener la lista de deportes.
      axios.get('http://localhost:2020/deporte/deportes')
        .then(response => {
          this.deportes = response.data.result;
        })
        .catch(error => {
          console.error('Error al obtener la lista de deportes:', error);
        });
    },
    
    obtenerProfesores() {
      // Hacer una solicitud al servidor para obtener la lista de profesores.
      axios.get('http://localhost:2020/usuario/profesores')
        .then(response => {
          this.profesores = response.data.profesores;
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
    },

    async crearCategoria() {
  this.mostrarBotonesSiNo= false
    const nuevaCategoria = {
      nombreCategoria: this.nombreCat.toString(),
      idDeporte: this.deporteSeleccionado,
      idUsuario: this.profesorSeleccionado,
    };
    try {
    const response = await axios.post("http://localhost:2020/categoria", nuevaCategoria);
     console.log('Respuesta del servidor:', response.data);
     this.mostrarBotonOk = true;
     this.mensaje = "Categoria creada con exito";
     this.nombreCat = "";
     this.deporteSeleccionado = "",
     this.profesorSeleccionado= ""
  } catch (error) {
    this.mensaje = "Error al crear la categoría. Por favor, inténtalo nuevamente." ;
    console.error('Error al crear la categoría:', error);
    this.mostrarBotonOk = true;
        this.mostrarBotonesSiNo= false
  }

  this.mostrarMensaje = true;
},

    ocultarMensaje() {
      this.mostrarMensaje = false;
       this.mostrarBotonesSiNo= false,
      this.mostrarBotonOk= false,
      this.mostrarMensaje= false
    },

    cancelar() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
.formulario-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.formulario-box {
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px; 
}
.form-group button {
  margin-right: 10px; 
  margin-top: 20px;
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
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
}

@media (max-width: 768px) {
  .formulario-box {
    max-width: 90%; 
    
  }
}
</style>