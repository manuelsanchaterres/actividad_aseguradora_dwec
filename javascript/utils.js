import {optionTypes,precioBaseSeguros,penalizacionTipoVehiculo} from './data.js'
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

export const calcularTiempo = (fechaNacimientoIntroducida) => {

    console.log(fechaNacimientoIntroducida);
    console.log(typeof fechaNacimientoIntroducida);
    const hoy = new Date();
    // Calcular la diferencia de años
    let tiempo = hoy.getFullYear() - fechaNacimientoIntroducida.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoIntroducida.getMonth();

    /* Si el mes de la fecha de nacimiento es posterior al mes actual o el dia 
    introducido es mayor al de hoy dentro del mismo mes, restar un año todavía no ha cumplido años 
    en el ejercicio actual*/
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoIntroducida.getDate())) {
        tiempo--;
    }

    return tiempo;
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

    let precioSeguro = 0;
    // Buscamos el seguro que corresponda con el valor del select de tipo de seguro
    const seguro = precioBaseSeguros.find((seguro) => seguro['tipo'] === formData['tipo_seguro'].toLowerCase());
    const penalizacionTipo = penalizacionTipoVehiculo.find((penalizacion) => penalizacion['tipo'] === formData['tipo_vehiculo'].toLowerCase());
    const tiempoVehiculo = calcularTiempo(new Date(formData['fecha-matriculacion']));
    let penalizacion = 0;
    if (seguro) {

        precioSeguro = seguro['precio'];
        console.log(precioSeguro);
        if (calcularTiempo(new Date(formData['fecha-nacimiento'])) >= 18 && calcularTiempo(new Date(formData['fecha-nacimiento'])) < 25) {

            precioSeguro *= 1.1;
            console.log(precioSeguro);
        }
        if (calcularTiempo(new Date(formData['fecha-carnet'])) > 5) {

            precioSeguro *= 0.9;
            console.log(precioSeguro);
        }
        if (penalizacionTipo) {
            penalizacion = penalizacionTipo['penalizacion'] / 100;
            precioSeguro *= 1 + penalizacion;
        }
        if (tiempoVehiculo > 10) {

            const penalizacion = (tiempoVehiculo - 10) / 100;
            precioSeguro *= 1 + penalizacion;
            console.log(precioSeguro);
        }
    }
    
}