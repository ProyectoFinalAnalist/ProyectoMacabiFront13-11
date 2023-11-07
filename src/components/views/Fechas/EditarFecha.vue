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
          />
        </div>

        <p>Profesor Asignado: <ul><li v-for="prof in profesor">{{ prof.apellido }}, {{ prof.nombre }}</li></ul></p>
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
          Socios Anotados en esta Fecha: <strong>{{ sociosAsistencia.sociosFinal.length }}</strong>
        </h2>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Estado</th>
              <th  v-if ="fechaDetalle.tipo =='C'">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="socio in sociosAsistencia.sociosFinal" :key="socio.idSocio">
              <td>{{ socio.nombre }}</td>
              <td>{{ socio.apellido }}</td>
              <td>{{ mapearEstado(socio.estado) }}</td>
              <td  v-if ="fechaDetalle.tipo =='C'">
                <button class="btn btn-danger" @click="eliminarSocio(socio)">
                  x
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="sociosAsistencia.sociosFinal.length === 0">
          <p class="no-socios">No hay socios anotados en esta fecha.</p>
        </div>
      </div>
    </div>
<!-- Modal button start -->
    <div class="justify-content-center d-flex" v-if ="fechaDetalle.tipo =='C'">
        <button class="btn btn-success mb-3" data-bs-toggle="modal"
            data-bs-target="#myModal">
            Agregar Socios
        </button>
    </div>
<!-- Modal button end -->

<!-- Modal start -->

<div class="modal fade"  id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">Seleccionar socios para agregar a esta fecha</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="socio in sociosXCategoria" :key="socio">
                        <div class="form-check" v-if ="!sociosAsistencia.sociosFinal.some(e=>socio.idSocio==e.idSocio)">
                            <input class="form-check-input" type="checkbox" :value="socio" v-model="listaSociosAgregar"
                                >
                            <label class="form-check-label" for="exampleCheckbox1">
                                <p class="h6"> {{ socio.nombre }}, {{ socio.apellido }} | DNI: {{
                                    socio.dni }}</p>
                            </label>
                        </div>
                      </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="agregarSocios" data-bs-dismiss="modal">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

<!-- Modal end -->
  
    <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-secondary">
        <router-link :to="`/fechas/${fechaDetalle.idFecha}`" class="nav-item nav-link" href="#"
          >Volver al detalle</router-link
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
    const route = useRoute();
    const router = useRouter();

    const asistenciaStore = useElementStore("asistencias")();
    const fechaStore = useElementStore("fechas")();
    const sociosXCategoriaStore = useElementStore("sociosXCategoria")();

    const sociosAsistencia = ref({sociosInicial: [], sociosFinal:[]});
    const fechaDetalle = ref([]);
    const sociosXCategoria = ref([])

    const idFecha = route.params.id;

    const deporte = ref("");
    const profesor = ref("");
    const listaSociosAgregar = ref([])

    onBeforeMount(async () => {
      await fetchs();
    });

    async function fetchs() {
      await obtenerSociosAnotados();
      fechaDetalle.value = await obtenerDetalleFecha();

      if (fechaDetalle.value && fechaDetalle.value.idCategoria) {
          const idCategoria = fechaDetalle.value.idCategoria;
          deporte.value = await obtenerDeporte(idCategoria);
          profesor.value = await obtenerProfesor(idCategoria);
          sociosXCategoria.value= await obtenerSociosXCategoria(idCategoria)
        }

    }

    const obtenerSociosXCategoria = async(idCategoria)=>{
      let res = [];
      try {
        await sociosXCategoriaStore.fetchElements(`${apiUrl}/sociosXCategoria/${idCategoria}`);
        res = sociosXCategoriaStore.getElements.sociosDatos
        //console.log("165",res)
      } catch (error) {
        console.error("Error fetching socios x categoria:", error);
      }
      return res;
    }

    const obtenerDetalleFecha= async ()=>{
      let res= []
      try {
        await fechaStore.fetchElements(`${apiUrl}/fecha/fechas/${idFecha}`);
        res = fechaStore.getElements.result[0];
      } catch (error) {
        console.error("Error fetching fecha detalle:", error);
      }
      return res;
    }

    const obtenerSociosAnotados = async ()=> {
      try {
        await asistenciaStore.fetchElements(`${apiUrl}/asistencia/${idFecha}`);
        sociosAsistencia.value.sociosInicial = asistenciaStore.getElements.result;
        sociosAsistencia.value.sociosFinal = asistenciaStore.getElements.result
      } catch (error) {
        console.error("Error fetching socios anotados:", error);
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
        const response = await fetch(`${apiUrl}/categoria/${idCategoria}/getProfesores`);
        if (response.ok) {   
          const data = await response.json();
          
          return data.usuariosList
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
      } else if (estado == "J") {
        return "Justificado";
      } else {
        return "Sin asignar";
      }
    }

    function eliminarSocio(socio) {
      sociosAsistencia.value.sociosFinal = sociosAsistencia.value.sociosFinal.filter(
        (e) => e.idSocio != socio.idSocio
      );


    }

    async function agregarSocios(){
      sociosAsistencia.value.sociosFinal =sociosAsistencia.value.sociosFinal.concat(...listaSociosAgregar.value)
      listaSociosAgregar.value = listaSociosAgregar.value.filter(item => !sociosAsistencia.value.sociosFinal.includes(item));      
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
      await editSociosRegistrados();
      
      await editFechaCalendario();
      router.push(`/fechas/${idFecha}`); 
      } catch (error) {
        alert("Error detectado en el ingreso de campos: " + error)
      }

    }

    async function editSociosRegistrados(){
      
      const sociosAgregados = sociosAsistencia.value.sociosFinal.filter(socioFinal => !sociosAsistencia.value.sociosInicial.some(socioInicial => socioFinal.idSocio == socioInicial.idSocio));

      const sociosBorrados = sociosAsistencia.value.sociosInicial.filter(socioInicial => !sociosAsistencia.value.sociosFinal.some(socioFinal => socioFinal.idSocio == socioInicial.idSocio));
    
      await agregarSociosDeFechaRequest(sociosAgregados)

      await eliminarSociosDeFechaRequest(sociosBorrados);
    }

    async function eliminarSociosDeFechaRequest(listSociosborrados) {
      for (const socioBorrado of listSociosborrados) {
        await asistenciaStore.deleteElementCustom(
          `${apiUrl}/asistencia/${idFecha}/${socioBorrado.idSocio}`
        );
      }
    }

    async function agregarSociosDeFechaRequest(listSociosAgregados) {
      for (const socioAgregado of listSociosAgregados) {
        await asistenciaStore.createElement(
          `${apiUrl}/asistencia`,{idFecha, idSocio:socioAgregado.idSocio, estado:null} );
      }
    }

    return {
      sociosAsistencia,
      fechaDetalle,
      mapearEstado,
      mapearTipo,
      obtenerDeporte,
      deporte,
      profesor,
      editFecha,
      eliminarSocio,
      sociosXCategoria,
      listaSociosAgregar,
      agregarSocios
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
