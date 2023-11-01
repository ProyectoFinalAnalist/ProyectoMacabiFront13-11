<template>
  <div class="container">
    <div class="text text-center h1">USUARIOS</div>
    <br>
    <form @submit.prevent="buscar()">
      <div class="row d-flex justify-content-start">
        <div class="col col-sm">
          <select id="filtro" class="form-select">
            <option disabled>Filtrar por:</option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="email">Mail</option>
            <option value="dni">Dni</option>
          </select>
        </div>
        <div class="col col-sm m-0 p-0 me-4">
          <input type="text" class="form-control" placeholder="Buscar..." v-model="busqueda">
        </div>
        <div class="col col-sm m-0 p-0 me-4">
          <button class="btn btn-danger" type="button" v-on:click="reiniciar">Reiniciar</button>
        </div>
        <div class="col col-sm d-none d-sm-table-cell">
          <div class="d-flex justify-content-end mt-3 mb-0">
            <p>Usuarios en total: <strong>{{ size }}</strong></p>
          </div>
        </div>
      </div>
    </form>
    <br>
    <div class="d-flex justify-content-end input-group mb-3">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Apellido:</th>
            <th class="d-none d-sm-table-cell">Email:</th>
            <th class="d-none d-sm-table-cell">Dni: <button class="btn bg-success" @click="ordenar('dni')"></button></th>
            <th>Detalles:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user.idUsuario">
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellido }}</td>
            <td class="d-none d-sm-table-cell">{{ user.email }}</td>
            <td class="d-none d-sm-table-cell"> {{ user.dni }}</td>
            <td><router-link :to="`/usuarios/${user.idUsuario}`"><strong>Ver detalles</strong></router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-success">
        <router-link to="/crearusuario" class="nav-item nav-link" href="#">Crear Usuario</router-link>
      </button>
      <button class="btn btn-secondary">
        <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
      </button>
    </div>
  </div>
  <br>
</template>
  
<script>
import { useElementStore } from "../../../stores/Store";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const elementStore = useElementStore("usuario")()
    let busqueda = ""
    let filtro = ""
    const usuarios = ref(null)
    const orden = ref(true)

    const size = ref(0)

    onMounted(() => {
      elementStore.currentElement = null
      elementStore.fetchElements().then(() => {
        usuarios.value = elementStore.getElements
        size.value = usuarios.value.length || 0
      })
    })

    function buscar() {
      reiniciar();
      busqueda = this.busqueda;

      if (busqueda !== "") {
        filtro = document.getElementById("filtro").value;
        usuarios.value = elementStore.getElements.filter(item => {
          const propiedad = item[filtro];
          const propiedadLowerCase = String(propiedad).toLowerCase();
          const busquedaLowerCase = String(busqueda).toLowerCase();
          return propiedadLowerCase.includes(busquedaLowerCase);
        });

        size.value = usuarios.value.length || 0;
      } else {
        size.value = 0;
      }
    }

    function reiniciar() {
      usuarios.value = elementStore.getElements
      size.value = usuarios.value.length || 0
    }

    function ordenar(columna) {
      orden.value = !orden.value

      usuarios.value.sort((a, b) => {
        const factorOrden = orden.value ? -1 : 1;
        if (a[columna] < b[columna]) return -1 * factorOrden;
        if (a[columna] > b[columna]) return 1 * factorOrden;
        return 0;
      });
    }

    return {
      elementStore,
      usuarios,
      buscar,
      busqueda,
      reiniciar,
      size,
      ordenar
    }
  },
}
</script>