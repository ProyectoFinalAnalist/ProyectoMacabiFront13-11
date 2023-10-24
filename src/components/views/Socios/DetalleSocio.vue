<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="socio">
                <div class="card bg-light text-dark mb-5">
                    <div v-if="socio" class="card-body">
                        <h4>Detalles del Socio: <strong>{{ socio.apellido }}, {{ socio.nombre }}</strong></h4>
                        <div>
                            <div class="card mt-3">
                                <div class="card-body">
                                    <p class="mb-0"><strong>Número de Socio:</strong> {{ socio.nroSocio }}</p>
                                    <p class="mb-0"><strong>DNI:</strong> {{ socio.dni }}</p>
                                    <p class="mb-0"><strong>Email:</strong> {{ socio.email }}</p>
                                    <p class="mb-0"><strong>Teléfono:</strong> {{ socio.telefono }}</p>
                                    <p class="mb-0"><strong>Dirección:</strong> {{ socio.direccion }}</p>
                                    <p class="mb-0"><strong>Fecha de Nacimiento:</strong> {{ socio.fechaNacimiento }}</p>
                                </div>
                            </div>

                            <hr>
                            <p class="p pe-3">
                                <strong>Observaciones: </strong>
                                <textarea style="height: 200px; max-height: 200px;" disabled class="form-control mt-2"
                                    v-model="socio.observaciones"></textarea>
                            </p>
                            <hr>
                            <p class="p pe-3">
                                <strong>Datos de contacto: </strong>
                                <br>
                            <div v-if="infoContactos == null">
                                <p class="text-center text-bg-danger p pe-3 ms-3 mt-2 h-2" style="border-radius: 10px;">
                                    <strong>Socio no posee datos de contacto</strong>
                                </p>
                            </div>
                            <div v-else class="card m-3" style="background-color: rgb(236, 236, 236);"
                                v-for="contacto in infoContactos">
                                <div class="card-body">
                                    <h5>Contacto: <strong>{{ contacto.nombre }} {{ contacto.apellido }}</strong></h5>
                                    <p class="p pe-3 mb-0">
                                        <strong>Email: </strong>{{ contacto.email }}
                                    </p>
                                    <p class="p pe-3 mb-0">
                                        <strong>Teléfono: </strong>{{ contacto.telefono }}
                                    </p>
                                </div>
                            </div>
                            </p>
                            <hr>
                            <p class="p pe-3">
                                <strong>Categorias asociadas: </strong>
                            </p>
                            <table class="table table-striped table-bordered">
                                <thead style="background-color: rgb(255, 255, 255);">
                                    <tr>
                                        <th>Categoria:</th>
                                        <th>Deporte:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="categoria in categorias" :key="categoria.idCategoria">
                                        <td>{{ categoria.nombreCategoria }}</td>
                                        <td>{{ obtenerNombreDeporte(categoria.idDeporte) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
                <strong>No se pudo cargar el socio :c</strong>
            </h5>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-secondary"><router-link to="/socios" class="nav-item nav-link" href="#">Volver a
                Socios</router-link></button>
    </div>
    <br>
</template>
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import apiUrl from '../../../../config/config.js'


export default {
    setup() {
        const sociosStore = useElementStore("socios")()
        const deporteStore = useElementStore("deportes")()
        const categoriasStore = useElementStore("categorias")()

        const route = useRoute()
        const idSocio = route.params.id

        onMounted(async () => {
            await sociosStore.fetchElementById(`${apiUrl}/socio/`, idSocio)
            await deporteStore.fetchElements(`${apiUrl}/deporte/getAll`)
            await categoriasStore.fetchElementById(`${apiUrl}/sociosXCategoria/categorias`, idSocio)
            data.value;
        })

        const socio = ref(null)
        const infoContactos = ref(null)
        const deporte = ref(null)
        const categorias = ref(null)

        const data = computed(() => {
            if (sociosStore.currentElement != null) {
                socio.value = sociosStore.currentElement.result;

                if (socio.value.InfoContactos.length != 0) {
                    infoContactos.value = socio.value.InfoContactos
                }
            }

            if (categoriasStore.currentElement != null) {
                categorias.value = categoriasStore.currentElement.categorias
            }

            if (deporteStore.getElements != null) {
                deporte.value = deporteStore.getElements.result
            }
        });

        function obtenerNombreDeporte(idDeporte) {
            const deporteEncontrado = deporteStore.getWithKeyValue("idDeporte",idDeporte)

            if (deporteEncontrado) { return deporteEncontrado.nombre; } else { return "Nombre no encontrado"; }
        }

        function deleteSocio() {
            alert("not implemented")
        }

        const updateSocio = async () => {
            alert("not implemented")
        };

        return {
            socio,
            sociosStore,
            updateSocio,
            deleteSocio,
            infoContactos,
            categorias,
            obtenerNombreDeporte
        }
    }
}
</script>