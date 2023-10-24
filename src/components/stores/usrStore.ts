import { defineStore } from "pinia";
import axios from "axios";
import getCookie from '../../../utils/getCookie.js'

import apiUrl from '../../../config/config.js'
import { removeCookie, setCookie } from "../../utils/Cookies.js";

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        currentUser: null,
    }),
    actions: {

        async logIn(email, clave) {
            
            //si el usuarios es logedo exitosamente devuelve null,
            //en caso contrario devuelve un String con el mensaje de error

            let mensajeError = null

            try {
                const url = `${apiUrl}/usuario/login`
                const data = {
                    email,
                    clave,
                };

                const response = await axios.post(url, data, { withCredentials: true });
                this.currentUser = response.data.payload
                setCookie(response.data.payload)


            } catch (error) {

                mensajeError = error.response.data.message;
            }

            return mensajeError
        },

        async reiniciarSesion() {

            const cookieSesion = getCookie(document.cookie, "tokenMacabi")

            if (cookieSesion != '') {
                try {
                    const url = `${apiUrl}/usuario/me`

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

            try {
                const url = `${apiUrl}/usuario/logout`
                const data = {};
                const response = await axios.post(url, data, { withCredentials: true });
                alert(response.data.message);
                
            } catch (error) { 
                console.log(error)
            }
        },


    },
    getters: {

        isLogged() {
            return this.currentUser != null;
        },

        
        getId() {
            return this.currentUser.idUsuario;
        },

        getRol() {
            let result
            if (this.currentUser != null) {

                if (this.currentUser.idRol == 1) {
                    result = 'A'
                } else if (this.currentUser.idRol == 2) {
                    result = 'C'
                } else {
                    result = 'P'
                }

            } else {
                result = null
            }

            return result

        },
    },

})

