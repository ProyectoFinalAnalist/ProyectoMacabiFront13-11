
<template>

  <div class="container mt-3">
    <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">Agregar socios a la categoria: {{ nombreCategoria }}
    </div>

    <form class=" formulario form-group d-flex flex-column justify-content-center align-items-center">
      <input class="form-control" v-model="socioBuscado" type="text" name="datosSocio" placeholder="Dni o nro socio..">
      <div v-if="socioBuscado">
        <button v-if="socioBuscado" class="btn botonHabilitado" @click.prevent="buscarSocio('D')">{{ tituloBotonDni
        }}</button>
        <button v-if="socioBuscado" class="btn botonHabilitado" @click.prevent="buscarSocio('S')">{{ tituloBotonNroSocio
        }}</button>
        <!-- El .prevent() hace q el form no recargue cuando se se toque el boton </div> -->
      </div>
      <div v-else>
        <button class="btn " disabled>{{ tituloBotonDni }}</button>
        <button class="btn " disabled>{{ tituloBotonNroSocio }}</button>
      </div>
    </form>
    
    <div >
      <div class="d-flex justify-content-between align-items-center">
        <p class="">Socios por asignar: <strong>{{ sociosList.length }}</strong></p>
      </div>
      <div>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nro socio</th>
              <th>Nombre</th>
              <th class="d-none d-md-table-cell">Apellido</th>
              <th class="d-none d-md-table-cell">Dni</th>
              <th>Anular</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="socio in sociosList" :key="socio.idSocio">
              <td>{{ socio.nombre }}</td>
              <td class="d-none d-md-table-cell">{{ socio.apellido }}</td>
              <td>{{ socio.nroSocio }}</td>
              <td class="d-none d-md-table-cell">{{ socio.dni }}</td>
              <td><button class="btn botonHabilitado" @click="eliminarDeListaSocios(index)">Eliminar de la lista</button>
              </td>


            </tr>
          </tbody>
        </table>
      </div>
    </div>
   
    <div class=" formulario form-group d-flex justify-content-center align-items-center">
      <button @click="agregarSociosACategoria" class="btn botonHabilitado mr-2"> Agregar socios </button>
      <button class="btn btn-secondary ml-2">
        <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
      </button>
    </div>

  </div>

</template>


<script >
import axios from "axios";
import apiUrl from '../../../../config/config.js'
export default {
  name: "AgregarSocio",
  components: {},
  data: () => ({
    titulo: "Agregar socios a la categoria: ",
    tituloBotonDni: "Busqueda por dni",
    tituloBotonNroSocio: "Busqueda por nroSocio",
    idCat: 0,
    tipoBusqueda: 'D',
    sociosList: [],
    socioBuscado: "",
    nombreCategoria: ""
  }),
  async created() {
    this.idCat = this.$route.params.idCategoria
    let result = await axios.get(`${apiUrl}/categoria/${this.idCat}/nombreCategoria`, { withCredentials: true });
    this.nombreCategoria = result.data.nombreCategoria

  },
  methods: {
    async buscarSocio(opcion) {
      this.tipoBusqueda = opcion;
      try {
        console.log("Socio buscado:" + this.socioBuscado);

        let sociosGet;
        if (opcion == 'D') {
          sociosGet = await axios.get(`${apiUrl}/socio/getSocioPorDni/${this.socioBuscado}`, { withCredentials: true });

        } else {
          sociosGet = await axios.get(`${apiUrl}/socio/getSocioPorNroSocio/${this.socioBuscado}`, { withCredentials: true });
        }

        console.log("El socio que se esta intentando buscar es " + sociosGet.data.result.nroSocio);

        if (!this.yaExisteSocioEnLista(sociosGet.data.result.nroSocio)) {
          this.sociosList.push(sociosGet.data.result)
        } else {
          alert("Ya existia este socio en la lista")
        }


      } catch (e) {
        alert(e.response.data.message)
      }

    },

    yaExisteSocioEnLista(nroSocio) {
      let existe = false
      if (this.sociosList.find(socio => socio.nroSocio === nroSocio) !== undefined) {
        existe = true
      }

      return existe;
    },
    eliminarDeListaSocios(index) {
      this.sociosList.splice(index, 1)
    },

    async agregarSociosACategoria() {
      try {
        let parametro = { socios: [] }
        this.sociosList.forEach(socio => {
          parametro.socios.push({ idSocio: socio.idSocio })
        });
        let response = await axios.post(`${apiUrl}/sociosXCategoria/${this.idCat}/agregar`, parametro, { withCredentials: true })

        alert(response.data.message)
        if (response.data.idSociosYaExistentes.length > 0) {
          alert("Se intentaron agregar " + response.data.idSociosYaExistentes.length + " socios que ya estaban asignados");

        }
      } catch (e) {
        alert(e.response.data.message)

      }
    },



  },

};

</script>

<style scoped>
.botonHabilitado {

  background-color: #014187;
  color: white
}

@media (max-width: 768px) {
  .container {
    max-width: 80%;

  }

  .formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .prueba {
    display: none;
  }
}
</style>

