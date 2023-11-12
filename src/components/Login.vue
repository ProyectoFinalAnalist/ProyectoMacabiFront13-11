<template>
	<div v-if="usrStore.isLogged" class="">
		<h1>you are already logged in</h1>
		<button type="submit" class="" @click="salir">cerrar</button>
	</div>

	<div v-else class="container_grid macabi_color_fondo tamaño_xs">

		<div class="sub_container_title lightgrey_color_fondo">
			Iniciar Sesion
		</div>

		<div class="sub_container_basic lightgrey_color_fondo">

			<div class="form-floating mb-3 mt-3">
				<input type="email" class="form-control" id="emailInput" :class="this.isInvalid"
					placeholder="name@example.com" v-model="this.email">
				<label for="emailInput">Email</label>
			</div>

			<div class="form-floating mb-3">
				<input type="password" class="form-control " id="passwordInput" :class="this.isInvalid"
					placeholder="name@example.com" v-model="this.clave" @keyup="isMayus($event)">

				<label for="passwordInput">Clave</label>

				<svg xmlns="http://www.w3.org/2000/svg" id="mayusAlert" width="16" height="16" fill="currentColor"
					class="bi bi-capslock-fill capslock" viewBox="0 0 16 16">
					<path
						d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1z" />
				</svg>

			</div>

			<div class="sub_container_buttons">
				<button type="" class="btn btn-secondary" @click="">Recuperar Clave</button>
				<button type="" class="btn btn-primary primary-macabi" @click="ingresar">Iniciar Sesión</button>
			</div>

			<div v-if="this.error" class="alert alert-danger" role="alert">
				{{ this.msjError }}
			</div>

		</div>

	</div>
</template>

<script>

import { usrStore } from '../stores/usrStore.ts'

export default {
	data() {
		return {
			usrStore: usrStore(),
			email: "",
			clave: "",
			error: false,
			msjError: "",
			capslock: ""
		};
	},
	async created() {

	},
	mounted() {

		if (this.usrStore.isLogged) {
			this.$router.push("/miUsuario");
		}

		document.title = "Iniciar Sesion"

	},
	updated() {
		if (this.usrStore.isLogged) {
			this.$router.push("/miUsuario");
		}

	},
	computed: {

		isInvalid() {
			let msj
			if (this.error == true) {
				msj = 'is-invalid'
			}
			return msj
		}

	},
	methods: {
		async ingresar() {

			if (this.email == "" || this.clave == "") {

				this.error = true;
				this.msjError = `email o contraseña no ingreados`

			} else {

				let mensajeError = await this.usrStore.logIn(this.email, this.clave);

				if (mensajeError == null) {
					this.error = false;
					this.$router.push("/miUsuario");

				} else {

					this.error = true;
					this.msjError = mensajeError;
				}
			}
		},
		isMayus(event) {
			const capsLockEnabled = event.getModifierState("CapsLock");

			if (capsLockEnabled) {
				document.getElementById('mayusAlert').style.display = 'inherit'

			} else {
				document.getElementById('mayusAlert').style.display = 'none'
			}
		},
		salir() {
			// metodo salir de usuario
			this.usrStore.logOut()
		},



	}
};

</script>

<style scoped>
.capslock {
	display: none;
	position: absolute;
	right: 40px;
	top: 21px
}

.container_grid {
	grid-template-rows: 1fr 3fr;
}

.sub_container_title {
	margin-bottom: 20px;
}

.alert {
	text-align: center;
}

@media screen and (max-width:700px) {
	.sub_container_buttons {
		flex-direction: column;
		align-items: center;
	}

	.btn {
		width: 70%;
		height: 70px;

		margin-bottom: 20px;
	}
}
</style>
