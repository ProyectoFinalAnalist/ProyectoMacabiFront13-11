<template>
  <div id="formulario-container">
    <form class="formulario-box">
      <h1>Crear fecha</h1>
      <div class="form-group">
        <label class="form-label">Categoria</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" :value="nombreCategoria" disabled>
      </div>
      <div class="form-group">
        <label for="tipoFecha">Tipo de fecha</label>
    <select id="tipoFecha" v-model="selectedTipoFecha" required>
      <option v-for="opcion in opciones" :value="opcion.value">{{ opcion.label }}</option>
    </select>
      </div>
      <div class="form-group">
        <label for="">Deporte</label>
        <input  type="text" class="prueba form-control" aria-describedby="emailHelp" :value="nombreDeporte" disabled>
      </div>
      <div class="form-group">
        <label for="">Fecha</label>
        <input type="date" name="" id="" class="form-control" required>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Confirmar</button>
        <button id="btnVolver" class="btn btn">Volver</button>
      </div>
    </form>
  </div>
  <RouterView></RouterView>
</template>


<script>
export default {
  components: {},
  data: () => ({
    nombreCategoria: null,
    nombreDeporte: null,
    tiposDisponibles: ['Entrenamiento, Citación'],
    tipoFecha:"",
    selectedTipoFecha: '', // Aquí almacenarás el valor seleccionado
      opciones: [
        { value: 'E', label: 'Entrenamiento' },
        { value: 'C', label: 'Citación' }],
  }),
  created() {
    this.nombreCategoria = this.$route.query.nombre;  
    this.nombreDeporte = "Basquet"
 },
  methods: {
    ingresarFecha(){
      if(this.tipoFecha == "Entrenamiento"){
  alert("Fecha creada")  
  this.$router.push({ path: '/fechas' });

      }else {
        this.$router.push({ path: '/sociosInactivos' });

      }
    }
  },
};
</script>

<style>
#formulario-container {
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
  background-color: #014187;
}

#btnVolver {
  background-color: rgb(130, 130, 130);
}

.prueba {
  background-color: #014187;
}

@media (max-width: 768px) {
  .formulario-box {
    max-width: 90%; 
    
  }
}
</style>