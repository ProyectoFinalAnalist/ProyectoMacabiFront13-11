<template>
  <h1>Este es el editar fecha</h1>
  <div>
    <h2>{{ dateFecha }}</h2>
  </div>
</template>


<script>
import axios from "axios";
import apiUrl from '../../../../config/config.js'

export default {
  components: {},
  data: () => ({
    dateFecha:"21/05/98"
  }),

  async created() {

  },

  methods: {

    getFecha(){
      try {
        let fechaResult = axios.get()
      }catch(e){

      }
    }
    
 
  },
};
</script>

<style scoped>

</style>