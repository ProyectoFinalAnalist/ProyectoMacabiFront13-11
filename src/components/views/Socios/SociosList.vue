<template>
    <div class="container-fluid ps-5 pe-5">
        <div v-if="sociosStore.getElements != null">
            <div class="text text-center h1">SOCIOS</div>
            <br>
            <form @submit.prevent="buscar()">
                <div class="row d-flex justify-content-start">
                    <div class="col col-sm">
                        <select id="filtro" class="form-select">
                            <option disabled>Filtrar por:</option>
                            <option value="nroSocio">Número de Socio</option>
                            <option selected value="nombre">Nombre</option>
                            <option value="apellido">Apellido</option>
                            <option value="dni">Dni</option>
                            <option value="email">Mail</option>
                        </select>
                    </div>
                    <div class="col col-sm m-0 p-0 me-4">
                        <input type="text" class="form-control" placeholder="Buscar..." v-model="busqueda">
                    </div>
                    <div class="col col-sm m-0 p-0 me-4">
                        <button class="btn btn-danger" type="button" v-on:click="reiniciar">Reiniciar</button>
                    </div>
                    <div class="col col-sm d-none d-sm-table-cell">
                        <div class="d-flex justify-content-end mt-3 mb-0">
                            <p>Socios en total: <strong>{{ size }}</strong></p>
                        </div>
                    </div>
                </div>
            </form>
            <br>
            <div v-if="sociosStore.getElements != null || size > 0">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th class="d-none d-sm-table-cell">NroSocio:
                                <button class="btn bg-success" @click="ordenar('nroSocio')"></button>
                            </th>
                            <th>Nombre:</th>
                            <th>Apellido:</th>
                            <th class="d-none d-sm-table-cell">Dni:
                                <button class="btn bg-success" @click="ordenar('dni')"></button>
                            </th>
                            <th class="d-none d-lg-table-cell">Email:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="socio in socios" :key="socio.idSocio" @click="irA(socio.idSocio)">
                            <td class="d-none d-sm-table-cell">{{ socio.nroSocio }}</td>
                            <td>{{ socio.nombre }}</td>
                            <td>{{ socio.apellido }}</td>
                            <td class="d-none d-sm-table-cell">{{ socio.dni }}</td>
                            <td class="d-none d-lg-table-cell">{{ socio.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h5 v-else class="alert alert-warning alert-sm mb-0 text-center m-2 mb-3">
            <strong>No hay Socios cargados :c</strong>
        </h5>
        <br>
        <div class="d-flex justify-content-center align-items-center">
            <div class="btn-group">
                <button class="btn btn-macabi1">
                    <router-link to="/registrarSocio" class="nav-item nav-link" href="#">Crear Socio</router-link>
                </button>
                <button class="btn btn-dark">
                    <router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
                </button>
            </div>
        </div>
    </div>
    <br>
</template>
<style>
@import '../../../assets/btn.css';
</style>
<script>
import { useElementStore } from '../../../utils/Store';
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import apiUrl from '../../../../config/config.js'

export default {
    setup() {
        const sociosStore = useElementStore("socio")()
        const size = ref(0)
        const socios = ref(null)
        const errorFiltro = ref(false)
        let filtro = ""
        let busqueda = ""
        const orden = ref(true)
        const router = useRouter();

        onBeforeMount(async () => { fetchs() })

        async function fetchs() {
            await sociosStore.fetchElements(`${apiUrl}/socio/getSocios`)
        }

        function buscar() {
            reiniciar();
            busqueda = this.busqueda;

            if (busqueda !== "") {
                filtro = document.getElementById("filtro").value;
                socios.value = sociosStore.getElements.result.filter(item => {
                    const propiedad = item[filtro];
                    const propiedadLowerCase = String(propiedad).toLowerCase();
                    const busquedaLowerCase = String(busqueda).toLowerCase();
                    return propiedadLowerCase.includes(busquedaLowerCase);
                });

                size.value = socios.value.length || 0;
            } else {
                size.value = 0;
            }
        }


        function reiniciar() {
            socios.value = null
            size.value = 0
        }

        function ordenar(columna) {
            orden.value = !orden.value

            socios.value.sort((a, b) => {
                const factorOrden = orden.value ? -1 : 1;
                if (a[columna] < b[columna]) return -1 * factorOrden;
                if (a[columna] > b[columna]) return 1 * factorOrden;
                return 0;
            });
        }

        function irA(id) {
            if (id != 0) {
                router.push(`/socios/${id}`);
            }
        }

        return {
            sociosStore,
            size,
            socios,
            reiniciar,
            busqueda,
            errorFiltro,
            ordenar,
            buscar,
            irA
        }
    }

}
</script>