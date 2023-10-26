import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

import './assets/main.css';

import "bootstrap/dist/css/bootstrap.css"

// IMPORT - IMPORT - IMPORT - IMPORT - IMPORT - IMPORT - IMPORT - IMPORT - IMPORT - IMPORT - IMPORT

// APP
import App from "./App.vue";
import Home from './components/Home.vue'
import Login from "./components/Login.vue";
import MiUsuario from "./components/MiUsuario.vue"
import NewPassword from "./components/NewPassword.vue";
import Unauthorized from "./components/Unauthorized.vue";

// ASISTENCIAS
import HistorialAsistencias from "./components/views/Asistencias/HistorialAsistencias.vue";
import SociosXFecha from "./components/views/Asistencias/SociosXFecha.vue";
import TomarAsistencia from "./components/views/Asistencias/TomarAsistencia.vue";

// CATEGORIAS
import AsignarProfesor from "./components/views/Categorias/AsignarProfesor.vue";
import CategoriasList from "./components/views/Categorias/CategoriasList.vue";
import CrearCategoria from "./components/views/Categorias/CrearCategoria.vue";
import DetalleCategoria from "./components/views/Categorias/DetalleCategoria.vue";

// DEPORTES
import AsignarCoordinador from "./components/views/Deportes/AsignarCoordinador.vue";
import DeportesList from "./components/views/Deportes/DeporteList.vue";
import CrearDeporte from "./components/views/Deportes/CrearDeporte.vue";
import DetalleDeporte from "./components/views/Deportes/DetalleDeporte.vue";

// FECHAS
import FechasList from "./components/views/Fechas/FechasList.vue"
import CrearFecha from "./components/views/Fechas/CrearFecha.vue"
import DetalleFecha from "./components/views/Fechas/DetalleFecha.vue"
import NuevaFechaCitacion from "./components/views/Fechas/NuevaFechaCitacion.vue"
import FechasListCategoria from "./components/views/Fechas/FechasListCategoria.vue"


// SOCIOS
import RegistrarSocio from "./components/views/Socios/RegistrarSocio.vue"
import SociosList from "./components/views/Socios/SociosList.vue"
import AgregarSocio from "./components/views/Socios/AgregarSocio.vue"
import DetalleSocio from "./components/views/Socios/DetalleSocio.vue"
import UpdateSocio from "./components/views/Socios/UpdateSocio.vue"

// USUARIOS
import UsuariosInactivos from "./components/views/Usuarios/UsuariosInactivos.vue";
import UsuariosList from "./components/views/Usuarios/UsuariosList.vue";
import CrearUsuario from "./components/views/Usuarios/CrearUsuario.vue";
import DetalleUsuario from "./components/views/Usuarios/DetalleUsuario.vue";
import ModificarUsuario from "./components/views/Usuarios/ModificarUsuario.vue";

// ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES
const routes = [
  // APP 
  { path: "/", component: Home, },
  { path: "/login", component: Login, },
  { path: "/miUsuario", component: MiUsuario, },
  { path: "/newPassword", component: NewPassword, },
  { path: "/unauthorized", component: Unauthorized, },

  // ASISTENCIAS
  { path: "/historialAsistencia/:id", component: HistorialAsistencias },
  { path: "/sociosPorFecha", component: SociosXFecha },
  { path: "/tomarAsistencia", component: TomarAsistencia },

  // CATEGORIAS
  { path: "/asignarProfesor", component: AsignarProfesor },
  { path: "/categorias", component: CategoriasList },
  { path: "/crearCategoria", component: CrearCategoria },
  { path: "/crearCategoria/:idDeporte", component: CrearCategoria },
  { path: "/categorias/:id", component: DetalleCategoria },

  // DEPORTES
  { path: "/asignarCoordinador", component: AsignarCoordinador },
  { path: "/deportes", component: DeportesList },
  { path: "/crearDeporte", component: CrearDeporte },
  { path: "/deportes/:id", component: DetalleDeporte },

  // FECHAS
  { path: "/fechas", component: FechasList, },
  { path: "/crearfecha/:idCategoria", component: CrearFecha },
  { path: "/fechas/:id", component: DetalleFecha },
  { path: "/nuevaCitacion/:idCategoria", component: NuevaFechaCitacion },
  { path: "/fechasCategoria/:id", component: FechasListCategoria },

  // SOCIOS
  { path: "/registrarSocio", component: RegistrarSocio, },
  { path: "/socios", component: SociosList, },
  { path: "/agregarSocio/:idCategoria", component: AgregarSocio },
  { path: "/socios/:id", component: DetalleSocio },
  { path: "/socios/update/:id", component: UpdateSocio },

  // USUARIOS
  { path: "/usuarios", component: UsuariosList },
  { path: "/usuariosInactivos", component: UsuariosInactivos },
  { path: "/crearusuario", component: CrearUsuario },
  { path: "/usuarios/:id", component: DetalleUsuario },
  { path: "/modificarusuario/:id", component: ModificarUsuario }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/*
router.beforeEach((to, from, next) => {
  console.log(isAuthenticated())
  if (to.path !== "/login" && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
})
*/

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js"
