<template>
<RouterView></RouterView>
</template>


<script>
import { getRolFromCookie } from "./utils/Cookies"

export default {
    data() {
        return {
            rol: "null"
        };
    },
    created() {
        this.setRol();
    },
    methods: {
        setRol() {
            let rol = "Cuenta de tipo ";

            switch (getRolFromCookie()) {
                case 'A':
                    rol += "Admin";
                    break;
                case 'C':
                    rol += "Coordinador";
                    break;
                case 'P':
                    rol += "Profesor";
                    break;
                default:
                    rol += "null";
            }

            this.rol = rol;
        }
    },
}
</script>

