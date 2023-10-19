<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="socio">
                <div class="card bg-light text-dark mb-5">
                    <div v-if="socio" class="card-body">
                        <h4>Detalles del Socio: <strong>{{ socio.apellido }}, {{ socio.nombre }}</strong></h4>
                        <div>
                            <p class="p pe-3">
                                <strong>Numero de Socio: </strong><input disabled type="text" class="form-control"
                                    v-model="socio.nroSocio" />
                            </p>
                            <p class="p pe-3">
                                <strong>Nombre: </strong><input type="text" class="form-control" v-model="socio.nombre" />
                            </p>
                            <p class="p pe-3">
                                <strong>Apellido: </strong><input type="text" class="form-control"
                                    v-model="socio.apellido" />
                            </p>
                            <p class="p pe-3">
                                <strong>Dni: </strong><input type="text" class="form-control" v-model="socio.dni" />
                            </p>
                            <p class="p pe-3">
                                <strong>Email: </strong><input type="text" class="form-control" v-model="socio.email" />
                            </p>
                            <p class="p pe-3">
                                <strong>Telefono: </strong><input type="text" class="form-control"
                                    v-model="socio.telefono" />
                            </p>
                            <p class="p pe-3">
                                <strong>Dirección: </strong><input type="text" class="form-control"
                                    v-model="socio.direccion" />
                            </p>
                            <p class="p pe-3">
                                <strong>Fecha de Nacimiento: </strong><input type="text" class="form-control"
                                    v-model="socio.fechaNacimiento" />
                            </p>
                            <p class="p pe-3">
                                <strong>Observaciones: </strong>
                                <textarea style="height: 100px; max-height: 200px;" class="form-control"
                                    v-model="socio.observaciones"></textarea>
                            </p>
                            <p class="p pe-3">
                                <strong>Datos de contacto: </strong>
                                <br>
                            <div class="card m-3" style="background-color: rgb(236, 236, 236);"
                                v-for="contacto in infoContactos">
                                <div class="card-body">
                                    <h5>Contacto: <strong>{{ contacto.nombre }} {{ contacto.apellido }}</strong></h5>
                                    <p class="p pe-3">
                                        <strong>Nombre: </strong><input type="text" class="form-control"
                                            v-model="contacto.nombre" />
                                    </p>
                                    <p class="p pe-3">
                                        <strong>Apellido: </strong><input type="text" class="form-control"
                                            v-model="contacto.apellido" />
                                    </p>
                                    <p class="p pe-3">
                                        <strong>Email: </strong><input type="text" class="form-control"
                                            v-model="contacto.email" />
                                    </p>
                                    <p class="p pe-3">
                                        <strong>Teléfono: </strong><input type="text" class="form-control"
                                            v-model="contacto.telefono" />
                                    </p>
                                </div>
                            </div>
                            </p>
                            <p class="p pe-3">
                                <strong>Categorias asociadas: </strong>
                            </p>
                            <table class="table table-striped table-bordered">
                                <thead>
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
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="updateSocio">Actualizar Socio</button>

                                <button class="btn btn-danger" @click="deleteSocio">Borrar Socio</button>
                            </div>
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

export default {
    setup() {
        const sociosStore = useElementStore("socios")()
        const deporteStore = useElementStore("deportes")()
        const categoriasStore = useElementStore("categorias")()

        const route = useRoute()
        const idSocio = route.params.id

        onMounted(async () => {
            await sociosStore.fetchElementById(`http://localhost:2020/socio/`, idSocio)
            await deporteStore.fetchElements(`http://localhost:2020/deporte/getSports`)
            await categoriasStore.fetchElementById(`http://localhost:2020/sociosXCategoria/categorias`, idSocio)
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
            const deporteEncontrado = deporteStore.getElements.result.find((deporte) => deporte.idDeporte === idDeporte);

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