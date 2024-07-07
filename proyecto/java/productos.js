const app = Vue.createApp({
    data() {
        return {
            productos: [],
            url: 'http://localhost:5000/productos',
            error: false,
            cargando: true,
         
            id: 0,
            nombre: "",
            precio: 0,
            stock: 0,
            imagen: "",
            cantidad: 0,

           
           
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
                    console.error(err);
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
                .then(function () {
                    alert("Registro grabado");
                    window.location.href = "./crud.html"; 
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");  
                })
        }
    },
    created() {
        this.fetchData(this.url);
    },
});

app.component('header-component', {
    template: `
        <header class="bg-success text-white py-3">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h1 class="display-5">Verdulería El Huerto</h1>
                    </div>
                    <div class="col-md-6 text-end">
                        <nav>
                            <a href="index.html" class="text-white mx-3">Inicio</a>
                            <a href="#" class="text-white mx-3">Productos</a>
                            <a href="#" class="text-white mx-3">Nosotros</a>
                            <a href="#" class="text-white mx-3">Iniciar Sesion</a>
                        </nav>
                    </div>
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
