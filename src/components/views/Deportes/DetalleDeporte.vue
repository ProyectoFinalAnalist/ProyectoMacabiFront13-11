<template>
    <div class="mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="deporte">
                <div class="card bg-light text-dark mb-5" style="width: 100%;">
                    <div v-if="deporte" class="card-body">
                        <h4>Detalles del Deporte: <strong>{{ deporte.nombre }}</strong></h4>
                        <div>
                            <p>
                                <strong>Nombre: </strong><input type="text" class="form-control" v-model="deporte.nombre" />
                            </p>
                            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                                <strong>El nombre no puede estar vacío</strong>
                            </h6>
                            <p>
                                <strong>Categorias asignadas: </strong>
                            </p>
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="categoria in categorias" :key="categoria.idCategoria">
                                        <td>{{ categoria.nombreCategoria }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="justify-content-center d-flex">
                                <button class="btn btn-success mb-3" @click="agregarCategoria" data-bs-toggle="modal"
                                    data-bs-target="#myModal">Agregar Categoria</button>
                            </div>
                            <p>
                                <strong>Coordinadores: </strong>
                            </p>
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre:</th>
                                        <th>Apellido:</th>
                                        <th>DNI:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="coordinador in coordinadores" :key="coordinador.idUsuario">
                                        <td>{{ coordinador.nombre }}</td>
                                        <td>{{ coordinador.apellido }}</td>
                                        <td>{{ coordinador.dni }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="justify-content-center d-flex">
                                <button class="btn btn-success mb-3" @click="agregarCoordinador" data-bs-toggle="modal"
                                    data-bs-target="#myModal2">
                                    Agregar Coordinador
                                </button>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="updateDeporte">Actualizar Deporte</button>
                                <button class="btn btn-danger" @click="deleteDeporte">Borrar Deporte</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
                <strong>No se pudo cargar el deporte :c</strong>
            </h5>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-secondary"><router-link to="/deportes" class="nav-item nav-link" href="#">Volver a
                Deportes</router-link></button>
    </div>
    <!--MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Seleccionar Categorías</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="categoria in categoriasModal" :key="categoria.idCategoria">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :value="categoria.idCategoria">
                            <label class="form-check-label" for="exampleCheckbox1">
                                <p class="h6"> {{ categoria.nombreCategoria }} </p>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="saveSelectedCategories">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!--MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / MODAL 2 / -->
    <div class="modal fade" id="myModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">Seleccionar Coordinadores</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="coordinador in coordinadoresModal" :key="coordinador.idUsuario">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :value="coordinador.idUsuario">
                            <label class="form-check-label" for="exampleCheckbox1">
                                <p class="h6"> {{ coordinador.nombre }}, {{ coordinador.apellido }} | DNI: {{
                                    coordinador.dni }}</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="saveSelectedCoordinadores">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const categoriasStore = useElementStore("categorias")()
        const deporteStore = useElementStore("deportes")()
        const usuariosStore = useElementStore("usuarios")()

        const route = useRoute()
        const idDeporte = route.params.id

        onMounted(async () => {

            await deporteStore.fetchElementById(`http://localhost:2020/deporte/`, idDeporte);
            await categoriasStore.fetchElements(`http://localhost:2020/categoria/${idDeporte}/deporte`);
            await usuariosStore.fetchElements(`http://localhost:2020/deporte/${idDeporte}/coordinadores`);

            data.value;
        });

        const categorias = ref(null)
        const deporte = ref(null)
        const coordinadores = ref(null)

        const data = computed(() => {
            if (deporteStore.currentElement != null) {
                deporte.value = deporteStore.currentElement.result;
                categorias.value = categoriasStore.getElements.result
                coordinadores.value = usuariosStore.getElements.coordinadores
            }
        });

        function obtenerCoordinador(idUsuario) {
            const usuarioEncontrado = usuariosStore.getElements.result.find((usuario) => usuario.idUsuario === idUsuario);

            if (usuarioEncontrado) { return usuarioEncontrado; } else { return "Nombre no encontrado"; }
        }

        function deleteDeporte() {
            console.log(categorias.value[0].idCategoria)
        }

        const updateDeporte = async () => {
            const sportUpdated = JSON.parse(JSON.stringify(deporteStore.currentElement.result))
            const idsUsuarios = coordinadores.value.map((coordinador) => ({
                idUsuario: coordinador.idUsuario,
            }));

            if (validar() && categoriasStore.confirm("modificar", "modificado", "Deporte")) {
                const store = useElementStore("auxiliarTabla")()
                let registro = ""
                await store.fetchElementById(`http://localhost:2020/deporte/tablaIntermedia`, idDeporte)
                .then(() => {registro = JSON.parse(JSON.stringify(store.currentElement.result))})

                await categoriasStore.updateElement(`http://localhost:2020/deporte`, sportUpdated, "idDeporte");
                await usuariosStore.deleteElement(`http://localhost:2020/deporte/`, idDeporte);

                idsUsuarios.forEach(async (idUsuario) => {
                    registro.idUsuario = idUsuario.idUsuario
                    await usuariosStore.updateElement(`http://localhost:2020/deporte/coordinador`, registro, "idDeporte")
                })

                //Categorias update
                const store2 = useElementStore("categoriasUpdate")()
                await store2.fetchElementById(`http://localhost:2020/categoria`, categorias.value[0].idCategoria)

                categorias.value.forEach(async (categoria) => {
                    categoria.idDeporte = idDeporte
                    registro = JSON.parse(JSON.stringify(categoria))
                    await categoriasStore.updateElement(`http://localhost:2020/categoria`, registro, "idCategoria");
                })
                
                location.reload()
            }

        };

        const errorNombre = ref(false);

        function validar() {
            setearEnFalse();

            let resultado = true;
            if (deporte.value.nombre.trim() === '') { errorNombre.value = true; resultado = false; }


            return resultado;
        };

        function setearEnFalse() {
            errorNombre.value = false;
        }

        const categoriasModal = ref(null)

        const agregarCategoria = async () => {
            const store = useElementStore("auxiliarCategorias")()
            await store.fetchElements(`http://localhost:2020/categoria/getCategories`).then(() => {
                categoriasModal.value = store.getElements.result
            })
        }

        function saveSelectedCategories() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const valoresSeleccionados = [];

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    valoresSeleccionados.push(checkbox.value);
                }
            });

            const nuevasCategorias = [];

            categoriasModal.value.forEach((categoria) => {
                if (valoresSeleccionados.includes(categoria.idCategoria.toString())) {
                    nuevasCategorias.push(categoria);
                }
            });

            if (nuevasCategorias.length > 0) {
                categorias.value = nuevasCategorias;
            } else {
                alert("Debes seleccionar al menos una categoría.");
            }
        }

        const coordinadoresModal = ref(null)

        const agregarCoordinador = async () => {
            const store = useElementStore("auxiliarCoordinadores")()
            // 2 para obtener coordinadores
            await store.fetchElements(`http://localhost:2020/usuario/2/rol`).then(() => {
                coordinadoresModal.value = store.getElements.result
            })
        }

        function saveSelectedCoordinadores() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const valoresSeleccionados = [];

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    valoresSeleccionados.push(checkbox.value);
                }
            });

            const nuevosCoordinadores = [];

            coordinadoresModal.value.forEach((coordinador) => {
                if (valoresSeleccionados.includes(coordinador.idUsuario.toString())) {
                    nuevosCoordinadores.push(coordinador);
                }
            });

            if (nuevosCoordinadores.length > 0) {
                coordinadores.value = nuevosCoordinadores;
            } else {
                alert("Debes seleccionar al menos un coordinador.");
            }
        }

        return {
            categoriasStore,
            deporteStore,
            usuariosStore,
            deleteDeporte,
            updateDeporte,
            obtenerCoordinador,
            deporte,
            categorias,
            coordinadores,
            errorNombre,
            agregarCoordinador,
            agregarCategoria,
            categoriasModal,
            coordinadoresModal,
            saveSelectedCategories,
            saveSelectedCoordinadores
        }
    }
}
</script>