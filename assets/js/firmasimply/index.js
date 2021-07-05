import Auth from './Modules/Auth/Auth.js';
import Asistencia from './Modules/Asistencia.js';
import Tarea from './Modules/Tarea.js';
import Pildora from './Modules/Pildora.js';

getListadoFirmas();
async function getListadoFirmas() {
    let respuesta = await Asistencia.getlistadoFirmas();
    console.log(respuesta);
    // Tu Código
}

// Funcionalidad de Firmar

function firmar() {
    document.getElementById('btn').onclick;
    firmar();
}

// Funcionalidad mostrar Listado Tareas
async function getListadoTareass() {
    let respuesta = await Asistencia.getlistadoTareas();
    console.log(respuesta);
}
// Funcionalidad mostrar Listado Píldoras
async function getListadoPildoras() {
    let respuesta = await Asistencia.getlistadoPildoras();
    console.log(respuesta);
    // Tu Código
}