<template>
    <div class="container mt-4 ">
        <div class="text-center">
        <h4>Registrar Usuario</h4>
        </div>
        <div class="row">
        <div class="col-md-6 offset-md-3" v-if="usuario">
            <div class="card bg-light text-dark mb-5">
            <div class="card-body">
                <p>
                <strong>Nombre</strong><input class="form-control" type="text" v-model="usuario.nombre"
                    placeholder="Ingrese el nombre del usuario" />
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.nombre">
                <strong>El nombre no puede contener números o estar vacío</strong>
                </h6>
                <p>
                <strong>Apellido</strong><input class="form-control" type="text" v-model="usuario.apellido"
                    placeholder="Ingrese el apellido del usuario" />
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.apellido">
                <strong>El apellido no puede contener números o estar vacío</strong>
                </h6>
                <p><strong>Mail: </strong><input class="form-control" type="email" v-model="usuario.email"
                    placeholder="correo@ejemplo.com" /></p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.emailExistente">
                <strong>Error, este MAIL ya se encuentra registrado</strong>
                </h6>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-else-if="showErrores.email">
                <strong>Formato de mail inválido</strong>
                </h6>
                <p><strong>Dni</strong><input class="form-control" type="number" v-model="usuario.dni"
                    placeholder="12345678" /></p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.dniExistente">
                <strong>Error, este DNI ya se encuentra registrado</strong>
                </h6>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-else-if="showErrores.dni">
                <strong>Formato del dni inválido</strong>
                </h6>
                <div class="form-group row mb-3">
                <p>
                    <strong>Contraseña: </strong>
                </p>
                <div class="col">
                    <input :type="mostrar" class="form-control" v-model="usuario.clave" placeholder="Ingrese contraseña del usuario" required />
                </div>
                <div class="col-auto">
                    <button class="btn btn-outline-dark" type="button" id="togglePassword" @mousedown="mostrarContrasena"
                    @mouseup="mostrarContrasena">Ver contraseña</button>
                </div>
                </div>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.clave">
                <strong>Error, la contraseña debe contener al menos 8 caracteres, un número y una
                    mayúscula</strong>
                </h6>
                <p><strong>Fecha de nacimiento</strong> <input class="form-control" type="date" required v-model="usuario.fechaNacimiento"></p>
                <p>
                
                <strong>Telefono</strong><input class="form-control" type="tel" v-model="usuario.telefono"
                placeholder="11 12345678" />
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.telefono">
                <strong>Formato del telefono inválido</strong>
                </h6>
                <p>
                <strong>Rol</strong>
                    <select id="filtro" class="form-select" v-model="usuario.idRol">

                        <option selected disabled value="">Seleccione el Rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Coordinador</option>
                        <option value="3">Profesor</option>
                        </select>
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="showErrores.rol">
                <strong>El rol no debe estar vacio</strong>
                </h6>
                <p>
                <strong>Direccion</strong><input class="form-control" type="text" v-model="usuario.direccion"
                    placeholder="Ingrese la direccion" />
                </p>

                <button class="btn btn-primary mx-auto d-block" @click="crearUsuario">Crear Usuario</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <br>
    </template>

    <script>
    import { useElementStore } from "../../../stores/Store";
    import { useRouter } from "vue-router";
    import { computed, ref, onMounted } from "vue";
    import {UtilsUsuario, Utils } from '../../../utils/utils.js'

    export default {
    setup() {

        const elementStore = useElementStore("usuarios")();
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
        const utilsUsuario= new UtilsUsuario()               
        const showErrores = ref({})
        
        onMounted(() => {
            elementStore.fetchElements()
        })
        
        const crearUsuario = async ()=> {
            showErrores.value= utilsUsuario.validar(elementStore.currentElement, elementStore.elements)

            if ( !utilsUsuario.errores(showErrores.value) &&  utils.confirm("crear", "registrado", "Usuario")) {
                await elementStore.createElement(usuario.value);
                router.push("/login");
            }else{
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
        }
    }
    };
    </script>
