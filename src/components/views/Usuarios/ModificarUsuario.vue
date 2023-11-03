<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="usuario">
                <h3 class="text-center">Detalles del Usuario: <strong>{{ nombre }}</strong></h3>
                <div class="text-end mb-1"><code>*campos obligatorios</code></div>
                <div class="card bg-light text-dark mb-3">
                    <div class="card-body">
                        <p class="p pe-2 ps-2">
                            <strong>Nombre: <code>*</code></strong><input class="form-control" type="text"
                                v-model="usuario.nombre" placeholder="Ingrese el nombre del usuario" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.nombre">
                            <strong>El nombre no puede contener números o estar vacío</strong>
                        </h6>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.nombreSize">
                            <strong>El nombre debe tener un minimo de 2 caracteres y un maximo de 24</strong>
                        </h6>
                        <p class="p pe-2 ps-2">
                            <strong>Apellido: <code>*</code></strong><input class="form-control" type="text"
                                v-model="usuario.apellido" placeholder="Ingrese el apellido del usuario" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.apellido">
                            <strong>El apellido no puede contener números o estar vacío</strong>
                        </h6>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.apellidoSize">
                            <strong>El apellido debe tener un minimo de 2 caracteres y un maximo de 24</strong>
                        </h6>
                        <p class="p pe-2 ps-2"><strong>Mail: <code>*</code></strong><input class="form-control" type="email"
                                v-model="usuario.email" placeholder="correo@ejemplo.com" /></p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.emailExistente">
                            <strong>Error, este MAIL ya se encuentra registrado</strong>
                        </h6>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-else-if="showErrores.email">
                            <strong>Formato de mail inválido</strong>
                        </h6>
                        <p class="p pe-2 ps-2"><strong>Dni: <code>*</code></strong><input class="form-control" type="number"
                                v-model="usuario.dni" placeholder="12345678" /></p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.dniExistente">
                            <strong>Error, este DNI ya se encuentra registrado</strong>
                        </h6>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-else-if="showErrores.dni">
                            <strong>Formato del dni inválido</strong>
                        </h6>

                        <p class="p pe-2 ps-2"><strong>Fecha de nacimiento: <code>*</code></strong> <input
                                class="form-control" type="date" required v-model="usuario.fechaNacimiento"></p>
                        <p class="p pe-2 ps-2">

                            <strong>Telefono: <code>*</code></strong><input class="form-control" type="tel"
                                v-model="usuario.telefono" placeholder="1123456789" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.telefono">
                            <strong>Formato del telefono inválido</strong>
                        </h6>
                        <p class="p pe-2 ps-2">
                            <strong>Rol: <code>*</code></strong>
                            <select id="filtro" class="form-select" v-model="usuario.idRol">

                                <option selected disabled value="">Seleccione un Rol</option>
                                <option value="1">Administrador</option>
                                <option value="2">Coordinador</option>
                                <option value="3">Profesor</option>
                            </select>
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.rol">
                            <strong>El rol no debe estar vacio</strong>
                        </h6>
                        <p class="p pe-2 ps-2">
                            <strong>Activo: <code>*</code></strong>
                            <select id="filtro" class="form-select" v-model="usuario.activo">

                                <option selected disabled value="">Seleccione si el usuario esta activo</option>
                                <option value=true>Si</option>
                                <option value=false>No</option>
                            </select>
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.rol">
                            <strong>El estado de actividad no debe estar vacio</strong>
                        </h6>

                        <p class="p pe-2 ps-2">
                            <strong>Direccion: <code>*</code></strong><input class="form-control" type="text"
                                v-model="usuario.direccion" placeholder="Ingrese el direccion" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.direccion">
                            <strong>La dirección debe tener un minimo de 5 caracteres y un maximo de 50</strong>
                        </h6>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center mb-3">
                    <div class="btn-group">
                        <button class="btn btn-macabi1" @click="updateUsuario">
                            Actualizar Usuario
                        </button>
                        <button class="btn btn-success" @click="updatePass">
                            Cambiar contraseña
                        </button>
                        <button class="btn btn-danger" @click="deleteUsuario">
                            Eliminar Usuario
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 offset-md-3" v-else>
                <p class="alert alert-warning text-center">El usuario no existe.</p>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-dark" @click="volver">Volver</button>
            </div>
        </div>
    </div>
    <br>
</template>
<style scoped>
@import '../../../assets/alert.css';

h6 {
    background-color: #f8d7da;
    border-color: #f0959e;
    color: #723b47;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    padding: 8px;
}
</style>
<script>
import { useElementStore } from "../../../stores/Store";
import { useRouter, useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { UtilsUsuario, Utils } from '../../../utils/utils.js'

export default {
    setup() {

        const route = useRoute();
        const idUsuario = route.params.id.toString();
        const elementStore = useElementStore("usuario")();
        elementStore.fetchElementById(idUsuario).then(() => { nombre.value = `${usuario.value.apellido}, ${usuario.value.nombre}`})

        const usuario = computed(() => elementStore.currentElement);
        const router = useRouter();
        const utils = new Utils()
        const utilsUsuario = new UtilsUsuario()
        const showErrores = ref({})
        const nombre = ref(null)

        onMounted(() => {
            elementStore.fetchElements()
        })

        const updateUsuario = async () => {
            showErrores.value = utilsUsuario.validar(elementStore.currentElement, elementStore.elements)

            if (!utilsUsuario.errores(showErrores.value) && utils.confirm("modificar", "modificado", "Usuario")) {
                await elementStore.patchElement(usuario.value);
                location.reload()
            } else {
                alert("Error detectado en el ingreso de campos")
            }
        };

        function deleteUsuario() {
            alert("not implemented")
        }


        function volver() {
            router.go(-1)
        }


        function updatePass() {
            alert("not implemented")
        }

        return {
            updateUsuario,
            usuario,
            showErrores,
            nombre,
            volver,
            deleteUsuario,
            updatePass
        };
    }
};
</script>