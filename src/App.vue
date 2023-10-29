<template>
	<Navbar />

	<div class="componentes">
		<h1>hol  a</h1>
		<RouterView></RouterView>
	</div>

	<Footer />
</template>

<script setup>
import { usrStore } from './stores/usrStore.ts'
import { onMounted } from "vue";
import Footer from "./components/dependentComponents/Footer.vue";
import Navbar from "./components/dependentComponents/Navbar.vue";

const usuarioStore = usrStore()

onMounted(async () => {
	await usuarioStore.reiniciarSesion()
})


</script>

<style scoped>
.componentes {
	display: flex;
	align-content: center;
	justify-content: center;
	flex-direction: column;
	align-items: center;

	margin-top: 50px;
	overflow-x: hidden;
	height: auto;
	padding: 15px;
}

@media screen and (max-width:800px) {
	.componentes {
		margin-top: 20px;
	}
}
</style>

