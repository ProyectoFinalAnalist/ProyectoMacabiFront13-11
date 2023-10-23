<template>
    <div class="container mt-3">
        <div v-if="deporteStore.getElements != null">
            <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">LISTA DE DEPORTES</div>
            <div class="d-flex justify-content-end">
                <p class="">Deportes en total: <strong>{{ size }}</strong></p>
            </div>
            <div v-if="deporteStore.getElements != null || deporteStore.getElements.result.length > 0">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Deporte:</th>
                            <th>Detalles:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="deporte in deporteStore.getElements.result" :key="deporte.idDeporte">
                            <td>{{ deporte.nombre }}</td>
                            <td><router-link :to="`/deportes/${deporte.idDeporte}`"><strong>Ver
                                        detalles</strong></router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h5 v-else  class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
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
import apiUrl from '../../../../config/config';

export default {
    setup() {
        const deporteStore = useElementStore("deportes")()
        const size = ref(0)

        onBeforeMount(async () => { fetchs() })

        async function fetchs() {
            await deporteStore.fetchElements(`${apiUrl}/deporte/getAll`).then(() => { size.value = deporteStore.getElements.result.length })
        }

        return {
            deporteStore,
            size,
        }
    }
}
</script>