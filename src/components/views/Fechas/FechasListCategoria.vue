<template>
	<div class="container">

		<div class="sub_container_title">{{ titulo }}</div>

		<div v-if="existeCategoria">

			<div class="sub_container_sub_title"> Fechas de la Categoria</div>

			<div class="month-selector">

				<div class="btn_mes" @click="cambiarFecha(-1, 'year')">
					<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 19L12.7071 12.7071C12.3166 12.3166 12.3166 11.6834 12.7071 11.2929L19 5"
							stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M11 19L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L11 5"
							stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>

				<div class="btn_mes iz" @click="cambiarFecha(-1, 'month')">
					<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.5 19L9.20711 12.7071C8.81658 12.3166 8.81658 11.6834 9.20711 11.2929L15.5 5"
							stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>

				<div class="sub_container_sub_title mes">{{ mesSelected }}</div>

				<div class="btn_mes dr" @click="cambiarFecha(1, 'month')">
					<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.5 5L15.7929 11.2929C16.1834 11.6834 16.1834 12.3166 15.7929 12.7071L9.5 19"
							stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>

				<div class="btn_mes dr" @click="cambiarFecha(1, 'year')">
					<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19"
							stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19"
							stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</div>

			<div class="d-flex justify-content-between align-items-center">
				<p class="">Fechas en total: <strong>{{ cantFechasToShow }}</strong></p>
			</div>

			<div v-if="fechasToShow !== null">
				<table class="tabla_macabi1">
					<thead>
						<tr>
							<th class="big">Fecha Calendario:</th>
							<th class="big">Tipo:</th>
							<th class="small">Fechas:</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="fecha in fechasToShow" :key="fecha.idFecha" class="resaltable"
							@click="$router.push(`/fechas/${fecha.idFecha}`);">
							<td data-cell="Fecha Calendario">{{ fecha.fechaCalendario }}</td>
							<td data-cell="Tipo">{{ mapearTipo(fecha.tipo) }}</td>
						</tr>
						<tr v-if="!fechaDeCategoriaStore.getElements">
							<td colspan="3" style="text-align: center;"> No hay Fechas en la Categoria</td>
						</tr>
						<tr v-else-if="fechasToShow.length == 0">
							<td colspan="3" style="text-align: center;"> No hay Fechas para el rango seleccionado en esta
								categoria </td>
						</tr>
					</tbody>

				</table>
			</div>

			<div style="margin-top: 27px;" class="sub_container_sub_title"> Socios de la Categoria</div>

			<div class="d-flex justify-content-between align-items-center">
				<p class="">Socios asignados a categoria: <strong>{{ cantSociosToShow }}</strong></p>
			</div>

			<div v-if="sociosToShow !== null">
				<table class="tabla_macabi1">
					<thead>
						<tr>
							<th class="big">Numero Socio</th>
							<th class="big">Nombre</th>
							<th class="big">DNI</th>
							<th class="big" style="width: 8%;">Total</th>
							<th class="big" style="width: 6%;">P</th>
							<th class="big" style="width: 6%;">A</th>
							<th class="big" style="width: 6%;">J</th>
							<th class="big" style="width: 7%;">N/A</th>
							<th class="small">Socios:</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="socio in sociosToShow" class="resaltable">
							<td data-cell="Id" class="big">{{ socio.nroSocio }}</td>
							<td data-cell="Nombre">{{ socio.nombre }} {{ socio.apellido }}</td>
							<td data-cell="Dni">{{ socio.dni }}</td>
							<td data-cell="Total" style="font-weight: bold;">
								<span>
									{{ socio.Fechas.length }}
								</span>
							</td>
							<td data-cell="P" style="font-weight: bold;">
								<span class="text-success">
									{{ getCountOfDateTipe('P', socio.Fechas) }}
								</span>
							</td>
							<td data-cell="A" style="font-weight: bold;">
								<span class="text-danger">
									{{ getCountOfDateTipe('A', socio.Fechas) }}
								</span>
							</td>
							<td data-cell="J" style="font-weight: bold;">
								<span class="text-warning">
									{{ getCountOfDateTipe('J', socio.Fechas) }}
								</span>
							</td>
							<td data-cell="N/A" style="font-weight: bold;">
								<span class="text-secondary">
									{{ getCountOfDateTipe(null, socio.Fechas) }}
								</span>
							</td>

						</tr>
						<tr v-if="!sociosDeCategoriaStore.getElements">
							<td colspan="8" style="text-align: center;"> No hay Socios en la Categoria</td>
						</tr>
						<tr v-else-if="sociosToShow.length == 0">
							<td colspan="8" style="text-align: center;"> No hay Asistencias de ningun Socio en la fecha
								seleccionada </td>
						</tr>

					</tbody>

				</table>

			</div>

		</div>

		<div class="sub_container_buttons2">
			<button @click="nuevaFecha" class="btn btn-primary primary-macabi">
				Crear fecha
			</button>

			<button class="btn btn-secondary">
				<router-link to="/" class="nav-item nav-link" href="#">Volver a Inicio</router-link>
			</button>
		</div>

	</div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useElementStore } from '../../../utils/Store';
import { useRoute, useRouter } from 'vue-router';
import apiUrl from '../../../../config/config.js'

import moment from "moment";
import 'moment/dist/locale/es'

const titulo = ref("Loading....")

const route = useRoute()
const router = useRouter()
const idCategoria = route.params.id;

let existeCategoria = false

const categoriaStore = useElementStore(`categoria${idCategoria}Store`)();
const fechaDeCategoriaStore = useElementStore(`fechasCategoria${idCategoria}Store`)();
const sociosDeCategoriaStore = useElementStore(`sociosDeCategoria${idCategoria}Store`)();

const cantFechasToShow = ref(0);
const cantSociosToShow = ref(0);
const fechasToShow = ref([]);
const sociosToShow = ref([]);

let objMoment
let idsFechasSelected = new Set()

const mesSelected = ref('.....')

onBeforeMount(async () => {
	initDate()
	await fetchCategoria()
});

function initDate() {
	if (sessionStorage.getItem(`preSelectedDateFLC${idCategoria}`)) {
		objMoment = moment(sessionStorage.getItem(`preSelectedDateFLC${idCategoria}`), 'MMMM YYYY');
	} else {
		objMoment = moment()
	}
	mesSelected.value = objMoment.format('MMMM YYYY')
}

async function fetchCategoria() {
	//carga la categoria, si no hay categoria es que el id esta mal, por lo que todo esta mal
	await categoriaStore.fetchElements(`${apiUrl}/categoria/${idCategoria}`)

	if (categoriaStore.getElements && categoriaStore.getElements.result && categoriaStore.getElements.result.Deporte) {
		titulo.value = `${categoriaStore.getElements.result.Deporte.nombre} "${categoriaStore.getElements.result.nombreCategoria}"`
		fetchFechas()
		fetchSocios()
		existeCategoria = true
	} else {
		titulo.value = `La categoria no existe`
	}
}

async function fetchSocios() {
	await sociosDeCategoriaStore.fetchElements(`${apiUrl}/categoria/${idCategoria}/getSociosWithAsistencia`)
	if (sociosDeCategoriaStore.getElements && sociosDeCategoriaStore.getElements.result) {
		showSocios()
	} else {
		//manejar Error no hay socios
	}
}

async function fetchFechas() {
	await fechaDeCategoriaStore.fetchElements(`${apiUrl}/categoria/${idCategoria}/getFechas`)

	if (fechaDeCategoriaStore.getElements && fechaDeCategoriaStore.getElements.result) {
		showFechas()
	} else {
		//manejar Error no hay fechas
	}
}

function showFechas() {

	const minDate = objMoment.clone().startOf('month')
	const maxDate = objMoment.clone().endOf('month')

	let fechasFiltered = fechaDeCategoriaStore.getElements.result.Fechas.filter(fechaCat => {
		let fechaCatMoment = moment(fechaCat.fechaCalendario)
		return fechaCatMoment >= minDate && fechaCatMoment <= maxDate
	})

	fechasToShow.value = fechasFiltered
	cantFechasToShow.value = fechasFiltered.length

	idsFechasSelected = new Set(fechasFiltered.map(x => x.idFecha))
}

function showSocios() {

	let sociosProcesados = sociosDeCategoriaStore.getElements.result
		.filter(socio => {
			return socio.Fechas.some(fecha => {
				return idsFechasSelected.has(fecha.idFecha)
			});
		})
		.map((socio) => {
			const fechasFiltradas = socio.Fechas.filter(fecha => {
				return idsFechasSelected.has(fecha.idFecha)
			});
			return { ...socio, Fechas: fechasFiltradas };
		});

	sociosToShow.value = sociosProcesados
	cantSociosToShow.value = sociosProcesados.length
}

function cambiarFecha(cant, tipe) {
	objMoment.add(cant, tipe)
	mesSelected.value = objMoment.format('MMMM YYYY')

	sessionStorage.setItem(`preSelectedDateFLC${idCategoria}`, mesSelected.value)

	showFechas();
	showSocios()
}

function mapearTipo(tipo) {
	if (tipo === 'C') {
		return 'Citación';
	} else if (tipo === 'E') {
		return 'Entrenamiento';
	} else {
		return 'Tipo Desconocido';
	}
}

function nuevaFecha() {
	router.push({ path: "/crearfecha/" + idCategoria });
}

function getCountOfDateTipe(character, dateArray) {

	let count = 0


	dateArray.forEach(fecha => {
		if (fecha.Asistencia.estado == character) {
			count++
		}
	});


	return count

}


</script>

<style scoped>
.mes {
	display: flex;
}

.month-selector {
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
	cursor: context-menu;
}

.month-selector svg {
	height: 30px;
	width: 30px;
}

.btn_mes {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	padding: 15px;
	border-radius: 25px;
}

.btn_mes:hover {
	background-color: rgba(82, 82, 82, 0.1);

}

.iz {
	margin-right: 20px;
}

.dr {
	margin-left: 20px;
}

@media (max-width: 410px) {
	.iz {
		margin-right: 0px;
	}

	.dr {
		margin-left: 0px;
	}
}
</style>