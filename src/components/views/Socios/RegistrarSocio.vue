<template>
    <div>
        <div class="container_grid tamaño_l" >

            <div class="titulo_container ">
                Registrar Socio
            </div>

            <div class="formulario_container">

                <div class="form-floating mb-3 mt-3">
                    <input type="number" id="nroSocioInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.nroSocio">
                    <label for="nroSocioInput">Numero De Socio</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" id="nombreInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.nombre" @keypress="isAlpha($event)">
                    <label for="nombreInput">Nombre</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" id="apellidoInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.apellido" @keypress="isAlpha($event)">
                    <label for="apellidoInput">Apellido</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" id="dniInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.dni" @keypress="isNumber($event)" maxlength="12">
                    <label for="dniInput">DNI</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" id="emailInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.email">
                    <label for="emailInput">Email</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" id="telefonoInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.telefono" @keypress="isNumber($event)" maxlength="12">
                    <label for="telefonoInput">Telefono</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" id="direccionInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.direccion">
                    <label for="direccionInput">Direccion</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="date" id="fechaInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.fechaNacimiento">
                    <label for="fechaInput">Fecha De Nacimeinto</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" id="ObservInput" class="form-control" :class="this.isInvalid" placeholder=""
                        v-model="this.Observaciones">
                    <label for="ObservInput">Observaciones</label>
                </div>

                <div class="container_buttons">
                    <button type="submit" class="btn btn-secondary" @click="">Cancelar</button>
                    <button type="submit"  class="btn btn-macabi1" @click="validarCampos">Registar Socio</button>
                </div>



                <tr></tr>

                {{ this.errorMsj }}

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from "../../../../config/config.js"

export default {
    data() {
        return {
            nroSocio: null,
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            telefono: '',
            direccion: '',
            fechaNacimiento: '',
            observaciones: '',
            errorMsj: 'no hay error'
        };
    },
    async created() {

    },
    methods: {

        isNumber(evt) {
            const regexNumbers = /[0-9]/g
            const keyPressed = evt.key;

            if (!regexNumbers.test(keyPressed)) {
                evt.preventDefault()
            }
        },

        isAlpha(evt) {
            const regexNumbers = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]?$/
            const keyPressed = evt.key;

            if (!regexNumbers.test(keyPressed)) {
                evt.preventDefault()
            }
        },

        validarCampos() {
            if (this.nroSocio == null || this.nombre == '' || this.apellido == '' || this.dni == '' ||
                this.email == '' || this.direccion == '' || this.fechaNacimiento == '' || this.telefono == "") {

                this.errorMsj = "debe completar todos los campos marcados para poder registrar al Socio"

            } else {

                this.registrarSocio()
            }

        },

        async registrarSocio() {

            try {
                const url = apiUrl + '/socio';
                const data = {
                    nroSocio: this.nroSocio,
                    nombre: this.nombre,
                    apellido: this.apellido,
                    dni: this.dni,
                    email: this.email,
                    telefono: this.telefono,
                    direccion: this.direccion,
                    fechaNacimiento: this.fechaNacimiento,
                    observaciones: this.observaciones,
                };

                const response = await axios.post(url, data, { withCredentials: true });

                console.log(response);

                alert("El socio se a registrado exitosamente")


            } catch (error) {

                if (!error.response) {
                    console.error(error);
                    this.errorMsj = "Fallo en la comunicacion con el servidor"

                } else {
                    this.errorMsj = error.response.data.message;
                }


            }

        }

    }
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.btn-macabi1 {
    color: white;
    background-color: #004896;
    border: 1px solid #013a77;
}

.btn-macabi1:hover {
    color: white;
    background-color: #013368;
}

.btn-macabi1:active  {
    background-color: #002b58; 
}
</style>