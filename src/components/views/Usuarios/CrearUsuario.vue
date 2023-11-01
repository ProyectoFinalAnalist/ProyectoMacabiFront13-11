<template>
    <div class="container mt-4 ">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="usuario">
                <div class="card bg-light text-dark mb-4">
                    <div class="card-body">
                        <h4 class="text-center mt-2"><strong>Registrar Usuario</strong></h4>
                        <div class="text-end"><code>*campos obligatorios</code></div>
                        <p>
                            <strong>Nombre: <code>*</code></strong><input class="form-control" type="text"
                                v-model="usuario.nombre" placeholder="Ingrese el nombre del usuario" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.nombre">
                            <strong>El nombre no puede contener números o estar vacío</strong>
                        </h6>
                        <p>
                            <strong>Apellido: <code>*</code></strong><input class="form-control" type="text"
                                v-model="usuario.apellido" placeholder="Ingrese el apellido del usuario" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.apellido">
                            <strong>El apellido no puede contener números o estar vacío</strong>
                        </h6>
                        <p><strong>Email: <code>*</code></strong><input class="form-control" id="email" type="email"
                                v-model="usuario.email" placeholder="correo@ejemplo.com" /></p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.emailExistente">
                            <strong>Error, este MAIL ya se encuentra registrado</strong>
                        </h6>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-else-if="showErrores.email">
                            <strong>Formato de mail inválido</strong>
                        </h6>
                        <p><strong>Dni: <code>*</code></strong><input class="form-control" id="dni" type="number"
                                v-model="usuario.dni" placeholder="12345678" /></p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.dniExistente">
                            <strong>Error, este DNI ya se encuentra registrado</strong>
                        </h6>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-else-if="showErrores.dni">
                            <strong>Formato del dni inválido</strong>
                        </h6>
                        <div class="form-group row mb-3">
                            <p>
                                <strong>Contraseña: <code>*</code></strong>
                            </p>
                            <div class="col">
                                <input :type="mostrar" class="form-control" v-model="usuario.clave"
                                    placeholder="Ingrese contraseña" required />
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-outline-dark" type="button" id="togglePassword"
                                    @mousedown="mostrarContrasena" @mouseup="mostrarContrasena">Ver contraseña</button>
                            </div>
                        </div>
                        <h6 class="  alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.clave">
                            <strong>Error, la contraseña debe contener al menos 8 caracteres, un número y una
                                mayúscula</strong>
                        </h6>
                        <p><strong>Fecha de nacimiento: <code>*</code></strong> <input class="form-control" type="date"
                                required v-model="usuario.fechaNacimiento"></p>
                        <p>

                            <strong>Telefono: <code>*</code></strong><input class="form-control" type="tel"
                                v-model="usuario.telefono" placeholder="1123456789" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.telefono">
                            <strong>Formato del telefono inválido</strong>
                        </h6>
                        <p>
                            <strong>Rol: <code>*</code></strong>
                            <select id="filtro" class="form-select" v-model="usuario.idRol">

                                <option selected disabled value="">Seleccione el Rol</option>
                                <option value="1">Administrador</option>
                                <option value="2">Coordinador</option>
                                <option value="3">Profesor</option>
                            </select>
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.rol">
                            <strong>El rol no debe estar vacio</strong>
                        </h6>
                        <p>
                            <strong>Direccion: <code>*</code></strong><input class="form-control" type="text"
                                v-model="usuario.direccion" placeholder="Ingrese la direccion" />
                        </p>
                        <h6 class="alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.direccion">
                            <strong>La Direccion debe tener un minimo de 5 caracteres y un maximo de 50</strong>
                        </h6>
                        <button class="btn btn-primary mx-auto d-block" @click="crearUsuario">Crear Usuario</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-secondary" v-on:click="volver()">Volver</button>
    </div>
</template>
<style scoped>
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
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { UtilsUsuario, Utils } from '../../../utils/utils.js'

export default {
    setup() {

        const elementStore = useElementStore("usuario")();
        elementStore.setCurrentElement({
            nombre: "",
            apellido: "",
            email: "",
            clave: "",
            fechaNacimiento: "",
            telefono: "",
            idRol: "",
            dni: "",
            direccion: "",
        });

        const usuario = computed(() => elementStore.currentElement);
        const router = useRouter();
        const utils = new Utils()
        const utilsUsuario = new UtilsUsuario()
        const showErrores = ref({})

        onMounted(() => {
            elementStore.fetchElements()
        })

        const crearUsuario = async () => {
            showErrores.value = utilsUsuario.validar(elementStore.currentElement, elementStore.elements)

            if (!utilsUsuario.errores(showErrores.value) && utils.confirm("crear", "registrado", "Usuario")) {
                await elementStore.createElement(usuario.value);
                router.push("/login");
            } else {
                alert("Error detectado en el ingreso de campos")
            }
        };

        return {
            crearUsuario,
            usuario,
            showErrores
        };
    },
    data() {
        return {
            mostrar: "password",
            mostrarBool: true,
        };
    },
    methods: {
        mostrarContrasena() {
            if (this.mostrarBool) {
                this.mostrar = "text"
            } else this.mostrar = "password"
            this.mostrarBool = !this.mostrarBool
        },
        volver(){
            this.$router.go(-1)
        }
    }
};
</script>
