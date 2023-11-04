<template>
	<Navbar />
	<div class="contenedor">
		<div class="componentes">
			<RouterView></RouterView>
		</div>
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


	/* para eliminar parcialmente el fondo comentar las 3 lineas de abajo q dicen background */
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='1440' preserveAspectRatio='none' viewBox='0 0 1440 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1121%26quot%3b)' fill='none'%3e%3cpath d='M242.24 1000L286.37 1000L286.37 1079.96L242.24 1079.96z' fill='rgba(53%2c 104%2c 231%2c 0.3)'%3e%3c/path%3e%3cpath d='M1416.08 268.5L1469.68 268.5L1469.68 387.63L1416.08 387.63z' fill='rgba(178%2c 116%2c 167%2c 0.31)'%3e%3c/path%3e%3cpath d='M374.28 800.31a95.26 95.26 0 1 0-63.45 179.64z' fill='rgba(143%2c 23%2c 156%2c 0.2)'%3e%3c/path%3e%3cpath d='M275.06 916.17L376.37 916.17L376.37 1017.48L275.06 1017.48z' fill='rgba(118%2c 206%2c 207%2c 0.31)'%3e%3c/path%3e%3cpath d='M855.62 972.45L941.23 972.45L941.23 982.88L855.62 982.88z' fill='rgba(116%2c 153%2c 178%2c 0.31)'%3e%3c/path%3e%3cpath d='M973.81 781.45L1092.39 781.45L1092.39 809.47L973.81 809.47z' stroke='rgba(118%2c 206%2c 207%2c 0.31)'%3e%3c/path%3e%3cpath d='M1007 1298.76 a54.54 54.54 0 1 0 109.08 0 a54.54 54.54 0 1 0 -109.08 0z' stroke='rgba(53%2c 104%2c 231%2c 0.3)'%3e%3c/path%3e%3cpath d='M1204.75 472.41L1293.2 472.41L1293.2 560.86L1204.75 560.86z' fill='rgba(53%2c 104%2c 231%2c 0.3)'%3e%3c/path%3e%3cpath d='M-45.5 73.43 a97.18 97.18 0 1 0 194.36 0 a97.18 97.18 0 1 0 -194.36 0z' fill='rgba(152%2c 219%2c 98%2c 0.31)'%3e%3c/path%3e%3cpath d='M752.49 473.43a69.89 69.89 0 1 0-131.02 48.68z' fill='rgba(178%2c 116%2c 167%2c 0.31)'%3e%3c/path%3e%3cpath d='M387.94 468.33 a38.12 38.12 0 1 0 76.24 0 a38.12 38.12 0 1 0 -76.24 0z' fill='rgba(143%2c 23%2c 156%2c 0.2)'%3e%3c/path%3e%3cpath d='M155.16 290.74a82.12 82.12 0 1 0-160.65 34.2z' stroke='rgba(118%2c 206%2c 207%2c 0.31)'%3e%3c/path%3e%3cpath d='M1326.03 144a123.95 123.95 0 1 0 196.71-150.87z' stroke='rgba(121%2c 95%2c 211%2c 0.3)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1121'%3e%3crect width='1440' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
	background-repeat: repeat;
	background-size: cover;

	overflow-x: hidden;
	height: auto;
	padding-top: 50px;
	padding-bottom: 100px;
	flex: 0;
}

.contenedor {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>

