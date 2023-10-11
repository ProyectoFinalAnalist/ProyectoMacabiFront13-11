<template>
    <div>

        <div class="container_basic">
            <h1>Registrar Socio</h1>
            <div>

                <div class="">
                    <input type="number" required v-model="this.nroSocio">
                    <span>numero de socio</span>
                </div>

                <div class="">
                    <input type="text" id="nombreInput" required v-model="this.nombre" @keypress="isAlpha($event)">
                    <span>nombre</span>
                </div>

                <div class="">
                    <input type="text" id="apellidoInput" required v-model="this.apellido" @keypress="isAlpha($event)">
                    <span>apellido</span>
                </div>

                <div class="">
                    <input type="text" id="dniInput" required v-model="this.dni" maxlength="12" @keypress="isNumber($event)">
                    <span>dni</span>
                </div>

                <div class="">
                    <input type="text" required v-model="this.email">
                    <span>Email</span>
                </div>

                <div class="">
                    <input type="text" id="telefonoInput" required v-model="this.telefono" maxlength="12" @keypress="isNumber($event)">
                    <span>Telefono</span>
                </div>

                <div class="">
                    <input type="text" required v-model="this.direccion">
                    <span>Direccion</span>
                </div>

                <div class="">
                    <input type="date" required v-model="this.fechaNacimiento">
                    <span>Fecha De Nacimeinto</span>
                </div>

                <div class="">
                    <input type="text" required v-model="this.observaciones">
                    <span>Observaciones</span>
                </div>

                <button type="submit" class="" @click="validarCampos">Registar Socio</button>
                <button type="submit" class="" @click="validarCampos">Registar Socio</button>

                <tr></tr>

                {{ this.errorMsj }}

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

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
                const url = 'http://localhost:5050/socio';
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
</style>