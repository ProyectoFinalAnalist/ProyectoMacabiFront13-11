import { defineStore } from "pinia";
import axios from "axios";
import getCookie from '../../../utils/getCookie.js'

import apiUrl from '../../../config/config.js'

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        currentUser: null,
    }),
    actions: {

        async logIn(email, clave) {

            //si el usuarios es logedo exitosamente devuelve null,
            //en caso contrario devuelve un String con el mensaje de error

            let mensajeError

            try {

                const url = "http://localhost:5050/usuario/login"
                const data = {
                    email,
                    clave,
                };
                
                const response = await axios.post(url, data, { withCredentials: true });
                this.currentUser = response.data.payload

            } catch (error) {
                mensajeError = error.response.data.message;
            }

            return mensajeError
        },

        async reiniciarSesion() {

            let cookieSesion = getCookie(document.cookie, "tokenMacabi")


            const url = apiUrl + '/usuario/me';

            if (cookieSesion != '') {
                try {

                    const response = await axios.get(url, { withCredentials: true });
                    this.currentUser = response.data.user;

                } catch (error) {
                    alert("no se pudo relogear");
                    console.log(error.response.data.message);
                }

            }

        },

        async logOut() {

            this.currentUser = null;

            const url = apiUrl + '/usuario/logout';
            const data = {};

            try {
                const response = await axios.post(url, data, { withCredentials: true });
            } catch (error) {
                console.log(error)
            }

            

            
        },


    },
    getters: {

        isLogged() {
            return this.currentUser != null;
        },

        isAdmin() {
            return this.currentUser.idRol == 1;
        },
    },

})

