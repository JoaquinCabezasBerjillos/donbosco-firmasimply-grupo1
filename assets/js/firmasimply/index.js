import Auth from './Modules/Auth/Auth.js';
import Asistencia from './Modules/Asistencia.js';
import Tarea from './Modules/Tarea.js';
import Pildora from './Modules/Pildora.js';
import { listadoFirmas } from './Modules/API/llamadasApi.js';
//import { listadoFirmas } from './Modules/API/llamadasApi.js';


// Tu Código


// Funcionalidad de Firmar Entrada
let firmaEntrada = document.getElementById("entrada")

firmaEntrada.addEventListener("click", async (e) => {
    e.preventDefault()

    let firma = {
        user_id: Auth.getCoder().id,
        nota: 'texto test',
        estado: 1
    }

    await Asistencia.firmar(firma);


});


//Firmar  salida
let firmaSalida = document.getElementById("salida");

firmaSalida.addEventListener("click", function firmaSalida(e) {
 
    e.preventDefault()

    let salida = {
        user_id: Auth.getCoder().id,
        nota: 'texto test',
        estado: 0
    }

    await Asistencia.firmar(salida);

});

// Consultar listado Firmas   

async function getlistadoFirmas() {
    await Asistencia.getlistadoFirmas();

    
}
listadoFirmas(firmas)
//Devlueve el numero de firmas registradas de hoy
async function getNumFirmasHoy() {

    await Asistencia.getNumFirmasHoy();

    
}
NumFirmasHoy()

// Consultar listado Tareas

async function listadoTareas() {

   let list = document.getElementById('tarea-list');
   let Asistencia = await Asistencia.getlistadoTareas();

    const row = document.createElement('tr')
    row.innerHTML = `      
    <td>$ {tarea.titulo}</td>
    <td>$ {tarea.descripcion}</td>
    <td>$ {tarea.estado}</td>
    `
    list.appendChild("row")

}

listadoTareas();

// Consultar listado Píldoras

async function listadoPildoras() {

   let listado = document.getElementById('pildora-list')
   let Asistencia = await Asistencia.getlistadoPildoras();
    const row = document.createElement('tr')

    /* 
   

    for (var i = 0; i <= lista.children.length -1; i++) {
        listado.pildora[i].addEventListener("click", function(){
            this.parentNode.removeChild(this);
        });
    }

};*/
   
    row.innerHTML = `
    <td>${pildora.nombre}</td>
    <td>${pildora.descripcion}</td>
    <td>${pildora.fecha_presentacion}</td>
`
list.appendChild("row")
    
}


listadoPildoras();
