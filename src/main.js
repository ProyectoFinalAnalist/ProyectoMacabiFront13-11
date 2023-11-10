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
import UpdatePassword from "./components/UpdatePassword.vue"

// ASISTENCIAS
import HistorialAsistencias from "./components/views/Asistencias/HistorialAsistencias.vue";
import SociosXFecha from "./components/views/Asistencias/SociosXFecha.vue";
import TomarAsistencia from "./components/views/Asistencias/TomarAsistencia.vue";

// CATEGORIAS
import CategoriasList from "./components/views/Categorias/CategoriasList.vue";
import CrearCategoria from "./components/views/Categorias/CrearCategoria.vue";
import DetalleCategoria from "./components/views/Categorias/DetalleCategoria.vue";
import ModificarCategoria from "./components/views/Categorias/ModificarCategoria.vue";

// DEPORTES
import DeportesList from "./components/views/Deportes/DeporteList.vue";
import DetalleDeporte from "./components/views/Deportes/DetalleDeporte.vue";
import editarDeporte from "./components/views/Deportes/EditarDeporte.vue";

// FECHAS
import CrearFecha from "./components/views/Fechas/CrearFecha.vue"
import DetalleFecha from "./components/views/Fechas/DetalleFecha.vue"
import NuevaFechaCitacion from "./components/views/Fechas/NuevaFechaCitacion.vue"
import FechasListCategoria from "./components/views/Fechas/FechasListCategoria.vue"
import EditarFecha from "./components/views/Fechas/EditarFecha.vue"

// SOCIOS
import RegistrarSocio from "./components/views/Socios/RegistrarSocio.vue"
import SociosList from "./components/views/Socios/SociosList.vue"
import AgregarSocio from "./components/views/Socios/AgregarSocio.vue"
import DetalleSocio from "./components/views/Socios/DetalleSocio.vue"
import UpdateSocio from "./components/views/Socios/UpdateSocio.vue"

// USUARIOS
import UsuariosList from "./components/views/Usuarios/UsuariosList.vue";
import CrearUsuario from "./components/views/Usuarios/CrearUsuario.vue";
import DetalleUsuario from "./components/views/Usuarios/DetalleUsuario.vue";
import ModificarUsuario from "./components/views/Usuarios/ModificarUsuario.vue";

// CONTACTOS DE EMERGENCIA
import ContactoEmergenciaAdmin from "./components/views/ContactoEmergencia/ContactoEmergenciaAdmin.vue"
import ContactoEmergenciaList from "./components/views/ContactoEmergencia/ContactoEmergenciaList.vue"

// ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES - ROUTES
const routes = [
  // APP 
  { path: "/", component: Home, },
  { path: "/login", component: Login, },
  { path: "/miUsuario", component: MiUsuario, },
  { path: "/newPassword", component: NewPassword, },
  { path: "/unauthorized", component: Unauthorized, },
  { path: "/updatePass/:idUsuario", component: UpdatePassword},

  // ASISTENCIAS
  { path: "/historialAsistencia/:id", component: HistorialAsistencias },
  { path: "/sociosPorFecha", component: SociosXFecha },
  { path: "/tomarAsistencia/:id", component: TomarAsistencia },

  // CATEGORIAS
  { path: "/categorias", component: CategoriasList }, // no se usa mas, se reemplaza con detalle deporte y deportes list
  { path: "/crearCategoria/:idDeporte", component: CrearCategoria }, // reemplazo con modal en editar Deporte
  { path: "/modificarCategoria/:id", component: ModificarCategoria },
  { path: "/detalleCategoria/:id", component: DetalleCategoria },

  // DEPORTES
  { path: "/deportes", component: DeportesList },
  { path: "/editarDeporte/:id", component: editarDeporte },
  { path: "/detalleDeporte/:id", component: DetalleDeporte },

  // FECHAS
  { path: "/editarFecha/:id", component: EditarFecha, },
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
  { path: "/crearusuario", component: CrearUsuario },
  { path: "/usuarios/:id", component: DetalleUsuario },
  { path: "/modificarusuario/:id", component: ModificarUsuario },

  // CONTACTOS DE EMERGENCIA
  { path: "/contactosEmergencia", component: ContactoEmergenciaList },
  { path: "/contactosEmergencia/admin", component: ContactoEmergenciaAdmin },
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
