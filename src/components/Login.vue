<template>
    <div v-if="usrStore.isLogged" class="">
        <h1>you are already logged in</h1>
        <button type="submit" class="" @click="salir">cerrar</button>
    </div>

    <div v-else class="container_basic">

        <div class="">
            <h1>INICIAR SESION</h1>
            <div>

                <div class=" ">
                    <input type="text" required v-model="this.email">
                    <span>email</span>
                </div>

                <div class=" ">
                    <input type="password" required v-model="this.clave">
                    <span>clave</span>
                </div>

                <button type="submit" class="" @click="ingresar">Iniciar Sesión</button>

                <button type="submit" class="" @click="">recuperar Clave</button>

                <div v-if="this.error" class="alert alert-danger" role="alert">
                    {{ this.msjError }}
                </div>

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
    methods: {
        async ingresar() {

            if (this.email == "" || this.clave == "") {

                this.error = true;
                this.msjError = `email o contraseña no ingreados`

            } else {

                let mensajeError = await this.usrStore.logIn(this.email, this.clave);

                if (mensajeError == null) {

                    this.error = false;


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

