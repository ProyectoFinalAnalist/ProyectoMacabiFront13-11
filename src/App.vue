<template>
	<Navbar />

	<div class="componentes">
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

	overflow-x: hidden;
	height: auto;
	padding-top: 50px;
	margin-bottom: 130px;
}
</style>

