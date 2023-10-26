<template>
  <div id="formulario-container">
    <form class="formulario-box">
      <h1>Citación de socios para la fecha: {{ fechaCitacion }}</h1>
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
        <input type="checkbox" :name="'seleccionar-' + user.id" :value="{ idSocio: user.idSocio }"
          v-model="usersElegidos">
      </div>
      <div v-if="users.length == 0"><p class="no-fechas">{{mensajeNoHaySocios}}</p></div>

      
        
    
      <div class="form-group">
        <button @click="nuevaCitacion" class="btn btn-primary">Confirmar</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import apiUrl from '../../../../config/config.js'

export default {
  name: "NuevaFechaCitacion",
  components: {},
  data: () => ({
    mensajeNoHaySocios:"No hay socios asignados a esta categoria. Podes generar la fecha y asignar socios a la citación más tarde",
    fechaCitacion: "21/05/1997",
    categoria: "",
    users: [],
    usersElegidos: [],
  }),
  async created() {
    try {
      this.fechaCitacion = this.$route.query.fecha;
      this.categoria = this.$route.params.idCategoria;

      let respuesta = await axios.get(`${apiUrl}/sociosXCategoria/${this.categoria}`, { withCredentials: true });
      this.users = respuesta.data.sociosDatos

    } catch (e) {
      throw e
    }
  },
  methods: {

    async nuevaCitacion() {
      event.preventDefault();
      try {
        let parametro = {
          idCategoria: this.categoria,
          fechaCalendario: this.fechaCitacion,
          tipo: 'C',
          idSocios: this.usersElegidos
        };

        console.log("La fecha es : " + parametro.fechaCalendario + " el id categoria: " + parametro.idCategoria + " y el tipo: " + parametro.tipo);
        let result = await axios.post(`${apiUrl}/fecha/`, parametro, { withCredentials: true });
        this.$router.push({ path: '/fechas' });

      } catch (e) {
        alert(e.response.data.message)
        this.$router.push({ path: '/fechas' });

      }
    }

  },
};

</script>

<style scoped>
#formulario-container {
  display: flex;
  justify-content: center;
  align-items: center;
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

  