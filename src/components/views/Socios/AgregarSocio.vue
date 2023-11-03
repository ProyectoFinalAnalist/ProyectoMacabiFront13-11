
<template>

  <div class=".container-fluid ms-2 me-2 mb-5">
    <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">Agregar socios a la categoria: {{ nombreCategoria }}
    </div>

    <form >
      <div class="row g-2">  
      <input class="form-control" v-model="socioBuscado" type="text" name="datosSocio" placeholder="Dni o nro socio..">
      <label for="">Busqueda por: </label>
      <div class="botones" v-if="socioBuscado">
        <button  v-if="socioBuscado" class="btn botonHabilitado btn_busquedas" @click.prevent="buscarSocio('D')">{{ tituloBotonDni
        }}</button>
        <button v-if="socioBuscado" class="btn botonHabilitado btn_busquedas" @click.prevent="buscarSocio('S')">{{ tituloBotonNroSocio
        }}</button>

      <button v-if="socioBuscado" class="btn botonHabilitado btn_busquedas" @click.prevent="buscarPorApellido()">{{ tituloBotonPorApellido
        }}</button>

        <!-- El .prevent() hace q el form no recargue cuando se se toque el boton </div> -->
      </div>
      <div class="botones" v-else>
        <button class="btn btn_busquedas" disabled>{{ tituloBotonDni }}</button>
        <button class="btn btn_busquedas" disabled>{{ tituloBotonNroSocio }}</button>
        <button class="btn btn_busquedas" disabled>{{ tituloBotonPorApellido
        }}</button>
      </div>

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
    <div v-if="sociosList.length == 0">
        <p class="no-fechas">{{mensaje}}</p>
      </div>
   <div class="d-flex justify-content-center align-items-center">
    <div class="btn-group ">
      <button @click="agregarSociosACategoria" class="btn botonHabilitado mr-2"> Agregar socios </button>
      <button class="btn btn-dark ml-2">
        <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
      </button>
    </div>
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
    mensaje:"No se buscaron socios para agregar",
    titulo: "Agregar socios a la categoria: ",
    tituloBotonDni: "Dni",
    tituloBotonPorApellido:"Apellido",
    tituloBotonNroSocio: "Número de Socio",
    idCat: 0,
    tipoBusqueda: 'D',
    sociosList: [],
    socioBuscado: "",
    nombreCategoria: "",
    sociosBuscadosPorApellido: [],
  }),
  async created() {
    this.idCat = this.$route.params.idCategoria
    let result = await axios.get(`${apiUrl}/categoria/${this.idCat}/nombreCategoria`, { withCredentials: true });
    this.nombreCategoria = result.data.nombreCategoria

  },
  methods: {
   async buscarPorApellido(){
      try {
        console.log("Socio buscado:" + this.socioBuscado);
       let sociosApellido = await axios.get(`${apiUrl}/socio/getSociosPorApellido/${this.socioBuscado}`, { withCredentials: true });
       this.sociosBuscadosPorApellido = sociosApellido.data.result
       let sociosExistentes = false;
       let sociosInexistentes = false;
       this.sociosBuscadosPorApellido.forEach(socio => {
        if (!this.yaExisteSocioEnLista(socio.nroSocio)) {
          this.sociosList.push(socio)
          sociosInexistentes = true;
        } else {
          sociosExistentes = true
        }
        
       });

       if(sociosExistentes && sociosInexistentes) {
          alert("Solo se agregaron socios con el apellido similar que no se encuentran en la lista previa")
        }else {
          if(sociosExistentes && !sociosInexistentes) {
            alert("Todos los socios con apellidos similares, ya se encuentran en la lista")
          }
        }
       

       
    //   this.sociosBuscadosPorApellido.forEach(socio => {
  //console.log(`Nombre: ${socio.nombre}, Apellido: ${socio.apellido}`);

       
        

      }catch(e){
        alert(e.response.data.message)
      }
      
    },
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

     /*
    eliminarDeListaSociosApellido(index) {
      
      this.sociosBuscadosPorApellido.splice(index, 1)
    },

 
    agregarAsociosPorAgregar(socio,index) {
      this.sociosList.push(socio)
      this.sociosBuscadosPorApellido.splice(index, 1)

  },
*/
  validarSocioExisteEnListaPorAgregar(idSocioNueva){
    existe = false
    let pos = 0
    while(!existe && pos < this.sociosList.length){

      if(this.sociosList[0].idSocio == idSocioNueva) {
        existe = true
      }
      pos++

    }

    return existe
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
        
          this.sociosList = []

        }
      } catch (e) {
        alert(e.response.data.message)
        this.sociosList = []

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

.btnBorrar {
  background-color: #93979b;
  color: white
}

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

.botones {
    display: flex;
    justify-content: center;
  }

.btn_busquedas {
  
  margin-left: 2px;
  margin-right: 2px;

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

