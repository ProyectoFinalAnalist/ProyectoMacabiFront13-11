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
                <strong class="font-weight-bold" >Nombre</strong>
                <h5 class="text-primary"> {{usuario.nombre}}</h5>
                </p>

                <p>
                <strong class="font-weight-bold" >Apellido</strong>
                <h5 class="text-primary"> {{usuario.apellido}}</h5>
                </p>
                
                
                <p>
                <strong class="font-weight-bold" >Email</strong>
                <h5 class="text-primary"> {{usuario.email}}</h5>
                </p>

                <p>
                <strong class="font-weight-bold" >DNI</strong>
                <h5 class="text-primary"> {{usuario.dni}}</h5>
                </p>

                <p>
                <strong class="font-weight-bold" >Fecha de nacimiento</strong>
                <h5 class="text-primary"> {{usuario.fechaNacimiento}}</h5>
                </p>
                
                <p>
                <strong class="font-weight-bold" >Telefono</strong>
                <h5 class="text-primary"> {{usuario.telefono}}</h5>
                </p>
                
                <p>
                <strong class="font-weight-bold" >Rol</strong>
                <h5 class="text-primary"> {{roleName}}</h5>
                </p>
                
                <p>
                <strong class="font-weight-bold" >Activo</strong>
                <h5 class="text-primary"> {{activo}}</h5>
                </p>
               
                <p>
                <strong class="font-weight-bold" >Direccion</strong>
                <h5 class="text-primary"> {{usuario.direccion}}</h5>
                </p>

                
                <div class="d-flex justify-content-center">
                    <router-link class="btn btn-primary m-3" :to="`/modificarusuario/${usuario.idUsuario}`">Modificar Usuario</router-link>

                    <button class="btn btn-primary m-3" @click="updateUsuario">
                        Cambiar contraseña
                    </button>
                    <button class="btn btn-danger m-3" @click="deleteUsuario">
                        Borrar usuario
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
        
        onMounted(() => {
            elementStore.fetchElements()
        })
        
        const updateUsuario = async ()=> {
            showErrores.value=  utilsUsuario.validar(elementStore.currentElement, elementStore.elements)

            if (!utilsUsuario.errores(showErrores.value) &&  utils.confirm("modificar", "modificado", "Usuario")) {
                await elementStore.patchElement(usuario.value);
            }else{
                alert("Error detectado en el ingreso de campos")
            }
        };

        return {
        updateUsuario,
        usuario
        };
    },
    computed: {
    roleName() {
        switch (this.usuario.idRol) {
            case 1:
                return "Administrador";
            case 2:
                return "Coordinador";
            case 3: 
                return "Profesor"
            default:
                return "Unknown";
        }
    },
    activo(){
        return this.usuario.idRol ? "Si":"No"
    }
}
    };
    </script>
