<template>
    <div v-if="rol == 'A'">
        <div style="width: 100%;" class="text text-center p-5 h2">Opciones de Administrador</div>

        <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;">
            <button type="button" class="btn btn-primary" style="width: 100%;">
                <router-link to="/usuarios" class="fs-4 text text-white nav nav-link">Ir a Usuarios</router-link>
            </button>
        </div>
        <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;">
            <button type="button" class="btn btn-primary" style="width: 100%;">
                <router-link to="/socios" class="fs-4 text text-white nav nav-link">Ir a Socios</router-link>
            </button>
        </div>
        <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;">
            <button type="button" class="btn btn-primary" style="width: 100%;">
                <router-link to="/deportes" class="fs-4 text text-white nav nav-link">Ir a Deportes</router-link>
            </button>
        </div>
    </div>
    <div v-if="rol == 'C' && elementStore1.getElements != null">
        <div style="width: 100%;" class="text text-center p-5 h2">Tus Deportes asignados - Coordinador de Deportes</div>
        <div v-if="elementStore1.getElements.deportes.length > 0" v-for="sport in elementStore1.getElements.deportes">
            <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;"> <button type="button"
                    class="btn btn-primary" style="width: 100%;"> <router-link :to="'/deportes/' + sport.idDeporte"
                        class="fs-4 text text-white nav nav-link"> Ir a {{ sport.nombre }}</router-link>
                </button> </div>
        </div>
        <div v-else>
            <div style="width: 100%;" class="text text-center p-5 h5">No tienes deportes asignados :c</div>
        </div>
    </div>
    <div v-if="rol == 'P' && elementStore2.getElements != null">
        <div style="width: 100%;" class="text text-center p-5 h2">Tus Categorías asignadas - Profesor</div>
        <div v-if="elementStore2.getElements.categorias.length > 0"
            v-for="category in elementStore2.getElements.categorias">
            <div class="d-flex justify-content-center pb-3" style="width: 50%; margin: 0 auto;"> <button type="button"
                    class="btn btn-primary" style="width: 100%;"> <router-link :to="'/categorias/' + category.idCategoria"
                        class="fs-4 text text-white nav nav-link"> Ir a {{ category.nombreCategoria }}</router-link>
                </button> </div>
        </div>
        <div v-else>
            <div style="width: 100%;" class="text text-center p-5 h5">No tienes categorias asignadas :c</div>
        </div>
    </div>
    <br>
</template>
<script>
import { getRolFromCookie, getIdUsuarioFromCookie } from "../utils/Cookies"
import { useElementStore } from "../utils/Store"
import { onMounted } from "vue";

export default {
    setup() {
        let elementStore1 = useElementStore("deportes")()
        let elementStore2 = useElementStore("categorias")()
        let rol = getRolFromCookie()

        const idUsuario = getIdUsuarioFromCookie()

        onMounted(() => {
            if (rol == 'C') {
                ObtenerDeportes()
            } else if (rol == 'P') {
                ObtenerCategorias()
            }
        })

        function ObtenerDeportes() {
            elementStore1.fetchElements(`http://localhost:2020/usuarios/${idUsuario}/deportes`)
        }

        function ObtenerCategorias() {
            elementStore2.fetchElements(`http://localhost:2020/usuarios/${idUsuario}/categorias`)
        }

        return {
            elementStore1,
            elementStore2,
            rol,
        }
    },
}
</script>