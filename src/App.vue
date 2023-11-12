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

	/* opcion fondo animado 
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='1440' preserveAspectRatio='none' viewBox='0 0 1440 1440'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1153%26quot%3b)' fill='none'%3e%3cpath d='M1221.1690658220136 601.4224336556392L958.1306954191214 753.2877076149496 1109.9959693784317 1016.3260780178418 1373.034339781324 864.4608040585315z' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M166.21117614569727 1066.2094083483753L450.29306955015153 1280.2804696841717 664.364130885948 996.1985762797176 380.28223748149384 782.127514943921z' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M-42.27111992821716 577.2570661706461L6.91971863309665 738.1530492843502 223.66827402299603 583.9187998855275z' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1017.97%2c660.413C1140.203%2c667.887%2c1282.303%2c668.11%2c1346.932%2c564.092C1413.647%2c456.717%2c1361.683%2c321.63%2c1295.311%2c214.043C1232.964%2c112.98%2c1136.679%2c33.878%2c1017.97%2c30.857C894.186%2c27.707%2c773.491%2c90.111%2c715.056%2c199.279C659.331%2c303.383%2c687.183%2c429.025%2c752.012%2c527.717C810.312%2c616.469%2c911.98%2c653.932%2c1017.97%2c660.413' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1346.3277933155769 1162.8450124201236L1587.628698679272 921.5441070564283 1346.3277933155769 680.243201692733 1105.0268879518815 921.5441070564283z' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1157.3195673228934-111.56649670751526L1258.5212458255003 266.12330927546486 1535.0093733058734-212.7681752101222z' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M379.464%2c384.625C424.878%2c386.363%2c472.424%2c371.623%2c495.484%2c332.461C518.818%2c292.833%2c510.97%2c242.569%2c485.758%2c204.108C462.863%2c169.182%2c421.178%2c153.499%2c379.464%2c155.474C341.213%2c157.285%2c309.043%2c180.608%2c289.284%2c213.411C268.765%2c247.475%2c259.34%2c288.947%2c277.872%2c324.131C297.558%2c361.507%2c337.252%2c383.009%2c379.464%2c384.625' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M359.2543851737939 723.304495977809L640.8495454806848 688.7289578671445 606.2740073700202 407.1337975602536 324.67884706312935 441.7093356709181z' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1043.456%2c1438.662C1150.465%2c1434.493%2c1224.615%2c1345.083%2c1278.348%2c1252.449C1332.334%2c1159.378%2c1371.826%2c1051.233%2c1324.129%2c954.788C1271.551%2c848.473%2c1162.042%2c779.661%2c1043.456%2c777.491C921.161%2c775.254%2c802.834%2c836.72%2c744.412%2c944.181C688.223%2c1047.534%2c713.69%2c1171.414%2c774.567%2c1272.077C833.046%2c1368.775%2c930.536%2c1443.061%2c1043.456%2c1438.662' fill='rgba(48%2c 114%2c 185%2c 0.29)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1153'%3e%3crect width='1440' height='1440' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
*/

	overflow-x: hidden;
	height: auto;
	padding-top: 20px;
	padding-bottom: 100px;
	flex: 0;
}

.contenedor {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>

