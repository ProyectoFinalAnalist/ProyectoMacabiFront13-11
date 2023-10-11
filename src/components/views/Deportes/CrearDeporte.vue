<template>
  <div class="formulario-container">
    <div class="formulario-box">
      <h2>Agregar Deporte</h2>
      <form @submit.prevent="mostrarConfirmacion">
        <div class="form-group">
          <label for="nombreDeporte">Nombre del Deporte:</label>
          <input
            type="text"
            id="nombreDeporte"
            v-model="nombreDeporte"
            class="form-control"
            required
          />
        </div>
      
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Agregar</button>
          <button type="button" class="btn btn-danger" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>



  <!-- Diálogo de confirmación -->
  <div class="alert" v-if="mostrarMensaje" >
    <p>{{ mensaje }}</p>
    <div class="alert-buttons">
      <button v-if="mostrarBotonesSiNo" class="btn btn-success" @click="agregarDeporte">Sí</button>
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
      mostrarBotonesSiNo: false,
      mostrarBotonOk: false,
      mostrarMensaje: false,
      mensaje: "",
      nombreDeporte: "",
    };
  },
  methods: {
    mostrarConfirmacion() {
      this.mostrarMensaje=  true;
      this.mostrarBotonesSiNo= true,
      this.mostrarBotonOk= false

      this.mensaje = `¿Estás seguro de crear el deporte "${this.nombreDeporte}"?`;
    },
    async agregarDeporte() {
      this.mostrarBotonesSiNo= false
      const nuevoDeporte = {
        nombre: this.nombreDeporte
      };
       try {
        const response = await axios.post('http://localhost:2020/deporte', nuevoDeporte);
        console.log('Respuesta del servidor:', response.data);
        this.mostrarBotonOk = true;
        this.mensaje = "Deporte creado con exito";
        this.nombreDeporte = "";
        
      } catch (error) {
        this.mensaje = error.response.data.message;
        console.error('Error al enviar la solicitud al servidor:', error);
        this.mostrarBotonOk = true;
        this.mostrarBotonesSiNo= false

      }
      
      this.mostrarMensaje = true;
      
    },
     ocultarMensaje() {
      this.mostrarMensaje = false;
       mostrarBotonesSiNo= false,
      mostrarBotonOk= false,
      mostrarMensaje= false
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