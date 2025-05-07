document.addEventListener("DOMContentLoaded", function(){
    
    /* script para abrir y cerrar el menu */
    document.getElementById("menu-icon").addEventListener("click", function(){
        document.getElementById("nav-list").classList.toggle("active");
    })

    /* script para el formulario */
    const forma = document.getElementById("forma-contacto");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const seleccion = document.getElementById("paises");
    const comentario = document.getElementById("comentario");
    const msjexito = document.getElementById("msjexito");

    forma.addEventListener("submit", function(event){
        event.preventDefault(); // Evita el envio real del formulario
        /*alert("Formulario en acción");*/
        let esValido = true;

        // Limpiar mensajes de error previo
        /*document.querySelectorAll(".error").forEach(function(error){
            error.textContent = "";
        })*/

        // Limpiar mensajes de error después de 5 segundos
        document.querySelectorAll(".error").forEach(function(error) {
            setTimeout(function() {
                error.textContent = ""; // Borra el mensaje
            }, 5000); // 5000 milisegundos = 5 segundos
        });    

        // Validar nombre
        if(nombre.value.trim() === ""){
            document.getElementById("errorNombre").textContent = "El nombre es obligatorio";
            esValido = false;
        }

        // Validar correo
        let expReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(correo.value.trim() === ""){
            document.getElementById("errorCorreo").textContent = "El correo es obligatorio";
            esValido = false;
        } else if(!expReg.test(correo.value)){
            document.getElementById("errorCorreo").textContent = "Ingrese un correo válido";
            esValido = false;
        }

        // Validar selección
        if(seleccion.value === ""){
            document.getElementById("errorPaises").textContent = "Debe seleccionar una opción";
            esValido = false;
        }

        // Validar selección
        if(comentario.value.trim() === ""){
            document.getElementById("errorComentario").textContent = "El comentario es obligatorio";
            esValido = false;
        }

        // Si todo está correcto, mostrar mensaje de éxito
        if(esValido){
            console.log("Enviando datos ...");
            console.log({
                nombre: nombre.value,
                correo: correo.value,
                seleccion: seleccion.value,
                comentario: comentario.value
            });

            msjexito.classList.add("mostrar");
            // Ocultar después de 5 segundos (con fade out)
            setTimeout(() => {
                msjexito.classList.remove("mostrar");
                // Resetear formulario (opcional)
                setTimeout(() => forma.reset(), 100); // Espera a que termine el fade
            }, 5000);
            //forma.reset(); // Limpiar el formulario
        }
    })
})