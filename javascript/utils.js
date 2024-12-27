import {optionTypes} from './data.js'
export const drawSelectOptions = () => {
    const optionTypesList = Object.keys(optionTypes);
    let selectElement;
    let optionElement;
    let counterProvincias = 0;
    optionTypesList.forEach(optionType => {

        selectElement = document.getElementById(optionType);
        
        if (optionType === 'poblaciones') {
            
            optionTypes[optionType].forEach(comunidad => {
                optionElement = document.createElement('option');
                optionElement.textContent = comunidad['label'];
                selectElement.appendChild(optionElement);

            });

        } else if (optionType === 'marcas') {
            
            const modeloElement = document.getElementById('modelo');
            optionTypes[optionType].forEach(marca => {
                optionElement = document.createElement('option');
                optionElement.textContent = marca['nombre'];
                selectElement.appendChild(optionElement);
            });

        } else {

        
            optionTypes[optionType].forEach(option => {
                optionElement = document.createElement('option');
                optionElement.textContent = option;
                selectElement.appendChild(optionElement);
            });
            
        }
    });

}

export const validar = (event,valorCampoFormulario,validacion) => {

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
}

export const calcularEdad = (fechaNacimientoIntroducida) => {

    const hoy = new Date();
    // Calcular la diferencia de años
    let edad = hoy.getFullYear() - fechaNacimientoIntroducida.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoIntroducida.getMonth();

    /* Si el mes de la fecha de nacimiento es posterior al mes actual o el dia 
    introducido es mayor al de hoy dentro del mismo mes, restar un año todavía no ha cumplido años 
    en el ejercicio actual*/
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoIntroducida.getDate())) {
        edad--;
    }

    return edad;
}

export const verificarFormularioValido = () => {

    const inputs = document.querySelectorAll('input');
    const hasError = Array.from(inputs).some(input => input.classList.contains('error'));
    if (hasError) {
        return false;
    } else {
        return true;
    }
}

export const crearObjetoDatosFormulario = (event) => {

    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());
    return formDataObject ;
}
export const calcularSeguro = (formData) => {

    
    
}