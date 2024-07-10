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
                    window.location.href = "../front/crud.html";
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
                    window.location.href = "../front/crud.html";
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


// Montar la aplicación en el elemento #app
app.mount('#app');

