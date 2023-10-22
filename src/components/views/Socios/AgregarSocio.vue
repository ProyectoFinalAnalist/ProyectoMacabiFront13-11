
<template>
    <h1>{{titulo + idCat}}</h1>
    <input v-model="socioBuscado" type="text" name="datosSocio" placeholder="nro de socio...">
    <button  @click="buscarSocio('D')">{{ tituloBotonDni }}</button>
    <button @click="buscarSocio('S')" >{{ tituloBotonNroSocio }}</button>




    <tbody>
                        <tr v-for="socio in sociosList" :key="socio.idSocio">
                            <td>{{ socio.nombre }}</td>
                            <td>{{socio.apellido}}</td>
                            <td>{{socio.nroSocio}}</td>
                            <td>{{socio.dni}}</td>
                            <td><button @click="eliminarDeListaSocios(index)" >Eliminar de la lista</button></td>

                            
                        </tr>
                    </tbody>

    <button @click="agregarSociosACategoria">Agregar socios</button>

</template>


<script >
import axios from "axios";
import apiUrl from '../../../../config/config.js'
export default {
name: "AgregarSocio",
components: {},
data: () => ({
  titulo:"Agregar socio a la categoria..",
  tituloBotonDni: "Busqueda por dni",
  tituloBotonNroSocio: "Busqueda por nroSocio",
  idCat:0,
  tipoBusqueda:'D',
  sociosList:[],
  socioBuscado:""
}),
created(){
    this.idCat = this.$route.params.idCategoria
},
methods: {
   async buscarSocio(opcion) {
        this.tipoBusqueda = opcion;
    try {
        console.log("Socio buscado:" + this.socioBuscado);  
            
                let sociosGet;
                if(opcion == 'D'){
                    sociosGet = await axios.get(`${apiUrl}/socio/getSocioPorDni/${this.socioBuscado}`);

                }else {
                     sociosGet = await axios.get(`${apiUrl}/socio/getSocioPorNroSocio/${this.socioBuscado}`);
                }

                console.log("El socio que se esta intentando buscar es " + sociosGet.data.result.nroSocio );

                if(!this.yaExisteSocioEnLista(sociosGet.data.result.nroSocio)){
                    this.sociosList.push(sociosGet.data.result)
                }else {
                    alert("Ya existia este socio en la lista")
                }


            
        

        

    }catch(e){
        alert(e.response.data.message)
    }

    },
 
yaExisteSocioEnLista(nroSocio) {
  let existe = false
  if(this.sociosList.find(socio => socio.nroSocio === nroSocio) !== undefined) {
    existe = true
  }

  return existe;
},
eliminarDeListaSocios(index){
    this.sociosList.splice(index,1)
},

async agregarSociosACategoria(){
    try {
       let  parametro = { socios:[] }
        this.sociosList.forEach(socio => {
            parametro.socios.push({idSocio:socio.idSocio})
        });
       let response = await axios.post(`${apiUrl}/sociosXCategoria/${this.idCat}/agregar`, parametro)

        alert(response.data.message)
        if(response.data.idSociosYaExistentes.length > 0) {
        alert("Se intentaron agregar " + response.data.idSociosYaExistentes.length + " socios que ya estaban asignados");

    }
    }catch(e){
        alert(e.response.data.message)
    }
}


},

};

</script>

