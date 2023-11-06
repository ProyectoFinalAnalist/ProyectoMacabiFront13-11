<template>
    <div class="container-fluid px-5 mb-5">
        <div v-if="deporteStore.getElements != null">
            <div style="width: 100%;" class="text text-center h1">DEPORTES</div>
            <br>
            <form @submit.prevent="buscar()">
                <div class="row g-2">
                    <div class="col-12 col-md-auto">
                        <input type="text" class="form-control" placeholder="Buscar por nombre..." v-model="busqueda">
                    </div>
                    <div class="col-12 col-md-auto">
                        <button class="btn btn-danger" type="button" v-on:click="reiniciar">Reiniciar</button>
                    </div>
                    <div class="col-12 col-md-auto d-none d-lg-table-cell"></div>
                    <div class="col text-md-end">
                        <div class="d-flex justify-content-end mt-2">
                            <p>Deportes en total: <strong>{{ size }}</strong></p>
                        </div>
                    </div>
                </div>
            </form>
            <br>
            <div v-if="deporteStore.getElements != null || deporteStore.getElements.result.length > 0">
                <ul class="list-group col-sm-6 col-md-4 mx-auto w-50 w-md-100">
                    <li class="list-group-item list-group-item-secondary" v-for="deporte in deportes"
                        :key="deporte.idDeporte">
                        <div class="d-flex justify-content-between align-items-center mb-1 mt-2 px-3">
                            <strong class="text-uppercase fs-5">{{ deporte.nombre }}</strong>
                        </div>
                        <ul class="list-group mt-1 mx-3 mt-2 fs-5">
                            <li class="list-group text-dark text-center" v-on:click="irA(categoria.idCategoria)"
                                :class="[categoria.idCategoria == 0 ? 'list-group-item list-group-item-danger' : 'pointer list-group-item list-group-item-action list-group-item-light']"
                                v-for="categoria in categoriasXDeporte(deporte.idDeporte)" :key="categoria.idCategoria">
                                {{ categoria.nombreCategoria }}
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="btn-group mt-3 mb-1">
                                <router-link :to="`/editarDeporte/${deporte.idDeporte}`"
                                    class="btn btn-success">Editar</router-link>
                                <router-link :to="`/detalleDeporte/${deporte.idDeporte}`"
                                    class="btn btn-macabi1">Detalles</router-link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
            <strong>No hay deportes cargados :c</strong>
        </h5>
        <br>
        <div class="d-flex justify-content-center align-items-center">
            <div class="btn-group">
                <button class="btn btn-macabi1" data-bs-toggle="modal" data-bs-target="#deporteModal">Crear Deporte</button>
                <router-link to="/" class="btn btn-dark" href="#">Volver a Inicio</router-link>
            </div>
        </div>
    </div>
    <!--MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / -->
    <div class="modal fade" id="deporteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear Deporte</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="p pe-3">
                        <strong>Nombre: <code>*</code></strong><input type="text" class="form-control"
                            v-model="nombreDeporte" />
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-macabi1" @click="crearDeporte">Crear</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <div class="text-start"><code>*campos obligatorios</code></div>
                </div>
            </div>
            <h5 v-if="messageModal != null" class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3">
                <strong>{{ messageModal }}</strong>
            </h5>
        </div>
    </div>
</template>
<style scoped>
@import '../../../assets/btn.css';

.pointer {
    cursor: pointer;
}

@media (max-width: 800px) {
    .w-md-100 {
        width: 100% !important;
    }
}
</style>
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
                });

                size.value = deportes.value.length || 0;
            } else {
                size.value = 0;
            }
        }

        function categoriasXDeporte(id) {
            const categoriasXDeporte = categorias.value.filter((categoria) => categoria.idDeporte === id);

            if (categoriasXDeporte.length == 0) { return [{ idCategoria: 0, nombreCategoria: "Deporte sin categorías" }] }

            return categoriasXDeporte;
        }

        function reiniciar() {
            deportes.value = deporteStore.getElements.result
            size.value = deportes.value.length
        }

        function irA(id) {
            if (id != 0) {
                router.push(`/detalleCategoria/${id}`);
            }
        }

        const nombreDeporte = ref(null)
        const messageModal = ref(null)

        async function crearDeporte() {
            messageModal.value = null
            if (nombreDeporte.value != null) {
                if (!validarRepeticion() && deporteStore.confirm("crear", "creado", "Deporte")) {

                    const nuevoDeporte = {
                        nombre: this.nombreDeporte
                    };

                    await deporteStore.createElement(`${apiUrl}/deporte`, nuevoDeporte)
                    location.reload()

                } else {
                    messageModal.value = "El nombre no debe repetirse"
                }
            } else {
                messageModal.value = "El nombre no debe estar vacío"
            }
        }

        function validarRepeticion() {
            return deportes.value.some((deporte) => deporte.nombre == nombreDeporte.value)
        }

        return {
            deporteStore,
            size,
            deportes,
            buscar,
            busqueda,
            categoriasXDeporte,
            irA,
            reiniciar,
            crearDeporte,
            messageModal,
            nombreDeporte,
        }
    },
}
</script>