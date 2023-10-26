<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="socio">
                <div class="card bg-light text-dark mb-5">
                    <div v-if="socio" class="card-body">
                        <h4>Detalles del Socio: <strong>{{ nombre }}</strong></h4>
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
                                <strong>Dni: </strong><input type="number" min="0" class="form-control"
                                    v-model="socio.dni" />
                            </p>
                            <p class="p pe-3">
                                <strong>Email: </strong><input type="email" class="form-control" v-model="socio.email" />
                            </p>
                            <p class="p pe-3">
                                <strong>Telefono: </strong><input type="number" class="form-control"
                                    v-model="socio.telefono" />
                            </p>
                            <p class="p pe-3">
                                <strong>Dirección: </strong><input type="text" class="form-control"
                                    v-model="socio.direccion" />
                            </p>
                            <p class="p pe-3">
                                <strong>Fecha de Nacimiento: </strong><input type="date" id="fecha" max="2000-02-02"
                                    v-on:click="obtenerFechaMax()" class="form-control" v-model="socio.fechaNacimiento" />
                            </p>
                            <p class="p pe-3">
                                <strong>Observaciones: </strong>
                                <textarea style="height: 100px; max-height: 200px;" class="form-control"
                                    v-model="socio.observaciones"></textarea>
                            </p>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="updateSocio">Actualizar Socio</button>

                                <button class="btn btn-danger" @click="deleteSocio">Borrar Socio</button>
                            </div>
                            <hr>
                            <p class="p pe-3">
                                <strong>Datos de contacto: </strong>
                                <br>
                            <div class="card mt-3 ms-3 me-0 mb-3" style="background-color: rgb(236, 236, 236);"
                                v-for="contacto in infoContactos">
                                <div class="card-body">
                                    <h5>Contacto: <strong>{{ nombreContacto }}</strong></h5>
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
                                        <strong>Teléfono: </strong><input type="number" min="0" class="form-control"
                                            v-model="contacto.telefono" />
                                    </p>
                                    <div class="d-flex justify-content-center">
                                        <button class="btn btn-primary" @click="updateContacto(contacto)">Actualizar
                                            Contacto</button>
                                        <button class="btn btn-danger" @click="deleteContacto">Borrar Contacto</button>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Agregar
                                    Contacto</button>
                            </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
                <strong>No se pudo cargar el socio :c</strong>
            </h5>
        </div>
        <h5 v-if="message != null" class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3">
            <strong>{{ message }}</strong>
        </h5>
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-secondary"><router-link to="/socios" class="nav-item nav-link" href="#">Volver a
                Socios</router-link></button>
    </div>
    <br>
    <!--MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / MODAL / -->
    <div v-if="socio" class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear Contacto para {{ socio.nombre }}, {{ socio.apellido
                    }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="p pe-3">
                        <strong>Nombre: </strong><input type="text" class="form-control" v-model="contactoCreate.nombre" />
                    </p>
                    <p class="p pe-3">
                        <strong>Apellido: </strong><input type="text" class="form-control"
                            v-model="contactoCreate.apellido" />
                    </p>
                    <p class="p pe-3">
                        <strong>Email: </strong><input type="text" class="form-control" v-model="contactoCreate.email" />
                    </p>
                    <p class="p pe-3">
                        <strong>Teléfono: </strong><input type="number" min="0" class="form-control"
                            v-model="contactoCreate.telefono" />
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="crearContacto">Crear</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
            <h5 v-if="messageModal != null" class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3">
                <strong>{{ messageModal }}</strong>
            </h5>
        </div>
    </div>
</template>
<style>
@import '../../../assets/alert.css';
</style>
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import apiUrl from '../../../../config/config.js'

export default {
    setup() {
        const sociosStore = useElementStore("socios")()
        const contactoStore = useElementStore("contacto")()

        const route = useRoute()
        const idSocio = route.params.id

        const nombre = ref(null)
        const nombreContacto = ref(null)

        onMounted(async () => {
            await sociosStore.fetchElements(`${apiUrl}/socio/getSocios`)
            await sociosStore.fetchElementById(`${apiUrl}/socio/`, idSocio)
            await contactoStore.fetchElements(`${apiUrl}/contacto/getAllContactos`)
            data.value;
        })

        const socio = ref(null)
        const infoContactos = ref(null)

        const data = computed(() => {
            if (sociosStore.currentElement != null) {
                socio.value = sociosStore.currentElement.result;
                nombre.value = `${socio.value.apellido}, ${socio.value.nombre}`

                if (socio.value.InfoContactos.length != 0) {
                    infoContactos.value = socio.value.InfoContactos
                    nombreContacto.value = `${infoContactos.value[0].apellido}, ${infoContactos.value[0].nombre}`
                }
            }
        });

        const message = ref(null);
        const soloLetras = /^[A-Za-z\s]+$/; // letras y espacios
        const validateMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        const updateSocio = async () => {
            const dni = socio.value.dni;
            const email = socio.value.email;

            let hasDuplicateDNI = false
            let hasDuplicateEmail = false

            if (sociosStore.getElements.result.length > 0) {
                hasDuplicateDNI = sociosStore.getElements.result.some((socio) => socio.dni === dni && socio.idSocio != idSocio);
                hasDuplicateEmail = sociosStore.getElements.result.some((socio) => socio.email === email && socio.idSocio != idSocio);
            }

            if (hasDuplicateDNI) {
                message.value = "El DNI no puede repetirse";
            } else if (hasDuplicateEmail) {
                message.value = "El correo electrónico no puede repetirse";
            } else if (!/@/.test(email) && email.trim() === '') {
                message.value = "El Email debe debe contener '@' y no estar vacío";
            } else if (!validateMail.test(email)) {
                message.value = "Formato Email incorrecto";
            } else if (dni < 0) {
                message.value = "El DNI debe ser un número positivo";
            } else if (String(dni).length < 6 || String(dni).length > 10) {
                message.value = "El DNI debe tener un largo minimo de 6 digitos y un maximo de 10.";
            } else if (socio.value.telefono < 0) {
                message.value = "El Telefono debe ser un número positivo";
            } else if (String(socio.value.telefono).length < 8 || String(socio.value.telefono).length > 15) {
                message.value = "El teléfono debe tener un mínimo de 8 caracteres y un máximo de 15.";
            } else if (String(socio.value.nombre).length < 2 || String(socio.value.nombre).length > 24) {
                message.value = "El nombre debe tener un minimo de 2 caracteres y un maximo de 24.";
            } else if (!soloLetras.test(socio.value.nombre)) {
                message.value = "El nombre debe contener solo letras.";
            } else if (String(socio.value.apellido).length < 2 || String(socio.value.nombre).length > 24) {
                message.value = "El apellido debe tener un minimo de 2 caracteres y un maximo de 24.";
            } else if (!soloLetras.test(socio.value.apellido)) {
                message.value = "El apellido debe contener solo letras.";
            } else if (String(socio.value.direccion).length < 5 || String(socio.value.direccion).length > 50) {
                message.value = "La Direccion debe tener un minimo de 5 caracteres y un maximo de 50.";
            } else if (String(socio.value.observaciones).length > 250) {
                message.value = "Las observaciones deben tener un maximo de 250 caracteres.";
            }
            else {
                if (sociosStore.confirm("modificar", "modificado", "Socio")) {
                    const socioUpdate = JSON.parse(JSON.stringify(sociosStore.currentElement.result))
                    try {
                        await sociosStore.updateElement(`${apiUrl}/socio`, socioUpdate, "idSocio")
                        location.reload()
                    } catch (e) {
                        console.log(e)
                        message.value = "Error updating";
                    }
                }
            }
        };

        function deleteSocio() {
            alert("not implemented")
        }

        const contactoCreate = computed(() => contactoStore.currentElement)
        const messageModal = ref(null)

        contactoStore.setCurrentElement({
            idSocio: idSocio,
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
        });

        const crearContacto = (async () => {
            if (validarContacto("messageModal", contactoCreate.value) && contactoStore.confirm("crear", "registrado", "Contacto")) {
                await contactoStore.createElement(`${apiUrl}/contacto/`, JSON.parse(JSON.stringify(contactoCreate.value)));
                location.reload()
            }
        });

        const updateContacto = (async (contacto) => {

            if (validarContacto("message", contacto) && contactoStore.confirm("modificar", "modificado", "Contacto")) {
                await contactoStore.updateElement(`${apiUrl}/contacto/`, JSON.parse(JSON.stringify(contacto)), "idInfoContacto");
                location.reload()
            }
        });

        function validarContacto(tipo, contacto) {
            let msj = ""
            let crear = false;

            if (String(contacto.nombre).length < 2 || String(contacto.nombre).length > 24) {
                msj = "El nombre debe tener un minimo de 2 caracteres y un maximo de 24.";
            } else if (!soloLetras.test(contacto.nombre)) {
                msj = "El nombre debe contener solo letras.";
            } else if (String(contacto.apellido).length < 2 || String(contacto.apellido).length > 24) {
                msj = "El apellido debe tener un minimo de 2 caracteres y un maximo de 24.";
            } else if (!soloLetras.test(contacto.apellido)) {
                msj = "El apellido debe contener solo letras.";
            } else if (!validateMail.test(contacto.email)) {
                msj = "Formato Email incorrecto";
            } else if (contacto.telefono < 0) {
                msj = "El Telefono debe ser un número positivo";
            } else if (String(contacto.telefono).length < 9 || String(contacto.telefono).length > 30) {
                msj = "El teléfono debe tener un mínimo de 9 caracteres y un máximo de 30.";
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

        function deleteContacto() {
            alert("not implemented")
        }

        function obtenerFechaMax() {
            let fecha = document.getElementById("fecha")
            const fechaActual = new Date();
            const year = fechaActual.getFullYear();
            const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaActual.getDate().toString().padStart(2, '0') - 1;
            const fechaMaxima = `${year}-${month}-${day}`;
            fecha.max = fechaMaxima
        }

        return {
            socio,
            sociosStore,
            updateSocio,
            deleteSocio,
            infoContactos,
            obtenerFechaMax,
            message,
            updateContacto,
            deleteContacto,
            crearContacto,
            contactoCreate,
            messageModal,
            nombre,
            nombreContacto
        }
    }
}
</script>