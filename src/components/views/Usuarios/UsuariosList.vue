<template>
    <div class="container mt-3">
      <h4 class="text-center">Usuarios</h4>
      <div class="d-flex justify-content-end input-group mb-3">
        <form class="d-flex" v-on:submit.prevent="buscar">
    <div class="d-flex justify-content-center mt-2">
        <label class="input-group"><strong>Filtrar:</strong></label>
    </div>
    <select id="filtro" class="form-select mr-2">
        <option value="nombre">Nombre</option>
        <option value="apellido">Apellido</option>
        <option value="email">Mail</option>
    </select>
    <div class="col-md-4"> <!-- Adjust the col-md-6 width to your preference -->
        <input type="text" class="form-control bg-light border-1 pr-5 mr-2" placeholder="Buscar..." v-model="busqueda">
    </div>
    <button class="btn btn-success">Buscar</button>
    <button class="btn btn-danger" v-on:click="reiniciar">Reiniciar</button>
</form>

      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Apellido:</th>
            <th>Email:</th>
            <th>DNI:</th>
            <th>Detalles:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in elementStore.getElements" :key="user.idUsuario">
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellido }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.dni }}</td>
            <td><router-link :to="`/usuarios/${user.idUsuario}`"><strong>Ver detalles</strong></router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
  </template>
  
  <script>
  import { useElementStore } from "../../../stores/Store";
  import { onMounted } from "vue";
  
  export default {
    setup() {
      const elementStore = useElementStore("usuario")()
      const busqueda = "";
  
       onMounted(() => {
        elementStore.currentElement = null
        elementStore.fetchElements()
      })
  
      function buscar() {
        elementStore.filtrarXString(this.busqueda, document.getElementById("filtro").value);
      }
  
      function reiniciar() {
        location.reload();
      }
  
      return {
        elementStore,
        buscar,
        busqueda,
        reiniciar
      }
    },
  }
  </script>