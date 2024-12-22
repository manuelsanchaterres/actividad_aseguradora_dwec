import { validaciones } from "./data.js"
export const handleKeyUp = () => {

    document.addEventListener("keyup", (event) => {

        const idCampoFormulario = event.target.id;
        const valorCampoFormulario = event.target.value;
        const validacion = validaciones.find((validacion) => validacion["nombreCampo"] === idCampoFormulario);
        console.log(valorCampoFormulario);
        
        if (validacion) {
            // Crear una instancia de RegExp a partir de la expresión regular
            const regex = new RegExp(validacion["regex"]);
        
            // Verificar si el valor cumple con la expresión regular
            if (regex.test(valorCampoFormulario)) {
                event.target.classList.remove("error");
                event.target.classList.add("valid");
            } else {
                event.target.classList.remove("valid");
                event.target.classList.add("error");
            }
        }
        
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
        const idCampoFormulario = event.target.id;
        // verificar mayor o igual a 18 años de edad
        if (idCampoFormulario === 'fecha-nacimiento') {

            const fechaNacimiento = event.target.value;
            const hoy = new Date();
            const fechaNacimientoIntroducida = new Date(fechaNacimiento);
    
            // Calcular la diferencia de años
            let edad = hoy.getFullYear() - fechaNacimientoIntroducida.getFullYear();
            const mes = hoy.getMonth() - fechaNacimientoIntroducida.getMonth();
    
            /* Si el mes de la fecha de nacimiento es posterior al mes actual o el dia 
            introducido es mayor al de hoy dentro del mismo mes, restar un año todavía no ha cumplido años 
            en el ejercicio actual*/
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoIntroducida.getDate())) {
                edad--;
            }
    
            // Verificar si la persona tiene al menos 18 años
            if (edad < 18) {
                alert('Debes Tener 18 años o más.');
                elementoFormulario.classList.remove('valid');
                elementoFormulario.classList.add('error');
            } else {
            
                elementoFormulario.classList.remove('error');
            }
        };
        
    })
}

export const handleSelect = () => {

    document.addEventListener("select", (event) => {

        console.log(event.target.value);
        
    })

}