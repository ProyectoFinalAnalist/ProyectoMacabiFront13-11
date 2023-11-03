<template>
  <div class="container-fluid ps-5 pe-5 mb-5">
    <div class="text text-center h1">USUARIOS</div>
    <br>
    <form @submit.prevent="buscar()">
      <div class="row g-2">
        <div class="col-12 col-md-auto">
          <select id="filtro" class="form-select">
            <option disabled>Filtrar por:</option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="email">Mail</option>
            <option value="dni">Dni</option>
          </select>
        </div>
        <div class="col-12 col-md-auto">
          <input type="text" class="form-control" placeholder="Buscar..." v-model="busqueda">
        </div>
        <div class="col-12 col-md-auto">
          <button class="btn btn-danger" type="button" v-on:click="reiniciar">Reiniciar</button>
        </div>
        <div class="col text-md-end">
          <div class="d-flex justify-content-end mt-3">
            <p>Usuarios en total: <strong>{{ size }}</strong></p>
          </div>
        </div>
      </div>
    </form>
    <br>
    <div class="d-flex justify-content-end input-group mb-3">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Apellido:</th>
            <th class="d-none d-sm-table-cell">Email:</th>
            <th class="d-none d-sm-table-cell">Dni: <button class="btn bg-success" @click="ordenar('dni')"></button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user.idUsuario" @click="irA(user.idUsuario)">
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellido }}</td>
            <td class="d-none d-sm-table-cell">{{ user.email }}</td>
            <td class="d-none d-sm-table-cell"> {{ user.dni }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="btn-group">
        <button class="btn btn-macabi1">
          <router-link to="/crearusuario" class="nav-item nav-link" href="#">Crear Usuario</router-link>
        </button>
        <button class="btn btn-dark">
          <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
        </button>
      </div>
    </div>
  </div>
  <br>
</template>
<style>
@import '../../../assets/btn.css';
</style>
<script>
import { useElementStore } from "../../../stores/Store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const elementStore = useElementStore("usuario")()
    let busqueda = ""
    let filtro = ""
    const usuarios = ref(null)
    const orden = ref(true)
    const router = useRouter();

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

    function irA(id) {
      if (id != 0) {
        router.push(`/usuarios/${id}`);
      }
    }

    return {
      elementStore,
      usuarios,
      buscar,
      busqueda,
      reiniciar,
      size,
      ordenar,
      irA
    }
  },
}
</script>