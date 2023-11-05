<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h3 class="text-center"><strong>CONTACTOS DE EMERGENCIA</strong></h3>
                <br>
                <div class="text-white mb-5">
                    <p class="p pe-3">
                    <div v-if="contactosEmergencia == null">
                        <p class="text-center text-bg-danger p pe-3 ms-4 me-1 mt-2 h-2" style="border-radius: 10px;">
                            <strong>No existen contactos de emergencia aun</strong>
                        </p>
                    </div>
                    <div v-else class="card mt-3 ms-4 me-2 fondo-card" v-for="contacto in contactosEmergencia">
                        <div class="card-body" style="border-radius: 10px;">
                            <h4 class="text-center mb-3">Contacto: <strong>{{ contacto.nombre }}</strong></h4>
                            <p class="p pe-3 mb-2" v-if="contacto.email">
                                <strong>Email: </strong>{{ contacto.email }}
                            </p>
                            <p class="p pe-3 mb-2" v-if="contacto.telefono">
                                <strong>Teléfono: </strong>{{ contacto.telefono }}
                            </p>
                            <p class="p pe-3 mb-2" v-if="contacto.observaciones">
                                <strong>Observaciones: </strong>
                            <p style="font-style: italic;" class="mx-3 mt-2">{{ contacto.observaciones }}</p>
                            </p>
                        </div>
                    </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center mb-4">
        <div class="btn-group">
            <button v-if="usrStore.getRol == 'A'" class="btn btn-macabi1"><router-link to="/contactosEmergencia/admin"
                    class="nav-item nav-link" href="#">Modificar Contactos</router-link></button>
            <button class="btn btn-dark"><router-link to="/" class="nav-item nav-link" href="#">Volver al
                    inicio</router-link></button>
        </div>
    </div>
</template>
<style scoped>
@import '../../../assets/btn.css';

.fondo-card {
    background-color: #f8d7da;
    border-color: #f0959e;
    color: #723b47;
    border-width: 2px;
    border-style: solid;
    border-radius: 4px;
    padding: 8px;
}
</style>
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import apiUrl from '../../../../config/config.js'
import { usrStore } from '../../../stores/usrStore';

export default {
    setup() {
        const contactosStore = useElementStore("contactoEmergencia")()

        onMounted(async () => {
            await contactosStore.fetchElements(`${apiUrl}/contactoEmergencia/getAll`)
            data.value;
        })

        const contactosEmergencia = ref(null)

        const data = computed(() => {
            contactosEmergencia.value = contactosStore.getElements.result
        });

        return {
            contactosEmergencia,
        }
    },
    data() {
        return {
            usrStore: usrStore(),
        };
    },
}
</script>