<template>
    <div class="container mt-3">
        <div v-if="deporteStore.getElements != null">
            <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">LISTA DE DEPORTES</div>
            <br>
            <form @submit.prevent="buscar()">
                <div class="row d-flex justify-content-start">
                    <div class="col m-0 p-0 me-4">
                        <input type="text" class="form-control m me-5" placeholder="Buscar por nombre..."
                            v-model="busqueda">
                    </div>
                    <div class="col col-sm m-0 p-0 me-4">
                        <button class="btn btn-danger" type="button" v-on:click="reiniciar">Reiniciar</button>
                    </div>
                    <div class="col d-none d-lg-table-cell"></div>
                    <div class="col col-sm d-none d-sm-table-cell">
                        <div class="d-flex justify-content-end mt-2">
                            <p>Deportes en total: <strong>{{ size }}</strong></p>
                        </div>
                    </div>
                </div>
            </form>
            <br>
            <div v-if="deporteStore.getElements != null || deporteStore.getElements.result.length > 0">
                <ul class="list-group m-0">
                    <li class="list-group-item list-group-item-secondary" v-for="deporte in deportes"
                        :key="deporte.idDeporte">
                        <div class="d-flex justify-content-between align-items-center">
                            <strong class="text-uppercase">{{ deporte.nombre }}</strong>
                            <router-link :to="`/deportes/${deporte.idDeporte}`" class="btn btn-primary">Ver
                                detalles</router-link>
                        </div>
                        <ul class="list-group mt-1">
                            <li class="list-group text-dark" v-on:click="irA(categoria.idCategoria)"
                                :class="[categoria.idCategoria == 0 ? 'list-group-item list-group-item-danger' : 'list-group-item list-group-item-action list-group-item-light']"
                                v-for="categoria in categoriasXDeporte(deporte.idDeporte)" :key="categoria.idCategoria">
                                {{ categoria.nombreCategoria }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
            <strong>No hay deportes cargados :c</strong>
        </h5>
        <br>
        <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-danger">
                <router-link to="/crearDeporte" class="nav-item nav-link" href="#">Crear Deporte</router-link>
            </button>
            <button class="btn btn-secondary">
                <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
            </button>
        </div>
        <br>
    </div>
</template>

<script>
import { useElementStore } from '../../../utils/Store';
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

import apiUrl from '../../../../config/config';

export default {
    setup() {
        const deporteStore = useElementStore("deportes")()
        const categoriasStore = useElementStore("categorias")()
        const size = ref(0)
        const deportes = ref(null)
        const categorias = ref(null)
        const router = useRouter();
        let busqueda = ""

        onBeforeMount(async () => { fetchs() })

        async function fetchs() {
            await categoriasStore.fetchElements(`${apiUrl}/categoria/getAll`)
                .then(() => {
                    categorias.value = categoriasStore.getElements.result
                })
            await deporteStore.fetchElements(`${apiUrl}/deporte/getAll`)
                .then(() => {
                    size.value = deporteStore.getElements.result.length
                    deportes.value = deporteStore.getElements.result
                })
        }

        function buscar() {
            reiniciar()
            busqueda = this.busqueda

            if (busqueda !== "" && size.value != 0) {

                deportes.value = deportes.value.filter(item => {
                    const propiedad = item["nombre"]
                    const propiedadLowerCase = String(propiedad).toLowerCase();
                    const busquedaLowerCase = String(busqueda).toLowerCase();
                    return propiedadLowerCase.includes(busquedaLowerCase);
                })
            }
        }

        function categoriasXDeporte(id) {
            const categoriasXDeporte = categorias.value.filter((categoria) => categoria.idDeporte === id);

            if (categoriasXDeporte.length == 0) { return [{ idCategoria: 0, nombreCategoria: "deporte sin categorias" }] }

            return categoriasXDeporte;
        }

        function reiniciar() {
            deportes.value = deporteStore.getElements.result
        }

        function irA(id) {
            if (id != 0) {
                router.push(`/categorias/${id}`);
            }
        }

        return {
            deporteStore,
            size,
            deportes,
            buscar,
            busqueda,
            categoriasXDeporte,
            irA,
            reiniciar
        }
    }
}
</script>