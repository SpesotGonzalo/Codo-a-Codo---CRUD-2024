const app = Vue.createApp({
    data() {
        return {
            productos: [],
            url: 'https://gonzalospesotcc2.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            precio: 0,
            stock: 0,
            imagen: "",
            cantidad: 0
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error('Error al obtener los datos:', err);
                    this.error = true;
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert('Registro Eliminado');
                    location.reload();
                })
                .catch(err => {
                    console.error('Error al eliminar el registro:', err);
                })
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                cantidad: this.cantidad,
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al grabar');
                    }
                    alert("Registro grabado");
                    window.location.href = "./crud.html";
                })
                .catch(err => {
                    console.error('Error al grabar:', err);
                    alert("Error al Grabar");
                })
        },
        modificar() {
            const url = this.url + '/' + this.id;  // Asegurarse de que la URL incluya el ID
            console.log("URL de modificación:", url);  // Debugging: imprimir la URL
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                cantidad: this.cantidad,
            }
            console.log("Datos del producto a modificar:", producto);  // Debugging: imprimir los datos del producto
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(url, options)
                .then(response => {
                    console.log("Respuesta del servidor:", response);  // Debugging: imprimir la respuesta del servidor
                    if (!response.ok) {
                        throw new Error('Error en la modificación');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Datos modificados:", data);  // Debugging: imprimir los datos modificados
                    alert("Registro modificado");
                    window.location.href = "./crud.html";
                })
                .catch(err => {
                    console.error("Error en la modificación:", err);  // Debugging: imprimir el error
                    alert("Error al Modificar");
                })
        },
        fetchProducto(id) {
            const url = this.url + '/' + id;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.stock = data.stock;
                    this.precio = data.precio;
                })
                .catch(err => {
                    console.error('Error al obtener el producto:', err);
                    this.error = true;
                })
        }
    },
    created() {
        this.fetchData(this.url);
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            this.fetchProducto(id);
        }
    },
});

app.component('header-component', {
    template: `
        <header class="bg-success text-white py-3">
        <div class="container">
            <div class="header-content d-flex justify-content-between align-items-center">
                <h1 class="display-5">Verdulería El Huerto</h1>
                <nav>
                    <a href="index.html" class="text-white"> Inicio </a>
                    <a href="productos.html" class="text-white">Productos</a>
                    <a href="login.html" class="text-white">Cerrar Sesion</a>
                </nav>
            </div>
        </div>
</header>
    `
});

app.component('tarjeta-component', {
    template: `
        <section class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Productos Frescos</h5>
                                <p class="card-text">Descubre nuestra selección de productos frescos y de calidad.</p>
                                <a href="#" class="btn btn-primary">Ver más</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Ofertas Especiales</h5>
                                <p class="card-text">Aprovecha nuestras promociones en frutas y verduras seleccionadas.</p>
                                <a href="#" class="btn btn-primary">Ver más</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Contáctanos</h5>
                                <p class="card-text">¿Tienes alguna pregunta? ¡Contáctanos ahora mismo!</p>
                                <a href="#" class="btn btn-primary">Contactar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
});

app.component('footer-component', {
    template: `
        <footer class="bg-dark text-white text-center py-3">
            <div class="container">
                <span>© 2024 Verdulería Verde Fresco. Todos los derechos reservados.</span>
            </div>
        </footer>
    `
});

// Montar la aplicación en el elemento #app
app.mount('#app');
