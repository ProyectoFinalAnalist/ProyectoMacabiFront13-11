
<template>
    <h1>{{titulo + idCat}}</h1>
    <input type="text" name="datosSocio" placeholder="nro de socio...">
    <button @click="buscarSocio('D')">{{ tituloBotonDni }}</button>
    <button @click="buscarSocio('S')" >{{ tituloBotonNroSocio }}</button>
    <p>Aca voy a ir probando los socios</p>

    <button></button>

</template>


<script >
export default {
name: "AgregarSocio",
components: {},
data: () => ({
  titulo:"Agregar socio a la categoria..",
  tituloBotonDni: "Busqueda por dni",
  tituloBotonNroSocio: "Busqueda por nroSocio",
  idCat:0,
  tipoBusqueda:'D',
}),
created(){
    this.idCat = this.$route.params.idCategoria
},
methods: {
    buscarSocio(opcion) {
        this.tipoBusqueda = opcion;
    }

},
};

</script>

