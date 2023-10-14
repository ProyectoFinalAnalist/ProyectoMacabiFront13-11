    <template>
    <div class="container mt-4 ">
        <div class="text-center">
        <h4>Registrar Usuario</h4>
        </div>
        <div class="row">
        <div class="col-md-6 offset-md-3" v-if="usuario">
            <div class="card bg-light text-dark mb-5">
            <div class="card-body">
                <p>
                <strong>Nombre</strong><input class="form-control" type="text" v-model="usuario.nombre"
                    placeholder="Ingrese el nombre del usuario" />
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorNombre">
                <strong>El nombre no puede contener números o estar vacío</strong>
                </h6>
                <p>
                <strong>Apellido</strong><input class="form-control" type="text" v-model="usuario.apellido"
                    placeholder="Ingrese el apellido del usuario" />
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorApellido">
                <strong>El apellido no puede contener números o estar vacío</strong>
                </h6>
                <p><strong>Mail: </strong><input class="form-control" type="email" v-model="usuario.email"
                    placeholder="correo@ejemplo.com" /></p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorMailYaRegistrado">
                <strong>Error, este MAIL ya se encuentra registrado</strong>
                </h6>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-else-if="errorMail">
                <strong>Formato de mail inválido</strong>
                </h6>
                <p><strong>Dni</strong><input class="form-control" type="number" v-model="usuario.dni"
                    placeholder="12345678" /></p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorDNIYaRegistrado">
                <strong>Error, este DNI ya se encuentra registrado</strong>
                </h6>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-else-if="errorDNI">
                <strong>Formato del dni inválido</strong>
                </h6>
                <div class="form-group row mb-3">
                <p>
                    <strong>Contraseña: </strong>
                </p>
                <div class="col">
                    <input :type="mostrar" class="form-control" v-model="usuario.clave" placeholder="Ingrese contraseña del usuario" required />
                </div>
                <div class="col-auto">
                    <button class="btn btn-outline-dark" type="button" id="togglePassword" @mousedown="mostrarContraseña"
                    @mouseup="mostrarContraseña">Ver contraseña</button>
                </div>
                </div>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorContrasena">
                <strong>Error, la contraseña debe contener al menos 8 caracteres, un número y una
                    mayúscula</strong>
                </h6>
                <h6 class="alert alert-success alert-sm mb-0 text-center m-2 mb-3" v-else>
                <strong>La contraseña debe contener al menos 8 caracteres, un número y una
                    mayúscula</strong>
                </h6>
                <p><strong>Fecha de nacimiento </strong> <input class="form-control" type="date" required v-model="usuario.fechaNacimiento"></p>
                <p>
                
                <strong>Telefono</strong><input class="form-control" type="tel" v-model="usuario.telefono"
                placeholder="11 12345678" />
                </p>
                <h6 class="alert alert-danger alert-sm mb-0 text-center m-2 mb-3" v-if="errorTelefono">
                <strong>Formato del telefono inválido</strong>
                </h6>
                <p>
                <strong>Seleccione el Rol</strong>
                    <select id="filtro" class="form-select" v-model="usuario.idRol">
                        <option value="1">Coordinador General</option>
                        <option value="2">Coordinador</option>
                        <option value="3">Profesor</option>
                        </select>
                </p>
                <p>
                <strong>Domicilio</strong><input class="form-control" type="text" v-model="usuario.domicilio"
                    placeholder="Ingrese el domicilio" />
                </p>

                <button class="btn btn-primary mx-auto d-block" @click="crearUsuario">Crear Usuario</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    <br>
    </template>

    <script>
    import { useElementStore } from "../../../stores/Store";
    import { useRouter } from "vue-router";
    import { computed, ref, onMounted } from "vue";

    export default {
    setup() {
        const elementStore = useElementStore("usuarios")();
        elementStore.setCurrentElement({
        nombre: "",
        apellido: "",
        email: "",
        clave: "",
        fechaNacimiento: "",
        telefono: "",
        idRol: "",
        dni: "",
        domicilio: "",
        });

        const usuario = computed(() => elementStore.currentElement);
        const router = useRouter();

        onMounted(() => {
        elementStore.fetchElements()
        })

        const crearUsuario = async () => {
        const { dniRepetido, emailRepetido } = elementStore.verificarExistencia(elementStore.currentElement);
        setearEnFalse();

        if (dniRepetido) { errorDNIYaRegistrado.value = true }
        if (emailRepetido) { errorMailYaRegistrado.value = true }

        if (validar() && !emailRepetido && !dniRepetido && elementStore.confirm("crear", "registrado", "Usuario")) {
            await elementStore.createElement(usuario.value);
            router.push("/login");
        }
        };

        const errorNombre = ref(false);
        const errorApellido = ref(false);
        const errorMail = ref(false);
        const errorContrasena = ref(false);

        const errorTelefono = ref(false);
        const errorDNI = ref(false);
        const errorDNIYaRegistrado = ref(false);
        const errorMailYaRegistrado = ref(false);

        function validar() {
        let resultado = true;

        const persona = elementStore.currentElement;
        if (/\d/.test(persona.nombre) || persona.nombre.trim() === '') { errorNombre.value = true; resultado = false; }
        if (/\d/.test(persona.apellido) || persona.apellido.trim() === '') { errorApellido.value = true; resultado = false; }
        if (!/@/.test(persona.email)) { errorMail.value = true; resultado = false; }
        if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(persona.clave)) { errorContrasena.value = true; resultado = false; }
        if (!/^\d{10}$/.test(Number(persona.telefono))) { errorTelefono.value = true; resultado = false; }
        if (!/^\d{7,8}$/.test(Number(persona.dni))) { errorDNI.value = true; resultado = false; }

        if (!resultado || errorDNIYaRegistrado.value || errorMailYaRegistrado.value) { alert("Error detectado en el ingreso de campos") }
        return resultado;
        };

        function setearEnFalse() {
        errorNombre.value = false;
        errorApellido.value = false;
        errorMail.value = false;
        errorContrasena.value = false;
        errorTelefono.value = false;
        errorDNI.value = false;
        errorDNIYaRegistrado.value = false;
        errorMailYaRegistrado.value = false;
        }

        return {
        crearUsuario,
        usuario,
        errorNombre,
        errorApellido,
        errorMail,
        errorContrasena,
        errorTelefono,
        errorDNI,
        errorDNIYaRegistrado,
        errorMailYaRegistrado
        };
    },
    data() {
        return {
        mostrar: "clave",
        mostrarBool: true,
        };
    },
    methods: {
        mostrarContraseña() {
        if (this.mostrarBool) {
            this.mostrar = "text"
        } else this.mostrar = "clave"
        this.mostrarBool = !this.mostrarBool
        }
    }
    };
    </script>