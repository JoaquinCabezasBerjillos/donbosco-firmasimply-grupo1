import Auth from './Modules/Auth/Auth.js';
import Asistencia from './Modules/Asistencia.js';
import Tarea from './Modules/Tarea.js';
import Pildora from './Modules/Pildora.js';


// Tu Código


// Funcionalidad de Firmar
let firmaEntrada = document.getElementById("entrada")

firmaEntrada.addEventListener("click"), async (e) => {
    e.preventDefault()

    let firma = {
        user_id: Auth.getCoder().id,
        nota: 'texto test',
        estado: 1 // 1 para entrada, 0 para salida

    }
    await Asistencia.firmar(firma);


    // Consultar listado Firmas
    let listadoFirmas = await Asistencia.getlistadoFirmas();
    let lista = document.getElementById('lista_firmas')
    let comentario = document.getElementById("anotacion").value
    lista.innerHTML += `<li> ${listadoFirmas[0].created_at + " " + "anotacion: " + nota} </li>`;

}

//Firmar  salida
let firmaSalida = document.getElementById("salida");

firmaSalidas.addEventListener("click"), async (e) => {
    e.preventDefault()
    let firma = {
        user_id: Auth.getCoder().id,
        nota: 'texto test',
        estado: 0
    }
};
await Asistencia.firmar(firma);

async function getNumFirmasHoy() {
    
    Asistencia.getNumFirmasHoy();
}


// Consultar listado Píldoras


async function listadoPildoras() {
    let listadoPildoras = await Asistencia.getlistadoPildoras();

}



// Consultar listado Tareas

async function listadoTareas() {
    let listadoTareas = await Asistencia.getlistadoTareas();
};
