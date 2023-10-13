<script setup>
import { usrStore } from './components/stores/usrStore.ts'
import { onMounted } from 'vue'

onMounted(() => {
  let store = usrStore()
  store.reiniciarSesion()
})
</script>

<template>
  <div class="RouterView">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.RouterView {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
  overflow-x: hidden;
  height: auto;
}
</style>
