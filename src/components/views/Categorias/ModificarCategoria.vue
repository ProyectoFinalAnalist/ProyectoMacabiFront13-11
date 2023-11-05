<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="categoria">
                <div class="card bg-light text-dark mb-5">
                    <div v-if="categoria" class="card-body">
                        <h4>Detalles de la Categoría: <strong>{{ nombre }}</strong></h4>
                        <div>
                            <p class="p pe-3">
                                <strong>Nombre: </strong><input type="text" class="form-control ms-2"
                                    v-model="categoria.nombreCategoria" />
                            </p>
                            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                                <strong>El nombre no puede estar vacío</strong>
                            </h6>
                            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre2">
                                <strong>El nombre no puede repetirse</strong>
                            </h6>
                            <p class="p pe-3">
                                <strong>Deporte al que pertenece: </strong>
                            </p>
                            <ul class="list-group mt-1 mb-4 text-center">
                                <li class="list-group text-dark list-group-item list-group-item-light">
                                    <strong>{{ obtenerNombreDeporte(categoria.idDeporte).nombre }}</strong>
                                </li>
                            </ul>
                            <p class="p pe-3">
                                <strong>Profesor: </strong>
                                <select v-model="categoria.idUsuario" class="form-select ms-2">
                                    <option value="0" disabled>Selecciona el profesor</option>
                                    <option v-for="profesor in usuariosStore.getElements.result"
                                        :value="profesor.idUsuario">
                                        {{ profesor.nombre }} {{ profesor.apellido }}
                                    </option>
                                </select>
                            </p>
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="updateCategoria">Actualizar Categoría</button>

                                <button class="btn btn-danger" @click="deleteCategoria">Borrar Categoría</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
                <strong>No se pudo cargar la categoria :c</strong>
            </h5>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-secondary" @click="volverAtras()">Volver</button>
    </div>
</template>
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiUrl from '../../../../config/config.js'


export default {
    setup() {
        const categoriasStore = useElementStore("categorias")()
        const deporteStore = useElementStore("deportes")()
        const usuariosStore = useElementStore("usuarios")()

        const route = useRoute()
        const router = useRouter();
        const idCategoria = route.params.id

        const nombre = ref(null)

        onMounted(async () => {
            await categoriasStore.fetchElementById2(`${apiUrl}/categoria/`, idCategoria)
            await categoriasStore.fetchElements(`${apiUrl}/categoria/getAll`)
            await deporteStore.fetchElements(`${apiUrl}/deporte/getAll`)
            await usuariosStore.fetchElements(`${apiUrl}/usuario/3/rol`) // 3 para traerme todos los profesores
            data.value;
        })

        const categoria = ref(null)
        const deporte = ref(null)
        const profesor = ref(null)

        const data = computed(() => {
            if (categoriasStore.currentElement != null) {
                categoria.value = categoriasStore.currentElement.result;
                deporte.value = obtenerNombreDeporte(categoria.value.idDeporte);
                profesor.value = obtenerProfesor(categoria.value.idUsuario)
                nombre.value = categoria.value.nombreCategoria
            }
        });

        function obtenerNombreDeporte(idDeporte) {
            const deporteEncontrado = deporteStore.getElements.result.find((deporte) => deporte.idDeporte === idDeporte);

            if (deporteEncontrado) { return deporteEncontrado; } else { return "Nombre no encontrado"; }
        }

        function obtenerProfesor(idUsuario) {
            const usuarioEncontrado = usuariosStore.getElements.result.find((usuario) => usuario.idUsuario === idUsuario);

            if (usuarioEncontrado) { return usuarioEncontrado; } else { return "Nombre no encontrado"; }
        }

        function deleteCategoria() {
            alert("not implemented")
        }

        const updateCategoria = async () => {
            
            const catUpdated = JSON.parse(JSON.stringify(categoriasStore.currentElement.result))
            
            if (validar() && categoriasStore.confirm("modificar", "modificada", "Categoria")) {
                console.log(catUpdated);
                await categoriasStore.updateElement(`${apiUrl}/categoria`, catUpdated, "idCategoria");
                alert("..")
            }
        };

        const errorNombre = ref(false);
        const errorNombre2 = ref(false);
        const errorProfesor = ref(false);

        function validar() {
            setearEnFalse();

            let resultado = true;
            if (categoria.value.nombreCategoria.trim() === '') { errorNombre.value = true; resultado = false; }

            const categoriaExistente = categoriasStore.getElements.result.find((c) => {
                return c.nombreCategoria === categoria.value.nombreCategoria && c.idCategoria !== categoria.value.idCategoria;
            });

            if (categoriaExistente) {
                errorNombre2.value = true;
                resultado = false;
            }
            if (categoria.value.idUsuario == null) { errorProfesor.value = true; resultado = false; }

            return resultado;
        };

        function setearEnFalse() {
            errorNombre.value = false;
            errorNombre2.value = false;
            errorProfesor.value = false;
        }

        function volverAtras() {
            router.go(-1);
        }

        return {
            categoriasStore,
            deporteStore,
            usuariosStore,
            obtenerNombreDeporte,
            obtenerProfesor,
            updateCategoria,
            deleteCategoria,
            categoria,
            deporte,
            profesor,
            errorNombre,
            errorNombre2,
            errorProfesor,
            volverAtras,
            nombre
        }
    }
}
</script>