<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar shadow-lg p-2">
        <div class="container-fluid">
            <div class="navbar-nav mr-auto">
                <router-link to="/" class="navbar-brand">Macabi Deportes</router-link>
            </div>
            <div class="navbar-nav ms-auto d-flex align-items-center">
                <p class="nav-item nav-link d-flex align-items-center">
                    <span class="ml-2">{{ rol }}</span>
                </p>
                <p class="nav-item nav-link d-flex align-items-center">
                    <span class="ml-2">nombreUsuario</span>
                    <img src="/src/components/icons/User_Icon.svg"
                        style="width: 20px; height: 20px; margin-left: 8px; opacity: 0.8;" alt="Icono de Usuario">
                </p>
                <p class="nav-item nav-link d-flex align-items-center">Cerrar Sesión <img
                        src="/src/components/icons/Cerrar Sesion logo.svg"
                        style="width: 20px; height: 20px; margin-left: 8px; opacity: 0.8;" alt="Icono de Usuario"></p>
            </div>
        </div>
    </nav>
    <RouterView></RouterView>
</template>
<script>
import { getRolFromCookie } from "./utils/Cookies"

export default {
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

            switch (getRolFromCookie()) {
                case 'A':
                    rol += "Admin";
                    break;
                case 'C':
                    rol += "Coordinador";
                    break;
                case 'P':
                    rol += "Profesor";
                    break;
                default:
                    rol += "null";
            }

            this.rol = rol;
        }
    },
}
</script>
