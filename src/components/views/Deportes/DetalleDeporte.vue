<template>
	<div class="container-fluid">

		<div class="container_title">
			{{ titulo }}
		</div>

		<div class="container_basic">

			<div>
				<table>
					<tr>
						<th class="big">Nombre</th>
						<th class="big" style="width: 20%;">dni</th>
						<th class="big" style="width: 40%;">Email</th>
						<th class="big" style="width: 15%;">Estado</th>

						<th class="small">Coordinadores</th>
					</tr>

					<tr class="resaltable" v-for="coordinador in coordinadores" @click="$router.push(`/usuarios/${coordinador.idUsuario}`);">
						<td data-cell="Nombre">{{ coordinador.nombre }} {{ coordinador.apellido }}</td>
						<td data-cell="dni">{{ coordinador.dni }}</td>
						<td data-cell="Email">{{ coordinador.email }}</td>
						<td data-cell="Estado">{{ coordinador.activo }}</td>
					</tr>

				</table>
			</div>

			<div style="margin-top: 20px;">
				<table>
					<tr>
						<th class="big">Categorias</th>
					</tr>

					<tr class="resaltable" v-for="categoria in categorias" @click="$router.push(`/detalleCategoria/${categoria.idCategoria}`);">
						<td data-cell="Nombre">{{ categoria.nombreCategoria }}</td>
					</tr>

				</table>
			</div>

		</div>

	</div>

	<button class="btn btn-primary" @click="$router.go(-1)"> Fuck Go Back</button>
</template>

<script setup>

import apiUrl from '../../../../config/config.js';
import { useElementStore } from '../../../utils/Store';
import { useRoute } from 'vue-router';
import { ref, onMounted } from "vue";

const router = useRoute()
const idDeporte = router.params.id

let titulo = ref("Loading...")
let coordinadores = ref([])
let categorias = ref([])

const deporteStore = useElementStore(`deporte${idDeporte}Store`)()
const categoriasDeDeporteStore = useElementStore(`categoriasDeDeporte${idDeporte}Store`)()

onMounted(async () => {

	await deporteStore.fetchElementById(`${apiUrl}/deporte/${idDeporte}/coordinadores`)

	if (deporteStore.currentElement && deporteStore.currentElement.success) {
		titulo.value = deporteStore.currentElement.result.nombre
		coordinadores.value = deporteStore.currentElement.result.CoordinadoresAsignados

		await categoriasDeDeporteStore.fetchElements(`${apiUrl}/categoria/${idDeporte}/deporte`)

		categorias.value = categoriasDeDeporteStore.getElements.result

	} else {
		titulo.value = "Deporte No Encontrado"
	}




})



</script>

<style scoped>

table {
	table-layout: fixed;
	width: 100%;
	background-color: #d2d7db;
	color: rgb(0, 0, 0);
	overflow: hidden;
	border-radius: 18px;
}

td,
th {
	padding: 1rem;
	overflow: auto;
}

th {
	background-color: #014187;
	color: white;
}

tr:nth-of-type(2n) {

	background-color: #c0cad3;
}


.resaltable:hover {
    background-color: rgba(68, 68, 68, 0.4);
    border-radius: 20px;
    cursor: pointer;
}

.small {
	display: none;
}

@media (max-width: 1000px) {
	.small {
		display: block;
	}

	.big {
		display: none;
	}

	td {
		display: block;
	}
	td::before{
		content: attr(data-cell) ": ";
		font-weight: 700;
	}

}
</style>
