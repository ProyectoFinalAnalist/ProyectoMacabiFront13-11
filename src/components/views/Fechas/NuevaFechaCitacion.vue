

<template>
    <div id="formulario-container">
      <form class="formulario-box">
        <h1>Citación de socios para la fecha: {{fechaCitacion }}</h1>
        <div class="form-group">
          <label class="form-label">Nro. de Socio</label>
          <label class="form-label">Nombre</label>
          <label class="form-label">Apellido</label>
          <label class="form-label">Seleccionar</label>
        </div>
        <div class="form-group" v-for="(user, index) in users" :key="index">
  <input type="text" class="form-control" :value="user.nroSocio" disabled>
  <input type="text" class="form-control" :value="user.nombre" disabled>
  <input type="text" class="form-control" :value="user.apellido" disabled>
  <input
  type="checkbox"
  :name="'seleccionar-' + user.id"
  :value="{ idSocio: user.idSocio }"
  v-model="usersElegidos"
>
</div>
        <div class="form-group">
          <button @click="nuevaCitacion" class="btn btn-primary">Confirmar</button>
        </div>
      </form>
    </div>
  </template>
  

    

<script>
import axios from "axios";

export default {
  name: "NuevaFechaCitacion",
  components: {},
  data: () => ({
    fechaCitacion:"21/05/1997",
    categoria:"",
    users: [
        { id: 1, socio: '001', nombre: 'Usuario 1', apellido: 'Apellido 1' },
        { id: 2, socio: '002', nombre: 'Usuario 2', apellido: 'Apellido 2' },
        { id: 3, socio: '003', nombre: 'Usuario 3', apellido: 'Apellido 3' }
        // Puedes agregar más usuarios aquí
      ],
      usersElegidos: [],
  }),
  async created(){
      try {
        this.fechaCitacion = this.$route.query.fecha;
    this.categoria = this.$route.params.idCategoria;
       let respuesta = await axios.get(`http://localhost:5000/sociosXCategoria/${this.categoria}`);
       this.users = respuesta.data.sociosDatos

      }catch(e){
        throw e
      }
    },
  methods: {
  
      async nuevaCitacion(){
        
        try {
          let parametro = {
          idCategoria: this.categoria,
          fechaCalendario: this.fechaCitacion,
          tipo: 'C',
          idSocios: this.usersElegidos
    };    

    console.log("La fecha es : " + parametro.fechaCalendario + " el id categoria: " + parametro.idCategoria + " y el tipo: " + parametro.tipo);
      let result = await axios.post('http://localhost:5000/fecha/', parametro);
     this.$router.push({ path: '/fecha' });

    }catch(e){
          alert(e.response.data.message)
      
      
    }
      }

  },
};

</script>


<style>
#formulario-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.formulario-box {
  background-color: #f4f4f4;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 1000px;
}

.form-group button {
  margin-right: 10px;
  margin-top: 20px;
  background-color: #014187;
}

#btnVolver {
  background-color: rgb(130, 130, 130);
}

.form-group {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.form-label {
  font-weight: bold;
}

.form-control {
  flex: 1;
  margin: 0 10px;
}
</style>

    