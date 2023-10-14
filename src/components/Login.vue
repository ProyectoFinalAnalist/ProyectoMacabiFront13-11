<template>
    <div class="container mt-5" style="margin-bottom: 100px;">
      <div class="text-center">
        <h4>Iniciar sesión</h4>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card bg-light text-dark">
            <div class="card-body">
              <form>
                <label class="form group" for="inputMail"><strong>Ingresa tu mail:</strong></label>
                <input type="email" id="inputMail" class="form-control" v-model="usuario" placeholder="mail@ejemplo.com"
                  required />
                <label class="form group mt-2" for="inputPassword"><strong>Ingresa tu contraseña:</strong></label>
                <div class="form-group row">
                  <div class="col">
                    <input :type="mostrar" id="inputPassword" class="form-control" v-model="password"
                      placeholder="contraseña" required />
                  </div>
                  <div class="col col-auto">
                    <button class="btn btn-outline-dark" type="button" id="togglePassword" @mousedown="mostrarContraseña"
                      @mouseup="mostrarContraseña">Ver contraseña</button>
                  </div>
                </div>
                <h6 class="alert alert-danger alert-sm mb-0 text-center mt-2" v-if="mensaje != ''">
                  <strong>{{ mensaje }}</strong>
                </h6>
                <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mt-4 mx-auto d-block" type="button"
                  v-on:click="iniciarSession()">Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
  </template>
  <script>
  import { useRouter } from "vue-router";
  import { login } from "../utils/Auth"
  
  export default {
    data() {
      return {
        usuario: "",
        password: "",
        mensaje: "",
        router: useRouter(),
        mostrar: "password",
        mostrarBool: true,
      };
    },
    methods: {
      async iniciarSession() {
        login()
        this.router.push("/")
      },
      mostrarContraseña() {
        if (this.mostrarBool) {
          this.mostrar = "text"
        } else this.mostrar = "password"
        this.mostrarBool = !this.mostrarBool
      }
    },
  
  };
  </script>