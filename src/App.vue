<template>
  <div class="componentes">
    <RouterView></RouterView>
  </div>

  <Footer/>

</template>

<script setup>
import { usrStore } from "./components/stores/usrStore";
import { onMounted } from "vue";
import Footer from "./components/dependentComponents/Footer.vue";

const usuarioStore = usrStore()

onMounted(async () => {
  await usuarioStore.reiniciarSesion()
})


</script>

<style scoped>
.componentes {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
  overflow-x: hidden;
  height: auto;
  padding: 15px;
}

@media screen and (max-width:800px) {
  .componentes {
    margin-top: 20px;
  }
}
</style>

