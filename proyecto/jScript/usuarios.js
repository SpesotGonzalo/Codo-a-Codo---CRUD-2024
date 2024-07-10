const { createApp } = Vue
createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://gonzalospesotcc2.pythonanywhere.com/usuarios' ,
            error: false,
            cargando: true,
            id: 0,
            usuario: "",
            clave: "",
            rol: 0
        }
    },
    methods: {
        fetchData(url) {
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false                  
                    console.log(this.usuarios)
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },

        grabar() {
            let url ="https://gonzalospesotcc2.pythonanywhere.com/usuarios"
            let usuario = {
                usuario: this.usuario,
                clave: this.clave,
                rol: this.rol,
            }
            console.log(usuario)
            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            console.log(options, url)
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al grabar');
                    }
                    alert("Usuario creado");
                        window.location.href = "../front/inicio.html";
                })
                .catch(err => {
                    console.error('Error al crear usuario:', err);
                    alert("Error al crear");
                })
        },
        
        login() {
            usuario=this.usuario
            sessionStorage.setItem("adm",0)
            var i=0
            while ( i < this.usuarios.length && this.usuarios[i].usuario != this.usuario  ){
                i++
            }
            if (i<(this.usuarios.length)){
                if (this.usuarios[i].clave==this.clave ){
                    if (this.usuarios[i].rol==1){
                        sessionStorage.setItem("adm",1)  
                        window.location.href = "../front/crud.html";
                }
                }
                    if(this.usuarios[i].rol != 1){
                        window.location.href = "../front/inicio.html"
                }
            }else{
                alert('Usuario erroneo , debe crear un usuario para continuar')
            }
            /*for (elemento of this.usuarios){
                if (elemento.usuario == this.usuario && elemento.clave==this.clave ){
                    if (elemento.rol=1){
                        sessionStorage.setItem("adm",1)
                    }
                }   

            }*/


        }
    },
    created() {
        
        this.fetchData(this.url)




    },
}).mount('#app')



function irAregistro() {
    // Redirige a otro HTML
    window.location.href = "../front/registro.html";
}