const { createApp } = Vue;

createApp({
    data() {
        return {
            usuarios: [],
            urlUsuarios: 'http://127.0.0.1:5000/usuarios', // URL para obtener todos los usuarios
            urlCrearAdmin: 'http://127.0.0.1:5000/crear_admin', // Nueva URL para crear un administrador
            error: false,
            cargando: true,
            id: 0,
            usuario: "",
            clave: "",
            rol: "user", // Por defecto, se creará un usuario normal (no administrador)
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        grabar() {
            let usuario = {
                usuario: this.usuario,
                clave: this.clave,
                rol: this.rol,
            };

            let url = this.rol === "admin" ? this.urlCrearAdmin : this.urlUsuarios;

            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };

            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    alert("Registro grabado");
                    if (this.rol === "admin") {
                        window.location.href = "./index.html"; // Redirige a la página de administrador si se creó un admin
                    } else {
                        window.location.href = "./login.html"; // Redirige a la página de login si se creó un usuario normal
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
                });
        },
        login() {
            var usuario = this.usuario;
            var clave = this.clave;

            fetch(this.urlUsuarios)
                .then(response => response.json())
                .then(data => {
                    var foundUser = data.find(u => u.usuario === usuario && u.clave === clave);
                    if (foundUser) {
                        if (foundUser.rol === 'admin') {
                            sessionStorage.setItem("adm", 1);
                            window.location.href = "./index.html";
                        } else {
                            window.location.href = "./index.html";
                        }
                    } else {
                        alert('Usuario o contraseña incorrectos');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al iniciar sesión");
                });
        }
    },
    created() {
        this.fetchData(this.urlUsuarios);
    },
}).mount('#app');
