<template>
    <div style="width: 100%; height: 500px;" class="bg bg-light text text-center p-5 h1">LISTA DE FECHAS</div>
    <button @click="nuevaFecha" type="button" class="btn btn-primary">{{agregarFecha}}</button>
</template>

<script >
export default {
  name: "FechaList",
  components: {},
  data: () => ({
    agregarFecha:"Agrear nueva fecha"
  }),
  methods: {
      nuevaFecha(){
        this.$router.push({ path: '/crearfecha', query: { idCategoria: '1' } });
      }

  },
};

</script>