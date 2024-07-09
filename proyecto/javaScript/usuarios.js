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
            let usuario = {
                usuario: this.usuario,
                clave: this.clave,
                rol: 0 // Ajusta el valor del rol según tu lógica
            };
            
            let url = "https://gonzalospesotcc2.pythonanywhere.com/usuarios"
            let options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
            };
        
            console.log("URL de la solicitud:", url); // Verifica la URL antes de la solicitud
        
            fetch(url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "../front/index.html";
            })
            .catch(err => {
                console.error(err);
                alert("Error al Grabarr")
                });
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
                        console.log("puto")
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