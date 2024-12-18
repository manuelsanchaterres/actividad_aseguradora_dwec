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
            selectElement = document.getElementById('provincia');

            optionTypes[optionType].forEach(comunidad => {

                counterProvincias += comunidad['provinces'].length;
                comunidad['provinces'].forEach(provincia => {
                    optionElement = document.createElement('option');
                    optionElement.textContent = provincia['label'];
                    selectElement.appendChild(optionElement);
                });
            });

        } else if (optionType === 'marcas') {
            
            const modeloElement = document.getElementById('modelo');
            optionTypes[optionType].forEach(marca => {
                optionElement = document.createElement('option');
                optionElement.textContent = marca['nombre'];
                selectElement.appendChild(optionElement);
                marca['modelos'].forEach(modelo => {
                    optionElement = document.createElement('option');
                    optionElement.textContent = modelo;
                    modeloElement.appendChild(optionElement);
                });

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