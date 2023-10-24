<template>
  <div class="container mt-3">
    <div class="text text-center pb-3 pt-5 h1">Detalles de la Fecha</div>
    
    <div>
       
      <!-- Muestra los datos de la fecha -->
      <div class="fecha-details">
        <h2>Fecha: {{ fechaDetalle.fechaCalendario }}</h2>
        <p>Tipo: {{ mapearTipo(fechaDetalle.tipo) }}</p>
        <p>Categoria: {{ fechaDetalle.Categorium.nombreCategoria}}</p>
        <p>Deporte: {{ deporte }}</p>
      </div>
      <div>
        <h2>Socios Anotados en esta Fecha: <strong>{{ size }}</strong></h2>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="socio in sociosAsistenciaFecha" :key="socio.idSocio">
              <td>{{ socio.nombreSocio }}</td>
              <td>{{ socio.apellidoSocio }}</td>
              <td>{{mapearEstado( socio.estado )}}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="sociosAsistenciaFecha.length === 0">
          <p class="no-socios">No hay socios anotados en esta fecha.</p>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-secondary">
        <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from '../../../utils/Store';
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiUrl from '../../../../config/config.js';

export default {
  setup() {
    const asistenciaStore = useElementStore("asistencias")()
    const fechaStore = useElementStore("fechas")()
    const sociosAsistenciaFecha = ref([])
    const fechaDetalle = ref([])
    const route = useRoute();
    const router = useRouter();
    const idFecha = route.params.id
    const size = ref(0)
    const deporte = ref("")
    const showError = ref(false);
    onBeforeMount(async () => { await fetchs() })

    async function fetchs() {
      try {
        await asistenciaStore.fetchElements(`${apiUrl}/asistencia/${idFecha}`)
        sociosAsistenciaFecha.value = asistenciaStore.getElements.result
        size.value = sociosAsistenciaFecha.value.length
      } catch (error) {
        console.error("Error fetching socios anotados:", error)
        
      }

      try {
        await fechaStore.fetchElements(`${apiUrl}/fecha/fechas/${idFecha}`)
        fechaDetalle.value = fechaStore.getElements.result[0]

        if (fechaDetalle.value && fechaDetalle.value.idCategoria) {
      const idCategoria = fechaDetalle.value.idCategoria;
      deporte.value = await obtenerDeporte(idCategoria);
    }

      } catch (error) {
        console.error("Error fetching fecha detalle:", error)
      }

    }
    
    const obtenerDeporte = async (idCategoria) => {
      try {
        const response = await fetch(`${apiUrl}/categoria/${idCategoria}/nombreDeporte`);
        if (response.ok) {
          const data = await response.json();
          return data.nombreDeporte;
        } else {
          console.error('Error al obtener el nombre del deporte');
          return null;
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
      }
    };
    


    function mapearTipo(tipo) {
      if (tipo === 'C') {
        return 'Citación';
      } else if (tipo === 'E') {
        return 'Entrenamiento';
      } else {
        return 'Tipo Desconocido';
      }
    }

    function mapearEstado(estado) {
        if (estado == 'P'){
            return 'Presente';
        }else if(estado == 'A'){
            return 'Ausente';
        }else if(estado == 'L'){
            return "Lesionado"
        }
        }

      
    

    return {
      sociosAsistenciaFecha,
      fechaDetalle,
      size,
      mapearEstado,
      mapearTipo,
      obtenerDeporte,
      deporte,
      

    }
  }
}
</script>

<style scoped>
.fecha-details {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px 0;
}

.no-socios {
  color: red;
}

.error-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.8); /* Fondo rojo semi-transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* Asegura que esté por encima de otros elementos */
}

.error-message {
  text-align: center;
  background-color: #fff; /* Fondo blanco */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #000; /* Sombra */
}

.error-text {
  font-size: 18px;
}
</style>