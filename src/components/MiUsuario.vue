<template>
	<div v-if="!this.usrStore.isLogged" class="borde_doble">
		<div class="container_basic">
			<h1>no estas logeado</h1>
		</div>
	</div>

	<div class="borde_doble tamaño_s" v-else>

		<div class="container_basic container_flex">
			<h1> <b> Detalles de Usuario </b> </h1>

			<span> <b class="b_tag"> Nombre: </b> {{ this.usrStore.currentUser.nombre }} {{
				this.usrStore.currentUser.apellido }} </span>

			<span> <b b class="b_tag"> Email: </b> {{ this.usrStore.currentUser.email }} </span>

			<button v-if="this.usrStore.isAdmin" type="submit" class="btn_basic btn_administracion"
				@click="navegar('menuAdministracion')">Administrar</button>

			<button type="submit" class="btn_basic btn_salir" @click="salir">Cerrar Sesion</button>
		</div>

	</div>
</template>
  
<script>
import { usrStore } from '../stores/usrStore.ts'

export default {
	data() {
		return {
			usrStore: usrStore()
		}
	},
	mounted() {

		if (!this.usrStore.isLogged) {
			this.$router.push("/login");
		}

		document.title = "Mi Usuario"

	},
	updated() {
		console.log(this.usrStore.isLogged)
		if (!this.usrStore.isLogged) {
			this.$router.push("/login");
		}

	},
	methods: {

		salir() {
			this.usrStore.logOut()
			this.$router.push('/login');
		},

		navegar(ubicacion) {
			this.$router.push(`/${ubicacion}`);
		}
	},
}

</script>
  
<style scoped>
.container_flex {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}

.container_basic h1 {
	font-size: 40px;
	margin: 20px;
	text-align: center;
}

@media screen and (max-width:620px) {
	.b_tag {
		display: block;
	}

}

.btn_salir {
	width: 95%;
	max-width: 300px;
	border: 2px solid red;
	margin-bottom: 20px;
}

.btn_salir:before {
	width: 50%;
}

.btn_administracion {
	width: 95%;
	max-width: 300px;
	border: 2px solid rgb(65, 65, 255);
}

.btn_administracion:before {
	width: 50%;
}
</style>