<template>
  <div id="flex-content">

    <form>
      <h1>Crear fecha</h1>
      <div class="mb-3">
    <label class="form-label">Crear fecha </label>
    <input type="text" class="form-control" aria-describedby="emailHelp" :value="nombreCategoria" disabled>  
  </div>
  <div class="mb-3">
    <label for="">Tipo de fecha</label>
    <select name="" id="">
      <option value="">Entrenamiento</option>
      <option value="">Citación</option>
    </select>
  </div>
  <div class="mb-3">
    <label for="">Fecha</label>
    <input type="date" name="" id="">
  </div>
  <button class="btn btn-primary">Confirmar</button>
</form>
</div>

    <RouterView></RouterView>
</template>

<script>
export default {
  components: {},
  data: () => ({
    nombreCategoria: null,
    tiposDisponibles: ['Entrenamiento, Citación'],
    tipoFecha:""
  }),
  created() {
    this.nombreCategoria = this.$route.query.nombre;   },
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
body{
  height: 100%
}
#flex-content {
  display: flex;
  background-color: black;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 30%;
  background-color: aqua;
}
</style>