import {drawSelectOptions} from './utils.js'
import {handleKeyUp,handleContentLoad,handleChange,handleSubmit} from './eventMethods.js'

/* 
    En este script se ejecutan los script para gestionar los selects del formulario
    y los manejadores de eventos.
*/

drawSelectOptions();
handleKeyUp();
handleContentLoad();
handleChange();
handleSubmit();