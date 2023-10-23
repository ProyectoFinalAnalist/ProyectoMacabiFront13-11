<template>
  <div class="componentes">
    <RouterView></RouterView>
  </div>
</template>


<script setup>

import { getRolFromCookie } from "./utils/Cookies"
import { usrStore } from "./components/stores/usrStore";
import { onMounted } from "vue";

const usuarioStore = usrStore()

onMounted(async () => {
  await usuarioStore.reiniciarSesion()
})



// export default {
//     data() {
//         return {
//             rol: "null"
//         };
//     },
//     created() {
//         this.setRol();
//     },
//     methods: {
//         setRol() {
//             let rol = "Cuenta de tipo ";

//             switch (getRolFromCookie()) {
//                 case 'A':
//                     rol += "Admin";
//                     break;
//                 case 'C':
//                     rol += "Coordinador";
//                     break;
//                 case 'P':
//                     rol += "Profesor";
//                     break;
//                 default:
//                     rol += "null";
//             }

//             this.rol = rol;
//         }
//     },
// }
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

