<template>
	<div class="container_grid tamaño_xl">

		<div class="sub_container_title">
			{{ titulo }}
		</div>

		<div class="container_basic">

			<div>
				<table class="tabla_macabi1">
					<tr>
						<th class="big">Nombre</th>
						<th class="big" style="width: 20%;">dni</th>
						<th class="big" style="width: 40%;">Email</th>
						<th class="big" style="width: 15%;">Estado</th>

						<th class="small">Coordinadores</th>
					</tr>

					<tr v-for="coordinador in coordinadores" @click="$router.push(`/usuarios/${coordinador.idUsuario}`);"
						class="resaltable">
						<td data-cell="Nombre">{{ coordinador.nombre }} {{ coordinador.apellido }}</td>
						<td data-cell="dni">{{ coordinador.dni }}</td>
						<td data-cell="Email">{{ coordinador.email }}</td>
						<td data-cell="Estado">
							<span class="text-success" v-if="coordinador.activo"> Activo </span>
							<span class="text-danger" v-else> Inactivo </span>
						</td>
					</tr>

				</table>
			</div>

			<div style="margin-top: 20px;">
				<table class="tabla_macabi1">
					<tr>
						<th>Categorias</th>
					</tr>

					<tr v-for="categoria in categorias" class="resaltable"
						@click="$router.push(`/detalleCategoria/${categoria.idCategoria}`);">
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

<style scoped></style>
