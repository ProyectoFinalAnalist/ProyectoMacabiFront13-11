<template>
    <div class="mb-5">
        <div v-if="usuarioStore.getRol == 'A'">
            <div style="width: 100%;" class="text text-center pb-5 h1">Opciones de Administrador</div>

            <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;">
                <button type="button" class="btn btn-macabi1" style="width: 100%;">
                    <router-link to="/usuarios" class="fs-4 text text-white nav nav-link">Usuarios</router-link>
                </button>
            </div>
            <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;">
                <button type="button" class="btn btn-macabi1" style="width: 100%;">
                    <router-link to="/socios" class="fs-4 text text-white nav nav-link">Socios</router-link>
                </button>
            </div>
            <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;">
                <button type="button" class="btn btn-macabi1" style="width: 100%;">
                    <router-link to="/deportes" class="fs-4 text text-white nav nav-link">Deportes</router-link>
                </button>
            </div>
        </div>

        <div v-else-if="usuarioStore.getRol == 'C' && deportesDeUsuario.getElements != null">
            <div style="width: 100%;" class="text text-center pb-5 h1">Tus Deportes asignados - Coordinador de Deportes</div>
            <div v-if="deportesDeUsuario.getElements.deportes.length > 0"
                v-for="sport in deportesDeUsuario.getElements.deportes">
                <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;"> <button type="button"
                        class="btn btn-macabi1" style="width: 100%;"> <router-link
                            :to="'/detalleDeporte/' + sport.idDeporte" class="fs-4 text text-white nav nav-link">{{
                                sport.nombre }}</router-link>
                    </button> </div>
            </div>
            <div v-else>
                <div style="width: 100%;" class="text text-center p-5 h5">No tienes deportes asignados :c</div>
            </div>
        </div>

        <div v-else-if="usuarioStore.getRol == 'P' && categoriasDeUsuario.getElements != null">
            <div style="width: 100%;" class="text text-center pb-5 h1">Tus Categorías asignadas - Profesor</div>
            <div v-if="categoriasDeUsuario.getElements.categorias.length > 0"
                v-for="category in categoriasDeUsuario.getElements.categorias">
                <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;"> <button type="button"
                        class="btn btn-macabi1" style="width: 100%;"> <router-link
                            :to="'/detalleCategoria/' + category.idCategoria" class="fs-4 text text-white nav nav-link">{{
                                category.nombreCategoria }} - {{ category.Deporte.nombre }}</router-link>
                    </button> </div>
            </div>
            <div v-else>
                <div style="width: 100%;" class="text text-center p-5 h5">No tienes categorias asignadas :c</div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center mb-5 text-center" style="width: 50%; margin: 0 auto;">
        <button type="button btn-lg" class="btn btn-danger" style="width: 100%;">
            <router-link to="/contactosEmergencia" class="text-white nav nav-link"><strong>CONTACTOS DE
                EMERGENCIA</strong></router-link>
        </button>
    </div>
</template>
<script>
import { useElementStore } from "../utils/Store"
import { usrStore } from '../stores/usrStore.ts'
import apiUrl from "../../config/config";


export default {
    data() {
        return {
            usuarioStore: usrStore(),
            deportesDeUsuario: useElementStore("deportesDeUsuario")(),
            categoriasDeUsuario: useElementStore("categoriasDeUsuario")()
        }
    },
    async mounted() {

        if (!this.usuarioStore.isLogged) {
            await this.usuarioStore.reiniciarSesion()
        }

        switch (this.usuarioStore.getRol) {
            case 'C':
                this.obtenerDeportes()
                break;
            case 'P':
                this.obtenerCategorias()
                break;
        }
    },

    methods: {
        obtenerDeportes() {
            this.deportesDeUsuario.fetchElements(`${apiUrl}/usuario/${this.usuarioStore.getId}/deportes`)
        },

        obtenerCategorias() {
            this.categoriasDeUsuario.fetchElements(`${apiUrl}/usuario/${this.usuarioStore.getId}/categorias`)
        },
    },
}

</script>

<style scoped>
@import '../../src/assets/btn.css';
.container {
    display: flex;
    flex-direction: column;
}
</style>