<template>
  <div id="formulario-container">
    <form class="formulario-box">
      <h1>Crear fecha</h1>
      <div class="form-group">
        <label class="form-label">Categoria</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" :value="nombreCategoria" disabled>
      </div>
      <div class="form-group">
        <label for="tipoFecha">Tipo de fecha</label>
        <select id="tipoFecha" class="form-control" v-model="selectedTipoFecha" required>
          <option v-for="opcion in opciones" :value="opcion.value" >{{ opcion.label }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Deporte</label>
        <input type="text" class="prueba form-control" aria-describedby="emailHelp" :value="nombreDeporte" disabled>
      </div>
      <div class="form-group">
        <label for="">Fecha</label>
        <input v-model="fechaElegida" type="date" name="" id="" class="form-control" required :min="minFecha">
      </div>
      <div class="form-group">
        <button @click="ingresarFecha" class="btn btn-primary">Confirmar</button>
        <button id="btnVolver" class="btn btn">Volver</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";


export default {
  components: {},
  data: () => ({
    minFecha: "",
    fechaElegida: null,
    nombreCategoria: null,
    nombreDeporte: null,
    tiposDisponibles: ['Entrenamiento, Citación'],
    tipoFecha: "",
    selectedTipoFecha: '', // Aquí almacenarás el valor seleccionado,
    idCat:0,
    opciones: [
      { value: 'E', label: 'Entrenamiento' },
      { value: 'C', label: 'Citación' }],
  }),

  async created() {

    this.idCat = this.$route.params.idCategoria,
      this.minFecha = new Date().toISOString().split('T')[0]

    const url = "http://localhost:5000"

    let nombreDeLaCategoria = await axios.get(`http://localhost:5000/categoria/${this.idCat}/nombreCategoria`);

    this.nombreCategoria = nombreDeLaCategoria.data.nombreCategoria

    let nombreDeporte = await axios.get(`http://localhost:5000/categoria/${this.idCat}/nombreDeporte`);

    this.nombreDeporte = nombreDeporte.data.nombreDeporte
  },

  methods: {
    async ingresarFecha() {

      if (this.confirmarFecha() == true) {

        if (this.selectedTipoFecha == "E") {
          let parametro = {
            idCategoria: this.idCat,
            fechaCalendario: this.fechaElegida,
            tipo: this.selectedTipoFecha
          };

          try {

            const result = await axios.post('http://localhost:5000/fecha/', parametro);

            if(result) {
             this.$router.push({ path: '/fechas' });
            }else {
              alert("Eror con la creacion de la fecha")
            }
            

          } catch (e) {

            if (e.response && e.response.data && e.response.data.message) {
              alert(e.response.data.message)
            }
          }

        } else {
          this.$router.push({
            path: `/nuevaCitacion/${this.idCat}`,
            query: {
              fecha: this.fechaElegida
            }
          });

        }
      }


    },
    confirmarFecha() {
      let fechaCorrecta = true;
      const fechaSeleccionada = new Date(this.fechaElegida);

      if (fechaSeleccionada < new Date()) {
        alert('No puedes seleccionar una fecha anterior a la fecha actual.');
        fechaCorrecta = false;
      }

      return fechaCorrecta;
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
  max-width: 400px;
}

.form-group button {
  margin-right: 10px;
  margin-top: 20px;
  background-color: #014187;
}

#btnVolver {
  background-color: rgb(130, 130, 130);
}



@media (max-width: 768px) {
  .formulario-box {
    max-width: 90%;

  }
}
</style>