<template>
    <div v-if="usrStore.isLogged" class="">
        <h1>you are already logged in</h1>
        <button type="submit" class="" @click="salir">cerrar</button>
    </div>

    <div v-else class="container_grid tamaño_xs">

        <div class="titulo_container">
            Iniciar Sesion
        </div>

        <div class="formulario_container">

            <div class="form-floating mb-3 mt-3">
                <input type="email" class="form-control" id="emailInput" :class="this.isInvalid"
                    placeholder="name@example.com" v-model="this.email">
                <label for="emailInput">Email</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="passwordInput" :class="this.isInvalid"
                    placeholder="name@example.com" v-model="this.clave">
                <label for="passwordInput">Clave</label>
            </div>

            <div class="container_buttons">
                <button type="" class="btn btn-secondary" @click="">recuperar Clave</button>
                <button type="" class="btn btn-macabi1" @click="ingresar">Iniciar Sesión</button>
            </div>

            <div v-if="this.error" class="alert alert-danger" role="alert">
                {{ this.msjError }}
            </div>

        </div>

    </div>
</template>

<script>
import { usrStore } from './stores/usrStore.ts'

export default {
    data() {
        return {
            usrStore: usrStore(),
            email: "",
            clave: "",
            error: false,
            msjError: "",
        };
    },
    async created() {

    },
    computed: {

        isInvalid() {
            let msj
            if (this.error == true) {
                msj = 'is-invalid'
            }
            return msj
        }

    },
    methods: {
        async ingresar() {

            if (this.email == "" || this.clave == "") {

                this.error = true;
                this.msjError = `email o contraseña no ingreados`

            } else {

                let mensajeError = await this.usrStore.logIn(this.email, this.clave);

                if (mensajeError == null) {
                    this.error = false;

                    this.email = ""
                    this.clave = ""

                } else {

                    this.error = true;
                    this.msjError = mensajeError;
                }
            }
        },
        salir() {
            // metodo salir de usuario
            this.usrStore.logOut()
        }


    }
};

</script>

<style scoped>
.container_grid {
    grid-template-rows: 1fr 3fr;
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

.alert {
    text-align: center;
}

@media screen and (max-width:700px) {
    .container_buttons {
        flex-direction: column;
    }
}
</style>

