import {validaciones, optionTypes} from "./data.js"
import {validar,calcularEdad,verificarFormularioValido} from "./utils.js"
export const handleKeyUp = () => {

    document.addEventListener("keyup", (event) => {

        const idCampoFormulario = event.target.id;
        const valorCampoFormulario = event.target.value;
        const validacion = validaciones.find((validacion) => validacion["nombreCampo"] === idCampoFormulario);
        validar(event,valorCampoFormulario,validacion);
    })

}

/* handle para aplicar validaciones a fecha-carnet y fecha-matriculacion
   al cargar el DOM del formulario
*/
export const handleContentLoad = () => {

    document.addEventListener("DOMContentLoaded", (event) => {

        // Obtener el elemento del campo de fecha
        const fechaCarnet = document.getElementById('fecha-carnet');
        const fechaMatriculacion = document.getElementById('fecha-matriculacion');
        const fechaNacimiento = document.getElementById('fecha-nacimiento');
        // Obtener la fecha actual en formato YYYY-MM-DD
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
        const dd = String(hoy.getDate()).padStart(2, '0'); // Día con dos dígitos
        const fechaMaxima = `${yyyy}-${mm}-${dd}`;

        // Establecer la fecha máxima Añadiendo Atribuyo max a input date
        fechaCarnet.max = fechaMaxima;
        fechaMatriculacion.max = fechaMaxima;
        fechaMatriculacion.max = fechaMaxima;
        fechaNacimiento.max = fechaMaxima;
        // añadir placeholder a cada input a validar del formulario

        validaciones.forEach(validacion => {
            
            document.getElementById(validacion["nombreCampo"]).setAttribute("placeholder",validacion["placeHolder"])
        });
    })
}

export const handleChange = () => {

    document.addEventListener("change", (event) => {

        const elementoFormulario = event.target;
        const idCampoFormulario = elementoFormulario.id;
        let optionElement = "";
        let selectElement = "";
        // verificar mayor o igual a 18 años de edad
        if (idCampoFormulario === 'fecha-nacimiento') {

            const fechaNacimiento = event.target.value;
            const fechaNacimientoIntroducida = new Date(fechaNacimiento);

            // Verificar si la persona tiene al menos 18 años
            if (calcularEdad(fechaNacimientoIntroducida) < 18) {
                alert('Debes Tener 18 años o más.');
                elementoFormulario.classList.remove('valid');
                elementoFormulario.classList.add('error');
            } else {
            
                elementoFormulario.classList.remove('error');
            }

        } else if (idCampoFormulario === 'poblaciones') {

            const comunidadSeleccionada = event.target.value;
            const comunidadActual =  optionTypes["poblaciones"].find((comunidad) => comunidad["label"] === comunidadSeleccionada);

            // evitar null pointer si comunidadActual devuelve null
            if (comunidadActual) {

                selectElement = document.getElementById('provincia');
                /* Eliminar todas las opciones anteriores antes 
                de agregar otra comunidad */
                selectElement.innerHTML = '';
                comunidadActual['provinces'].forEach(provincia => {
                    optionElement = document.createElement('option');
                    optionElement.textContent = provincia['label'];
                    selectElement.appendChild(optionElement);
                });
            }

        } else if (idCampoFormulario === 'marcas') {

            const marcaSeleccionada = event.target.value;
            const marcaActual =  optionTypes["marcas"].find((marca) => marca["nombre"] === marcaSeleccionada);

            // evitar null pointer si marcaActual devuelve null
            if (marcaActual) {

                selectElement = document.getElementById('modelo');
                /* Eliminar todas las opciones anteriores antes 
                de agregar otra comunidad */
                selectElement.innerHTML = '';
                marcaActual['modelos'].forEach(modelo => {
                    optionElement = document.createElement('option');
                    optionElement.textContent = modelo;
                    selectElement.appendChild(optionElement);
                });
            }

        } else if (idCampoFormulario === 'foto-carnet') {
            const idCampoFormulario = event.target.id;
            const valorCampoFormulario = event.target.value;
            const validacion = validaciones.find((validacion) => validacion["nombreCampo"] === idCampoFormulario);
            validar(event,valorCampoFormulario,validacion);
        }
        
    })
}

export const handleSubmit = () => {

    const form = document.querySelector(".form");

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if(verificarFormularioValido());
        
    })

}


