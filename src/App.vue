<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar shadow-sm">
      <div class="container-fluid">
        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <div class="navbar-nav ml-auto">
            <router-link v-if="!!usuario" :to="`/usuarios/${id}`" class="nav-item nav-link d-flex align-items-center"
              href="#">
              <span class="ml-2">{{ nombreUsuario }}</span>
              <img src="../src/components/icons/User_Icon.svg"
                style="width: 20px; height: 20px; margin-left: 8px; opacity: 0.8;" alt="Icono de Usuario">
            </router-link>
            <div v-else class="d-flex">
              <router-link to="/login" class="nav-item nav-link mr-2">Iniciar Sesión</router-link>
            </div>
            <router-link v-on:click="cerrarSesion" to="/login" v-if="!!usuario" class="nav-item nav-link">Log
              out</router-link>
          </div>

        </div>
      </div>
    </nav>

  </header>
  <RouterView></RouterView>
</template>

<script>
import { getRolFromCookie, getCookie, getCookieJSON } from "./utils/Cookies"
import { isAuthenticated, isAdmin } from './utils/Auth'
import { useRouter, useRoute } from "vue-router";

export default {

  setup() {
    const router = useRouter();
    const usuario = getCookieJSON();
    let nombreUsuario;
    let id;

    if (usuario) {
      nombreUsuario = usuario.nombre;
      id = usuario.idUsuario;
    }

    async function cerrarSesion() {
      await removeCookie();
      await router.push("/");
      await location.reload();
    }

    return {
      id,
      nombreUsuario,
      usuario,
      cerrarSesion,
      isAuthenticated,
      isAdmin
    }
  },
  data() {
    return {
      rol: "null"
    };
  },
  created() {
    this.setRol();
  },

  methods: {
    setRol() {
      let rol = "Cuenta de tipo ";

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

