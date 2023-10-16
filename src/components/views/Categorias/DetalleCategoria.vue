<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3" v-if="categoria">
                <div class="card bg-light text-dark mb-5">
                    <div v-if="categoria" class="card-body">
                        <h4>Detalles de la Categoría: <strong>{{ categoria.nombreCategoria }}</strong></h4>
                        <div>
                            <p>
                                <strong>Nombre: </strong><input type="text" class="form-control"
                                    v-model="categoria.nombreCategoria" />
                            </p>
                            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                                <strong>El nombre no puede estar vacío</strong>
                            </h6>
                            <p>
                                <strong>Deporte al que pertenece: </strong>
                                <select v-model="categoria.idDeporte">
                                    <option value="0" disabled>Selecciona el deporte</option>
                                    <option v-for="deporte in deporteStore.getElements.result" :value="deporte.idDeporte">
                                        {{ deporte.nombre }}
                                    </option>
                                </select>
                            </p>
                            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorDeporte">
                                <strong>El deporte no puede estar vacío</strong>
                            </h6>
                            <p>
                                <strong>Profesor: </strong>
                                <select v-model="categoria.idUsuario">
                                    <option value="0" disabled>Selecciona el profesor</option>
                                    <option v-for="profesor in usuariosStore.getElements.result"
                                        :value="profesor.idUsuario">
                                        {{ profesor.nombre }} {{ profesor.apellido }}
                                    </option>
                                </select>
                            </p>
                            <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorProfesor">
                                <strong>El profesor no puede estar vacío</strong>
                            </h6>
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
        <button class="btn btn-secondary"><router-link to="/categorias" class="nav-item nav-link" href="#">Volver a
                Categorías</router-link></button>
    </div>
</template>
<script>
import { useElementStore } from '../../../utils/Store';
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const categoriasStore = useElementStore("categorias")()
        const deporteStore = useElementStore("deportes")()
        const usuariosStore = useElementStore("usuarios")()

        const route = useRoute()
        const idCategoria = route.params.id

        onMounted(async () => {
            await categoriasStore.fetchElementById(`http://localhost:2020/categoria/`, idCategoria)
            await deporteStore.fetchElements(`http://localhost:2020/deporte/getSports`)
            await usuariosStore.fetchElements(`http://localhost:2020/usuario/3/rol`) // 3 para traerme todos los profesores
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
                await categoriasStore.updateElement(`http://localhost:2020/categoria`, catUpdated, "idCategoria");
               location.reload()
            }
        };

        const errorNombre = ref(false);
        const errorDeporte = ref(false);
        const errorProfesor = ref(false);

        function validar() {
            setearEnFalse();

            let resultado = true;
            if (categoria.value.nombreCategoria.trim() === '') { errorNombre.value = true; resultado = false; }
            if (categoria.value.idDeporte == null) { errorDeporte.value = true; resultado = false; }
            if (categoria.value.idUsuario == null) { errorProfesor.value = true; resultado = false; }

            return resultado;
        };

        function setearEnFalse() {
            errorNombre.value = false;
            errorDeporte.value = false;
            errorProfesor.value = false;
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
            errorDeporte,
            errorProfesor
        }
    }
}
</script>