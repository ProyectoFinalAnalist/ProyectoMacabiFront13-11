<template>
  <div class="container mt-3">
    <div class="text text-center pb-3 pt-5 h1">Modificar Fecha</div>

    <div>
      <!-- Muestra los datos de la fecha -->
      <div class="fecha-details">
        <div class="form-group">
          <label for="">Fecha</label>
          <input
            v-model="fechaDetalle.fechaCalendario"
            type="date"
            name=""
            id="fecha"
            class="form-control"
            required
            :min="new Date().toISOString().slice(0, 10)"
          />
        </div>

        <p>Profesor Asignado: {{ profesor }}</p>
        <p>Tipo: {{ mapearTipo(fechaDetalle.tipo) }}</p>
        <p>
          Categoria:
          {{
            fechaDetalle.Categorium
              ? fechaDetalle.Categorium.nombreCategoria
              : "Sin categoría"
          }}
        </p>
        <p>Deporte: {{ deporte }}</p>
      </div>
      <div>
        <h2>
          Modificar Socios Anotados en esta Fecha: <strong>{{ size }}</strong>
        </h2>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Estado</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="socio in sociosAsistenciaFecha" :key="socio.idSocio">
              <td>{{ socio.nombreSocio }}</td>
              <td>{{ socio.apellidoSocio }}</td>
              <td>{{ mapearEstado(socio.estado) }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminarSocio(socio)">
                  x
                </button>
              </td>
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
        <router-link to="/" class="nav-item nav-link" href="#"
          >Volver a Inicio</router-link
        >
      </button>
      <button class="btn btn-primary m-3" @click="editFecha()">
        Editar Fecha
      </button>
    </div>
  </div>
</template>

<script>
import { useElementStore } from "../../../utils/Store";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiUrl from "../../../../config/config.js";

export default {
  setup() {
    const asistenciaStore = useElementStore("asistencias")();
    const fechaStore = useElementStore("fechas")();
    const sociosAsistenciaFecha = ref([]);
    const fechaDetalle = ref([]);
    const route = useRoute();
    const router = useRouter();
    const idFecha = route.params.id;
    const size = ref(0);
    const deporte = ref("");
    const profesor = ref("");
    const listaSociosBorrar = [];
    onBeforeMount(async () => {
      await fetchs();
    });

    async function fetchs() {
      try {
        await asistenciaStore.fetchElements(`${apiUrl}/asistencia/${idFecha}`);
        sociosAsistenciaFecha.value = asistenciaStore.getElements.result;
        size.value = sociosAsistenciaFecha.value.length;
      } catch (error) {
        console.error("Error fetching socios anotados:", error);
      }

      try {
        await fechaStore.fetchElements(`${apiUrl}/fecha/fechas/${idFecha}`);
        fechaDetalle.value = fechaStore.getElements.result[0];
        console.log(
          "🚀 ~ file: DetalleFecha.vue:85 ~ fetchs ~ fechaDetalle.value :",
          fechaDetalle.value
        );

        if (fechaDetalle.value && fechaDetalle.value.idCategoria) {
          const idCategoria = fechaDetalle.value.idCategoria;
          deporte.value = await obtenerDeporte(idCategoria);
          profesor.value = await obtenerProfesor(idCategoria);
        }
      } catch (error) {
        console.error("Error fetching fecha detalle:", error);
      }
    }

    const obtenerDeporte = async (idCategoria) => {
      try {
        const response = await fetch(
          `${apiUrl}/categoria/${idCategoria}/nombreDeporte`
        );
        if (response.ok) {
          const data = await response.json();
          return data.nombreDeporte;
        } else {
          console.error("Error al obtener el nombre del deporte");
          return null;
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
      }
    };

    const obtenerProfesor = async (idCategoria) => {
      try {
        const response = await fetch(`${apiUrl}/usuario/${idCategoria}`);
        if (response.ok) {
          const data = await response.json();

          return data.result.nombre + " " + data.result.apellido;
        } else {
          console.error("Error al obtener nombre del profesor");
          return null;
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
      }
    };

    function mapearTipo(tipo) {
      if (tipo === "C") {
        return "Citación";
      } else if (tipo === "E") {
        return "Entrenamiento";
      } else {
        return "Tipo Desconocido";
      }
    }

    function mapearEstado(estado) {
      if (estado == "P") {
        return "Presente";
      } else if (estado == "A") {
        return "Ausente";
      } else if (estado == "L") {
        return "Lesionado";
      } else if (estado == null) {
        return "Sin asignar";
      }
    }

    function eliminarSocio(socio) {
      listaSociosBorrar.push(socio.idSocio);
      sociosAsistenciaFecha.value = sociosAsistenciaFecha.value.filter(
        (e) => e != socio
      );
    }

    async function editFechaCalendario(){
      try {
        await fechaStore.patchElement(`${apiUrl}/fecha/${idFecha}`,{fechaCalendario: fechaDetalle.value.fechaCalendario,idCategoria:fechaDetalle.value.idCategoria })
        
      } catch (error) {
        console.log("🚀 ~ file: EditarFecha.vue:196 ~ editFechaCalendario ~ error:", error.message.substring(error.message.length - 3))
        if(error.message.substring(error.message.length - 3)== 400) throw "La fecha calendario ya existe"
      }
    }

    async function editFecha() {
      try {
      await eliminarSociosDeFechaRequest();
      await editFechaCalendario();
      router.push(`/fechas/${idFecha}`); 
      } catch (error) {
        alert("Error detectado en el ingreso de campos: " + error)
      }

    }

    async function eliminarSociosDeFechaRequest() {
      for (const idSocio of listaSociosBorrar) {
        await asistenciaStore.deleteElementCustom(
          `${apiUrl}/asistencia/${idFecha}/${idSocio}`
        );
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
      profesor,
      editFecha,
      eliminarSocio,
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.fecha-details {
  border: 6px solid #013a77;
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px 0;
}

.table-bordered {
  border: 6px solid #013a77;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #013a77;
}

.no-socios {
  color: red;
}
</style>
