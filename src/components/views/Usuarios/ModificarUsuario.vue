<template>
    <div class="container mt-4 ">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="usuario">
                <div class="text-center">
            <h4>Detalle Usuario</h4>
        </div>
                <div class="card bg-light text-dark mb-5">
            <div class="card-body">
                <p>
                <strong>Nombre</strong><input class="form-control" type="text" v-model="usuario.nombre"
                    placeholder="Ingrese el nombre del usuario" />
                </p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.nombre">
                <strong>El nombre no puede contener números o estar vacío</strong>
                </h6>
                <p>
                <strong>Apellido</strong><input class="form-control" type="text" v-model="usuario.apellido"
                    placeholder="Ingrese el apellido del usuario" />
                </p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.apellido">
                <strong>El apellido no puede contener números o estar vacío</strong>
                </h6>
                <p><strong>Mail: </strong><input class="form-control" type="email" v-model="usuario.email"
                    placeholder="correo@ejemplo.com" /></p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.emailExistente">
                <strong>Error, este MAIL ya se encuentra registrado</strong>
                </h6>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-else-if="showErrores.email">
                <strong>Formato de mail inválido</strong>
                </h6>
                <p><strong>Dni</strong><input class="form-control" type="number" v-model="usuario.dni"
                    placeholder="12345678" /></p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.dniExistente">
                <strong>Error, este DNI ya se encuentra registrado</strong>
                </h6>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-else-if="showErrores.dni">
                <strong>Formato del dni inválido</strong>
                </h6>

                <p><strong>Fecha de nacimiento</strong> <input class="form-control" type="date" required v-model="usuario.fechaNacimiento"></p>
                <p>
                
                <strong>Telefono</strong><input class="form-control" type="tel" v-model="usuario.telefono"
                placeholder="1123456789" />
                </p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.telefono">
                <strong>Formato del telefono inválido</strong>
                </h6>
                <p>
                <strong>Rol</strong>
                    <select id="filtro" class="form-select" v-model="usuario.idRol">

                        <option selected disabled value="">Seleccione un Rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Coordinador</option>
                        <option value="3">Profesor</option>
                        </select>
                </p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.rol">
                <strong>El rol no debe estar vacio</strong>
                </h6>
                <p>
                <strong>Activo</strong>
                    <select id="filtro" class="form-select" v-model="usuario.activo">

                        <option selected disabled value="">Seleccione si el usuario esta activo</option>
                        <option value=true>Si</option>
                        <option value=false>No</option>
                        </select>
                </p>
                <h6 class="bg-danger alert-sm mb-0 text-center p-2 m-2 rounded mb-3" v-if="showErrores.rol">
                <strong>El estado de actividad no debe estar vacio</strong>
                </h6>

                <p>
                <strong>Direccion</strong><input class="form-control" type="text" v-model="usuario.direccion"
                    placeholder="Ingrese el direccion" />
                </p>

                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary m-3" @click="updateUsuario">
                        Actualizar usuario
                    </button>
                </div>

            </div>
            </div>
        </div>
        <div class="col-md-6 offset-md-3" v-else>
        <!-- Display a message when the user doesn't exist -->
        <p class="alert alert-warning text-center">El usuario no existe.</p>
      </div>
        </div>
    </div>
    <br>
    </template>

    <script>
    import { useElementStore } from "../../../stores/Store";
    import { useRouter, useRoute } from "vue-router";
    import { computed, ref, onMounted } from "vue";
    import {UtilsUsuario, Utils} from '../../../utils/utils.js'

    export default {
    setup() {

        const route = useRoute();
        const idUsuario = route.params.id.toString();
        const elementStore = useElementStore("usuario")();
        elementStore.fetchElementById(idUsuario);

        const usuario = computed(() => elementStore.currentElement);
        const router = useRouter();
        const utils = new Utils()
        const utilsUsuario= new UtilsUsuario()               
        const showErrores = ref({})
        
        onMounted(() => {
            elementStore.fetchElements()
        })
        
        const updateUsuario = async ()=> {
            showErrores.value= utilsUsuario.validar(elementStore.currentElement, elementStore.elements)

            if (!utilsUsuario.errores(showErrores.value) &&  utils.confirm("modificar", "modificado", "Usuario")) {
                console.log("🚀 ~ file: ModificarUsuario.vue:128 ~ updateUsuario ~ usuario.value:", usuario.value)
                await elementStore.patchElement(usuario.value);
                router.push(`/usuarios/${elementStore.currentElement.idUsuario}`);
            }else{
                alert("Error detectado en el ingreso de campos")
            }
        };

        return {
        updateUsuario,
        usuario,
        showErrores
        };
    }
    };
    </script>