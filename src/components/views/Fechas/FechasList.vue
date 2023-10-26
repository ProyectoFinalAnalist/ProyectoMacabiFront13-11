<template>
  <div class="container mt-3">
    <div v-if="fechaStore.getElements != null">
      <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">LISTA DE FECHAS</div>
      <div class="d-flex justify-content-between align-items-center">
        <p class="">Fechas en total: <strong>{{ size }}</strong></p>
        <div>
          <label for="ordenarPor">Ordenar por:</label>
          <select id="ordenarPor" v-model="ordenarPor" @change="ordenarFechas">
            <option value="Categoria">Categoría</option>
            <option value="Fecha">Fecha</option>
            <option value="Tipo">Tipo</option>
          </select>
        </div>
      </div>
      <div v-if="fechaStore.getElements != null || fechasFiltradas.length > 0">
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
            <tr v-for="fecha in fechasFiltradas" :key="fecha.idFecha">
              <td>{{ fecha.fechaCalendario }}</td>
              <td>{{ mapearTipo(fecha.tipo) }}</td>
              <td>{{ fecha.Categorium ? fecha.Categorium.nombreCategoria : 'Sin Categoría' }}</td>
              <td><router-link :to="`/fechas/${fecha.idFecha}`"><strong>Ver detalles</strong></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
      <strong>No hay fechas cargadas :c</strong>
    </h5>
    <br>
    <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-danger">
        <router-link to="/crearFecha" class="nav-item nav-link" href="#">Crear Fecha</router-link>
      </button>
      <button class="btn btn-secondary">
        <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
      </button>
    </div>
    <br>
  </div>
</template>

<script>
import { ref, onBeforeMount, watch } from "vue";
import { useElementStore } from '../../../utils/Store';
import apiUrl from '../../../../config/config.js'


export default {
  name: "FechaList",
  setup() {
    const fechaStore = useElementStore("fechas")();
    const size = ref(0);
    const ordenarPor = ref("Categoria");
    const fechasFiltradas = ref([]);

    onBeforeMount(() => {
      fetchFechas();
    });

    watch(ordenarPor, () => {
      ordenarFechas();
    });

    async function fetchFechas() {
      try {
        await fechaStore.fetchElements(`${apiUrl}/fecha/fechas`);
        if (fechaStore.getElements && fechaStore.getElements.result) {
          size.value = fechaStore.getElements.result.length;
          fechasFiltradas.value = [...fechaStore.getElements.result];
        }
      } catch (error) {
        console.error('Error al obtener fechas:', error);
      }
    }

    function ordenarFechas() {
      const copiaFechas = [...fechasFiltradas.value];

      if (ordenarPor.value === "Fecha") {
        copiaFechas.sort((a, b) => new Date(a.fechaCalendario) - new Date(b.fechaCalendario));
      } else if (ordenarPor.value === "Tipo") {
        copiaFechas.sort((a, b) => a.tipo.localeCompare(b.tipo));
      } else if (ordenarPor.value === "Categoria") {
        copiaFechas.sort((a, b) => {
          const nombreA = a.Categorium ? a.Categorium.nombreCategoria : '';
          const nombreB = b.Categorium ? b.Categorium.nombreCategoria : '';
          return nombreA.localeCompare(nombreB);
        });
      }

      fechasFiltradas.value = copiaFechas;
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
      ordenarPor,
      ordenarFechas,
      fechasFiltradas,
      mapearTipo,
    };
  },
  data() {
    return {
      agregarFecha: "Agregar nueva fecha",
    };
  },
  methods: {
    nuevaFecha() {
      this.$router.push({ path: "/crearfecha", query: { idCategoria: "1" } });
    },
  },
};
</script>