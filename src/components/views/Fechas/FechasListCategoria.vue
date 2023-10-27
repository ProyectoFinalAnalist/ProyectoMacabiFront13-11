<template>
  <div class="container mt-3">
    <div class="text text-center pb-3 pt-5 h1">LISTA DE FECHAS</div>
    <div class="d-flex justify-content-between align-items-center">
      <p class="">Fechas en total: <strong>{{ size }}</strong></p>
    </div>
    <div v-if="fechas !== null">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Fecha Calendario:</th>
            <th>Tipo:</th>
            <th>Categoría:</th>
            <th>Detalles:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fecha in fechas" :key="fecha.idFecha">
            <td>{{ fecha.fechaCalendario }}</td>
            <td>{{ mapearTipo(fecha.tipo) }}</td>
            <td>{{ fecha.Categorium ? fecha.Categorium.nombreCategoria : 'Sin Categoría' }}</td>
            <td><router-link :to="`/fechas/${fecha.idFecha}`"><strong>Ver detalles</strong></router-link></td>
          </tr>
        </tbody>
      </table>
      <div v-if="fechas.length == 0">
        <p class="no-fechas">{{mensaje}}</p>
      </div>
    </div>
    
    <div class="d-flex justify-content-center align-items-center">
      <button @click="nuevaFecha" class="btn btn-danger">
        Crear fecha
      </button>

      <button class="btn btn-secondary">
        <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useElementStore } from '../../../utils/Store';
import { useRoute } from 'vue-router';
import apiUrl from '../../../../config/config.js'

export default {
  name: "FechasListCategoria",
  setup() {
    const fechaStore = useElementStore("fechas")();
    const size = ref(0);
    const fechas = ref([]);
    const route = useRoute();
    const nombreCategoria = ref(""); // Variable para el nombre de la categoría
    const mensaje = ref("")

    onBeforeMount(() => {
      fetchFechas();
    });

    async function fetchFechas() {
      const idCategoria = route.params.id;
      try {
        const response = await fetch(`${apiUrl}/fecha/${idCategoria}/mostrarFechas`);
        const data = await response.json();
        if (data.success) {
          fechas.value = data.result;
          size.value = data.result.length;

         if (fechas.value.length === 0) {
            const categoriaResponse = await fetch(`${apiUrl}/categoria/${idCategoria}`);
            const categoriaData = await categoriaResponse.json();

        if (categoriaData.success) {
            nombreCategoria.value = categoriaData.result.nombreCategoria;
            mensaje.value = `La categoría ${nombreCategoria.value} no tiene fechas asociadas.`;
        } else {
             mensaje.value = `La categoría no existe`;
        }
        }
        }
      } catch (error) {
        console.error('Error al obtener fechas:', error);
      }
    }

    function mapearTipo(tipo) {
      if (tipo === 'C') {
        return 'Citación';
      } else if (tipo === 'E') {
        return 'Entrenamiento';
      } else {
        return 'Tipo Desconocido';
      }
    }

    return {
      fechaStore,
      size,
      fechas,
      mapearTipo,
      nombreCategoria,
      mensaje
    };
  },
  data() {
    return {
      agregarFecha: "Agregar nueva fecha",
    };
  },
  methods: {
    nuevaFecha() {
      const idCategoria = this.$route.params.id
      this.$router.push({ path: "/crearfecha/" + idCategoria });
    },
  },
};
</script>

<style>
.no-fechas {
  text-align: center;
  padding: 10px;
  background-color: rgb(1,65,135);
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin: 20px auto;
  max-width: 300px;
  color:white;
}
</style>