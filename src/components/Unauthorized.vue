<template>
    <div class="card fondo-card my-5">
        <div class="card-body h1 text text-center py-5 px-5">SIN AUTORIZACIÓN</div>
        <code class="px-5 text-center">Lo sentimos, parece que no tienes acceso a este sector de MACABI :c</code>
        <code class="mb-3 px-5 text-center">Hace click en "VOLVER" para seguir navegando...</code>
    </div>

    <div class="d-flex justify-content-center">
        <button class="btn btn-dark btn-lg" @click="this.router.go(-1)">Volver</button>
    </div>
</template>
<style scoped>
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
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            router: useRouter()
        }
    }
}

</script>
