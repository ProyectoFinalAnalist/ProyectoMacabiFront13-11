<template>
    <div class="container mt-3">
        <div
            v-if="categoriasStore.getElements != null && deporteStore.getElements != null && usuariosStore.getElements != null">
            <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">LISTA DE CATEGORÍAS</div>
            <div class="d-flex justify-content-end">
                <p class="">Categorias en total: <strong>{{ size }}</strong></p>
            </div>
            <div v-if="categoriasStore.getElements != null || size > 0">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Categoria:</th>
                            <th class="d-none d-sm-table-cell">Deporte:</th>
                            <th>Profesor:</th>
                            <th>Detalles:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="categoria in categoriasStore.getElements.result" :key="categoria.idCategoria">
                            <td>{{ categoria.nombreCategoria }}</td>
                            <td class="d-none d-sm-table-cell">{{ obtenerNombreDeporte(categoria.idDeporte) }}</td>
                            <td>{{ obtenerProfesor(categoria.idUsuario) }}</td>
                            <td><router-link :to="`/categorias/${categoria.idCategoria}`"><strong>Ver
                                        detalles</strong></router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
            <strong>No hay categorias cargadas :c</strong>
        </h5>
        <br>
        <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-danger">
                <router-link to="/crearCategoria" class="nav-item nav-link" href="#">Crear Categoría</router-link>
            </button>
            <button class="btn btn-secondary">
                <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
            </button>
        </div>
        <br>
    </div>
</template>
<script>
import { useElementStore } from '../../../utils/Store';
import { onBeforeMount, ref } from "vue";
import apiUrl from '../../../../config/config.js'

export default {
    setup() {
        const categoriasStore = useElementStore("categorias")()
        const deporteStore = useElementStore("deportes")()
        const usuariosStore = useElementStore("usuarios")()
        const size = ref(0)
        const deportes = ref(null)
        const profesores = ref(null)

        onBeforeMount(async () => { fetchs() })

        async function fetchs() {
            await categoriasStore.fetchElements(`${apiUrl}/categoria/getAll`)
                .then(() => { size.value = categoriasStore.getElements.result.length })
            await deporteStore.fetchElements(`${apiUrl}/deporte/getAll`)
                .then(() => { deportes.value = deporteStore.getElements.result })
            await usuariosStore.fetchElements(`${apiUrl}/usuario/3/rol`) // 3 para traerme todos los profesores
                .then(() => { profesores.value = usuariosStore.getElements.result })
        }


        function obtenerNombreDeporte(idDeporte) {
            if (profesores.value != null) {
                const deporteEncontrado = deportes.value.find((deporte) => deporte.idDeporte === idDeporte);

                if (deporteEncontrado) { return deporteEncontrado.nombre; } else { return "Nombre no encontrado"; }
            } else { return "Cargando deportes..."; }
        }

        function obtenerProfesor(idUsuario) {
            if (profesores.value != null) {
                const usuarioEncontrado = profesores.value.find((usuario) => usuario.idUsuario === idUsuario);

                if (usuarioEncontrado) { return usuarioEncontrado.nombre; } else { return "Nombre no encontrado"; }
            } else { return "Cargando profesores..."; }
        }

        return {
            categoriasStore,
            deporteStore,
            usuariosStore,
            obtenerNombreDeporte,
            obtenerProfesor,
            size,
            fetchs
        }
    }
}
</script>