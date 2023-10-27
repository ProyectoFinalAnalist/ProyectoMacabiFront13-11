<template>
    <div class="container mt-3">
        <div v-if="sociosStore.getElements != null">
            <div style="width: 100%;" class="text text-center pb-3 pt-5 h1">LISTA DE SOCIOS</div>
            <br>
            <form @submit.prevent="buscar()">
                <div class="row d-flex justify-content-start">
                    <div class="col col-sm">
                        <select id="filtro" class="form-select">
                            <option disabled>Filtrar por:</option>
                            <option value="nombre">Nombre</option>
                            <option value="apellido">Apellido</option>
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
                        <div class="d-flex justify-content-end">
                            <p>Socios en total: <strong>{{ size }}</strong></p>
                        </div>
                    </div>
                </div>
            </form>
            <br>
            <div v-if="sociosStore.getElements != null || size > 0">
                <table class="table table-striped table-bordered">
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
                            <th class="d-none d-sm-table-cell">Email:</th>
                            <th>Detalles:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="socio in socios" :key="socio.idSocio">
                            <td class="d-none d-sm-table-cell">{{ socio.nroSocio }}</td>
                            <td>{{ socio.nombre }}</td>
                            <td>{{ socio.apellido }}</td>
                            <td class="d-none d-sm-table-cell">{{ socio.dni }}</td>
                            <td class="d-none d-sm-table-cell">{{ socio.email }}</td>
                            <td><router-link :to="`/socios/${socio.idSocio}`"><strong>Ver
                                        detalles</strong></router-link></td>
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
            <button class="btn btn-danger">
                <router-link to="/registrarSocio" class="nav-item nav-link" href="#">Crear Socio</router-link>
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
        const sociosStore = useElementStore("socio")()
        const size = ref(0)
        const socios = ref(null)
        const errorFiltro = ref(false)
        let filtro = ""
        let busqueda = ""
        const orden = ref(true)

        onBeforeMount(async () => { fetchs() })

        async function fetchs() {
            await sociosStore.fetchElements(`${apiUrl}/socio/getSocios`)
                .then(() => {
                    if (sociosStore.getElements != null) {
                        socios.value = sociosStore.getElements.result
                        size.value = socios.value.length
                    }
                })
        }

        function buscar() {
            reiniciar()
            busqueda = this.busqueda

            if (busqueda !== "" && size.value != 0) {

                filtro = document.getElementById("filtro").value

                socios.value = socios.value.filter(item => {
                    const propiedad = item[filtro]
                    const propiedadLowerCase = String(propiedad).toLowerCase();
                    const busquedaLowerCase = String(busqueda).toLowerCase();
                    return propiedadLowerCase.includes(busquedaLowerCase);
                })
            }
        }


        function reiniciar() {
            socios.value = sociosStore.getElements.result
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

        return {
            sociosStore,
            size,
            socios,
            reiniciar,
            busqueda,
            errorFiltro,
            ordenar,
            buscar
        }
    }
    
}
</script>