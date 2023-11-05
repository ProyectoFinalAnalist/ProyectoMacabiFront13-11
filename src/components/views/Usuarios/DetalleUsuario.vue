<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="usuario">
                <h3 class="text-center">Detalles del Usuario: <strong>{{ usuario.apellido }}, {{ usuario.nombre }}</strong>
                </h3>
                <br>
                <div class="card bg-light text-dark mb-4">
                    <div class="card-body">
                        <p class="mb-2"><strong class="font-weight-bold">Email: </strong>{{ usuario.email }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Dni: </strong>{{ usuario.dni }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Edad: </strong>{{ utils.obtenerEdadXFecha(usuario.fechaNacimiento) }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Fecha de nacimiento: </strong>{{ utils.obtenerFechaFormateada(usuario.fechaNacimiento) }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Telefono: </strong>{{ usuario.telefono }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Rol: </strong>{{ roleName }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Activo: </strong>{{ activo }}</p>
                        <p class="mb-2"><strong class="font-weight-bold">Direccion: </strong>{{ usuario.direccion }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 offset-md-3" v-else>
                <strong class="alert alert-warning text-center">El usuario no existe.</strong>
            </div>
            <div class="d-flex justify-content-center">
                    <div class="btn-group">
                        <router-link class="btn btn-macabi1" v-if="usuario" :to="`/modificarusuario/${usuario.idUsuario}`">Modificar
                            Usuario</router-link>

                            <button class="btn btn-dark" @click="volver">Volver</button>

                    </div>
                </div>
        </div>
    </div>
    <br>
</template>
<style>
@import '../../../assets/btn.css';
</style>
<script>
import { useElementStore } from "../../../stores/Store";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import { Utils } from "../../../utils/utils"

export default {
    setup() {

        const route = useRoute();
        const router = useRouter();
        const idUsuario = route.params.id.toString();
        const elementStore = useElementStore("usuario")();
        const utils = new Utils()
        elementStore.fetchElementById(idUsuario);

        const usuario = computed(() => elementStore.currentElement);

        onMounted(() => {
            elementStore.fetchElements()
        })

        function volver() {
            router.go(-1)
        }

        return {
            usuario,
            utils,
            volver
        };
    },
    computed: {
        roleName() {
            switch (this.usuario.idRol) {
                case 1:
                    return "Administrador";
                case 2:
                    return "Coordinador";
                case 3:
                    return "Profesor"
                default:
                    return "Unknown";
            }
        },
        activo() {
            return this.usuario.idRol ? "Si" : "No"
        }
    }
};
</script>
