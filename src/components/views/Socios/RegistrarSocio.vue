<template>
    <div class="container_grid tamaño_m">

        <div class="container_title">
            Registrar Socio
        </div>

        <div class="container_basic">

            <div class="form-floating mb-3">

                <input type="text" id="nroSocioInput" class="form-control" :disabled="this.nroSocioAutoGen"
                    :class="this.classInvalid[0]" placeholder="" v-model="this.nroSocio" @keypress="isNumber($event)">

                <label for="nroSocioInput"> Numero De Socio </label>

                <div class="form-check form-switch switch">
                    <input id="switchNroSocio" class="form-check-input" type="checkbox" role="switch"
                        @click="autoGenerarNroSocio()">
                </div>

                <div class="invalid-feedback" v-for="error in this.errorsMatrix[0]">
                    {{ error }}
                </div>

            </div>

            <div class="doble_input">

                <div class="form-floating mb-3" style="width: 49%;">
                    <input type="text" id="nombreInput" class="form-control" :class="this.classInvalid[1]" placeholder=""
                        v-model="this.nombre" @keypress="isAlpha($event)">
                    <label for="nombreInput">Nombre</label>
                    <div class="invalid-feedback" v-for="error in this.errorsMatrix[1]">
                        {{ error }}
                    </div>
                </div>

                <div class="form-floating mb-3" style="width: 49%;">
                    <input type="text" id="apellidoInput" class="form-control" :class="this.classInvalid[2]" placeholder=""
                        v-model="this.apellido" @keypress="isAlpha($event)">
                    <label for="apellidoInput">Apellido</label>
                    <div class="invalid-feedback" v-for="error in this.errorsMatrix[2]">
                        {{ error }}
                    </div>
                </div>

            </div>

            <div class="form-floating mb-3">
                <input type="email" id="emailInput" class="form-control" :class="this.classInvalid[4]" placeholder=""
                    v-model="this.email">
                <label for="emailInput">Email</label>
                <div class="invalid-feedback" v-for="error in this.errorsMatrix[4]">
                    {{ error }}
                </div>
            </div>

            <div class="doble_input">

                <div class="form-floating mb-3" style="width: 49%;">
                    <input type="text" id="dniInput" class="form-control" :class="this.classInvalid[3]" placeholder=""
                        v-model="this.dni" @keypress="isNumber($event)" maxlength="12">
                    <label for="dniInput">DNI</label>
                    <div class="invalid-feedback" v-for="error in this.errorsMatrix[3]">
                        {{ error }}
                    </div>
                </div>

                <div class="form-floating mb-3" style="width: 49%;">
                    <input type="date" id="fechaInput" class="form-control" :class="this.classInvalid[7]" placeholder=""
                        v-model="this.fechaNacimiento" :max="this.selectedDate">
                    <label for="fechaInput" class="date_label">Fecha De Nacimeinto</label>
                    <div class="invalid-feedback" v-for="error in this.errorsMatrix[7]">
                        {{ error }}
                    </div>
                </div>



            </div>

            <div class="form-floating mb-3">
                <input type="text" id="telefonoInput" class="form-control" :class="this.classInvalid[5]" placeholder=""
                    v-model="this.telefono" @keypress="isNumber($event)" maxlength="12">
                <label for="telefonoInput">Telefono</label>
                <div class="invalid-feedback" v-for="error in this.errorsMatrix[5]">
                    {{ error }}
                </div>
            </div>

            <div class="form-floating mb-3">
                <input type="text" id="direccionInput" class="form-control" :class="this.classInvalid[6]" placeholder=""
                    v-model="this.direccion">
                <label for="direccionInput">Direccion</label>
                <div class="invalid-feedback" v-for="error in this.errorsMatrix[6]">
                    {{ error }}
                </div>
            </div>

            <div class="form-floating mb-3">
                <input type="text" id="ObservInput" class="form-control" :class="this.isInvalid" placeholder=""
                    v-model="this.observaciones">
                <label for="ObservInput">Observaciones</label>
            </div>
            
            <div class="d-flex justify-content-center align-items-center">
                <button type="submit" class="btn btn-macabi1" @click="validarCampos">Registar Socio</button>
            </div>

        </div>
    </div>
    <br>
    <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-dark" @click="volver">Cancelar</button>
    </div>
    <br>
</template>

<script>
import axios from 'axios';
import apiUrl from "../../../../config/config.js"

export default {
    data() {
        return {
            nroSocio: '',
            nroSocioAutoGen: false,

            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            telefono: '',
            direccion: '',
            fechaNacimiento: '',
            observaciones: '',

            classInvalid: ['', '', '', '', '', '', '', ''],
            errorsMatrix: [[], [], [], [], [], [], [], []],


            errorMsj: '',
            isInvalid: '',
            selectedDate: null,
        };
    },
    async created() {
        this.initializeDate()
    },
    methods: {

        autoGenerarNroSocio() {

            this.nroSocioAutoGen = !this.nroSocioAutoGen

            if (this.nroSocioAutoGen) {
                this.buffernroSocio = this.nroSocio
                this.nroSocio = 'Auto Generado'

            } else {
                this.nroSocio = this.buffernroSocio
            }

        },

        initializeDate() {
            const date = new Date()
            this.selectedDate = date.toISOString().slice(0, 10);
        },

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

            this.registrarSocio()

        },

        async registrarSocio() {

            this.classInvalid = ['', '', '', '', '', '', '', '']

            this.errorsMatrix = [[], [], [], [], [], [], [], []]

            try {
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

                let response


                if (!this.nroSocioAutoGen) {

                    response = await axios.post(`${apiUrl}/socio`, data, { withCredentials: true });

                } else {

                    response = await axios.post(`${apiUrl}/socio/noNroSocio`, data, { withCredentials: true });

                    alert("El socio se a registrado exitosamente")


                }

                this.$router.push(`/socios/${response.data.result.idSocio}`);


            } catch (error) {

                console.log(error);

                if (!error.response) {
                    console.error(error);
                    this.errorMsj = "Fallo en la comunicacion con el servidor"

                } else {
                    const erroresArray = error.response.data.message.split("Validation error: ").filter(Boolean).map(error => error.trim().replace(/,?$/, ''));

                    this.showErrors(erroresArray)
                }

            }

        },

        showErrors(erroresArray) {
            erroresArray.forEach(error => {
                const numero = parseInt(error.substring(0, 1));
                const mensaje = error.substring(1);


                if (/^[0-9]+(\.[0-9]+)?$/.test(numero)) {
                    this.classInvalid[numero] = 'is-invalid'
                    this.errorsMatrix[numero].push(mensaje);
                } else {
                    console.error(error)
                }

            });

        },

        volver() {
            this.$router.go(-1)
        }

    }
};
</script>

<style scoped>
.switch {
    display: flex;
    align-items: center;


    position: absolute;
    right: 30px;
    top: 15px;
}

.doble_input {
    display: flex;
    justify-content: space-between;
}

@media screen and (max-width:630px) {
    .date_label {
        max-width: 160px;
    }
}
</style>