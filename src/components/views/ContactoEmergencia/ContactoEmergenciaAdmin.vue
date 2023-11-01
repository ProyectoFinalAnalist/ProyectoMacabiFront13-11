<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="contactosEmergencia != null">
                <h3 class="text-center"><strong>MODIFICAR CONTACTOS DE EMERGENCIA</strong></h3>
                <div class="text-end mb-1"><code>*campos obligatorios</code></div>
                <div class="card bg-light text-dark mt-3 ms-3 me-0 mb-3" v-for="contacto in contactosEmergencia">
                    <div class="card-body">
                        <h4 class="mb-3">Detalles del Contacto: <strong>{{ obtenerNombre(contacto.idContactoEmergencia)
                        }}</strong></h4>
                        <div>
                            <p class="p pe-2 ps-2">
                                <strong>Nombre: <code>*</code></strong><input type="text" class="form-control"
                                    v-model="contacto.nombre" />
                            </p>
                            <p class="p pe-2 ps-2">
                                <strong>Email: </strong><input type="email" class="form-control" v-model="contacto.email" />
                            </p>
                            <p class="p pe-2 ps-2">
                                <strong>Telefono: </strong><input type="number" class="form-control"
                                    v-model="contacto.telefono" />
                            </p>
                            <p class="p pe-2 ps-2">
                                <strong>Observaciones: </strong>
                                <textarea style="height: 100px; max-height: 200px;" class="form-control"
                                    v-model="contacto.observaciones"></textarea>
                            </p>
                            <div class="d-flex justify-content-center">
                                <div class="btn-group">
                                    <button class="btn btn-primary" @click="updateContactoEmergencia(contacto)">Actualizar
                                        Contacto</button>
                                    <button class="btn btn-danger" @click="deleteContactoEmergencia(contacto)">Borrar
                                        Contacto</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
                <strong>No se pudo cargar los contactos de emergencia :c</strong>
            </h5>
        </div>
        <h5 v-if="message != null" class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3">
            <strong>{{ message }}</strong>
        </h5>
    </div>
    <div class="d-flex justify-content-center ms-3 mt-3">
        <div class="btn-group">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                Contacto</button>
            <button class="btn btn-dark"><router-link to="/contactosEmergencia" class="nav-item nav-link" href="#">Volver a
                    Contactos</router-link></button>
        </div>
    </div>
    <br>
    <!--MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear Contacto de Emergencia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="p pe-3">
                        <strong>Nombre: <code>*</code></strong><input type="text" class="form-control"
                            v-model="contactoCreate.nombre" />
                    </p>
                    <p class="p pe-3">
                        <strong>Email: </strong><input type="text" class="form-control" v-model="contactoCreate.email" />
                    </p>
                    <p class="p pe-3">
                        <strong>Teléfono: </strong><input type="number" min="0" class="form-control"
                            v-model="contactoCreate.telefono" />
                    </p>
                    <p class="p pe-3">
                        <strong>Observaciones: </strong>
                        <textarea style="height: 100px; max-height: 200px;" class="form-control"
                            v-model="contactoCreate.observaciones"></textarea>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="crearContactoEmergencia">Crear</button>
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
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import apiUrl from '../../../../config/config.js'

export default {
    setup() {
        const contactosStore = useElementStore("contactoEmergencia")()



        onMounted(async () => {
            await contactosStore.fetchElements(`${apiUrl}/contactoEmergencia/getAll`)
            data.value;
        })

        const contactosEmergencia = ref(null)
        const message = ref(null)

        const data = computed(() => {
            if (contactosStore.getElements != null) {
                contactosEmergencia.value = contactosStore.getElements.result

                contactosEmergencia.value.forEach(e => {
                    nombres.push([e.idContactoEmergencia, e.nombre])
                });
            }
        });

        function nombre(nombre) { return nombre }

        const contactoCreate = computed(() => contactosStore.currentElement)
        const messageModal = ref(null)

        contactosStore.setCurrentElement({
            nombre: "",
            email: "",
            telefono: "",
            observaciones: "",
        });

        const crearContactoEmergencia = (async () => {
            if (validarContacto("messageModal", contactoCreate.value) && contactosStore.confirm("crear", "registrado", "contacto de emergencia")) {
                await contactosStore.createElement(`${apiUrl}/contactoEmergencia/`, JSON.parse(JSON.stringify(contactoCreate.value)));
                location.reload()
            }
        });

        const updateContactoEmergencia = (async (contacto) => {
            if (validarContacto("message", contacto) && contactosStore.confirm("modificar", "modificado", "Contacto de " + obtenerNombre(contacto.idContactoEmergencia))) {
                await contactosStore.updateElement(`${apiUrl}/contactoEmergencia/`, JSON.parse(JSON.stringify(contacto)), "idContactoEmergencia");
                location.reload()
            }
        });

        const validateMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        function validarContacto(tipo, contacto) {
            let msj = ""
            let crear = false;

            if (String(contacto.nombre).length < 2 || String(contacto.nombre).length > 24) {
                msj = "El nombre debe tener un minimo de 2 caracteres y un maximo de 24.";
            } else if (contacto.email === '') {
                contacto.email = null
            } else if (!validateMail.test(contacto.email) && contacto.email !== null) {
                msj = "Formato Email incorrecto";
            } else if (contacto.telefono < 0) {
                msj = "El Telefono debe ser un número positivo";
            } else if (String(contacto.telefono).length > 30) {
                msj = "El teléfono debe tener un máximo de 30 caracteres.";
            } else if (String(contacto.observaciones).length > 250) {
                msj = "Las observaciones deben tener un maximo de 250 caracteres.";
            } else {
                crear = true
            }

            if (msj != "") {
                if (tipo === "message") {
                    message.value = msj
                } else {
                    messageModal.value = msj
                }
            }

            return crear
        }

        const deleteContactoEmergencia = (async (contacto) => {
            if (contactosStore.confirm("eliminar", "eliminar", `Contacto de ${contacto.nombre}`)) {
                await contactosStore.deleteElement(`${apiUrl}/contactoEmergencia/`, contacto.idContactoEmergencia);
                location.reload()
            }
        });

        const nombres = []

        function obtenerNombre(id) {
            const elementoEncontrado = nombres.find(item => item[0] === id);
            return elementoEncontrado ? elementoEncontrado[1] : 'No encontrado';
        }

        return {
            contactosEmergencia,
            nombre,
            message,
            messageModal,
            contactoCreate,
            crearContactoEmergencia,
            updateContactoEmergencia,
            deleteContactoEmergencia,
            obtenerNombre
        }
    },
}
</script>