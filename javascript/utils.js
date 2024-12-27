import {optionTypes,datosSeguros,penalizacionTipoVehiculo} from './data.js'
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
    console.log(event,valorCampoFormulario,validacion);
    
    if (validacion) {
        // Crear una instancia de RegExp a partir de la expresión regular
        const regex = new RegExp(validacion["regex"]);
        

        // Verificar si el valor cumple con la expresión regular
        if (regex.test(valorCampoFormulario)) {

            if (event.target.id === 'foto-carnet') {

                let imageContainer = document.querySelector(".file-upload");
                imageContainer.classList.remove("error");
                imageContainer.classList.add("valid");
            }else {

                event.target.classList.remove("error");
                event.target.classList.add("valid");
            }

        } else {

            if (event.target.id === 'foto-carnet') {

                let imageContainer = document.querySelector(".file-upload");
                imageContainer.classList.remove("valid");
                imageContainer.classList.add("error");
            }else {

                event.target.classList.remove("error");
                event.target.classList.add("valid");
            }

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
export const calcularSeguro = (formData,seguro) => {

    let precioSeguro = 0;
    // Buscamos el seguro que corresponda con el valor del select de tipo de seguro
    // const seguro = datosSeguros.find((seguro) => seguro['tipo'] === formData['tipo_seguro'].toLowerCase());
    const penalizacionTipo = penalizacionTipoVehiculo.find((penalizacion) => penalizacion['tipo'] === formData['tipo_vehiculo'].toLowerCase());
    const tiempoVehiculo = calcularTiempo(new Date(formData['fecha-matriculacion']));
    let penalizacion = 0;
    if (seguro) {

        precioSeguro = seguro['precio'];
        if (calcularTiempo(new Date(formData['fecha-nacimiento'])) >= 18 && calcularTiempo(new Date(formData['fecha-nacimiento'])) < 25) {

            precioSeguro *= 1.1;
        }
        if (calcularTiempo(new Date(formData['fecha-carnet'])) > 5) {

            precioSeguro *= 0.9;
        }
        if (penalizacionTipo) {
            penalizacion = penalizacionTipo['penalizacion'] / 100;
            precioSeguro *= 1 + penalizacion;
        }
        if (tiempoVehiculo > 10) {

            const penalizacion = (tiempoVehiculo - 10) / 100;
            precioSeguro *= 1 + penalizacion;
        }

        
    }
    return precioSeguro;
}

export const calcularSeguroTodoTipos = (formData,datosSeguros) => {

    let arraySeguros = [];

    datosSeguros.forEach(seguro => {

        arraySeguros.push({"tipoSeguro": seguro["tipo"],"precioFinal":calcularSeguro(formData,seguro)});
        
    });

    return arraySeguros;
}

export const mostrarSeguros = (seguros) =>{

    const tarjetasSeguros = document.getElementById('tarjetas-seguros');
    if (tarjetasSeguros) {
        tarjetasSeguros.innerHTML = '';
    } 
    seguros.forEach(seguro => {
        const container = document.createElement('div');
        container.className = 'detalles-seguro';

        const tipoSeguroElement = document.createElement('p');
        tipoSeguroElement.textContent = `Tipo de Seguro: ${seguro.tipoSeguro}`;
        container.appendChild(tipoSeguroElement);

        const precioFinalElement = document.createElement('p');
        precioFinalElement.textContent = `Precio Final: ${seguro.precioFinal.toFixed(2)} €`;
        container.appendChild(precioFinalElement);

        const botonesTarjeta = document.createElement('div');
        botonesTarjeta.className = 'botones-tarjeta';
        // Creamos botón "Contratar"
        const contratarButton = document.createElement('button');
        contratarButton.textContent = 'Contratar';
        contratarButton.className = 'button contratar';
        contratarButton.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = "darkGreen";
        });
        contratarButton.addEventListener('mouseout', (event) => {
            event.target.style.backgroundColor = ""; // Retoma el Fondo Original
        });
        contratarButton.addEventListener('click', () => {
            alert(`Gracias por contratar el seguro de tipo: ${seguro.tipoSeguro}.  Atentamente tu asesor de seguros Manuel Sancha Terres`);
        });
        botonesTarjeta.appendChild(contratarButton);

        // Creamos botón "Descartar Seguro"
        const descartarButton = document.createElement('button');
        descartarButton.textContent = 'Descartar Seguro';
        descartarButton.className = 'button descartar';
        descartarButton.addEventListener('click', () => {
            const confirmDiscard = confirm('¿Estás seguro de que quieres descartar este seguro?');
            if (confirmDiscard) {
                container.remove(); // Se elimina la carla seleccionada del DOM
            }
        });
        botonesTarjeta.appendChild(descartarButton);
        container.appendChild(botonesTarjeta);
        tarjetasSeguros.appendChild(container);
    });
    
}