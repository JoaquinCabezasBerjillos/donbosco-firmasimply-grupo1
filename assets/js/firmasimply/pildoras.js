import Auth from './Modules/Auth/Auth.js';
import Pildora from './Modules/Pildora.js';

async function getListadoPildoras() {
    let res = await Pildoras.getListadoPildoras();

	var arrayData = res;
	for (let i = 0; i < arrayData.length; i++){
		console.log(arrayData[i]);
		const list = document.querySelector('#pildora-list');

		const row = document.createElement('tr');

		row.innerHTML=`
		<td>${arrayData[i].nombre}</td>
		<td>${arrayData[i].descripcion}</td>
		<td>${arrayData[i].fecha_presentacion}</td>
		<td>${arrayData[i].estado}</td>
		<td>${arrayData[i].created_at}</td>
		<td><a href="#" id="${arrayData[i].id}" class="btn btn-danger btn-sm delete">X</a></td>
	   `
	   list.appendChild(row);
	}
}

// Pildora Class: Represents a Pildora
getListadoTareas();

class Pildora {
	constructor(nombre, descripcion, fecha_presentacion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.fecha_presentacion = fecha_presentacion;
	}
}
class UI {
	static displayTareas() {
		const tareas = Store.getTareas();

		tareas.forEach((tarea) => UI.)
	}


}
class Store {
	static addPildora(pildora) {
        const pildoras = Store.getPildoras();
        pildoras.push(pildora);
        localStorage.setItem('pildoras', JSON.stringify(pildoras));
    }
	static removePildora(fecha_presentacion) {
        const pildoras = Store.getPildoras();
        pildoras.forEach((pildora, index) => {
            if(pildora.fecha_presentacion === fecha_presentacion){
                pildoras.splice(index, 1);
            }
        });
        localStorage.setItem('pildoras', JSON.stringify(pildoras));
    }
	static getPildoras() {
        let pildoras = localStorage.getItem('pildoras');
        if(pildoras === null) {
            return [];
        } else {
            return JSON.parse(pildoras);
        }
    }
}

// UI Class: Handle UI Tasks
class UI {
	static showAlert(message, className) {
		const div = document.createElement('div')
		div.innerText = message
		div.className = `alert alert-${className}`
		document.getElementById('pildora-form').prepend(div)

		setTimeout(() => {
			div.remove()
		}, 2000)
	}

	static deletePildora(target) {
		if (target.classList.contains('delete')) {
			// we clicked the X icon
			target.parentElement.parentElement.remove()
		}
	}
	static clearFields() {
		const descripcion = document.getElementById('descripcion')
		const nombre = document.getElementById('nombre')
		const fecha_presentacion = document.getElementById('fecha_presentacion')
		descripcion.value = ''
		nombre.value = ''
		fecha_presentacion.value = ''
	}

	static displayPildoras() {
		const pildoras = Store.getPildoras();
		pildoras.forEach((pildora) => UI.addPildoraToList(pildora))
	}

	static addPildoraToList(pildora) {
		const list = document.getElementById('pildora-list')

		const row = document.createElement('tr')

		row.innerHTML = `
    <td>${pildora.nombre}</td>
    <td>${pildora.descripcion}</td>
    <td>${pildora.fecha_presentacion}</td>
	<td></td>
	<td></td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `

		list.appendChild(row)
	}
}

// Event: Display Pildoras
UI.displayPildoras()

// Event: Add a Pildora
document.querySelector('#pildora-form').addEventListener('submit', addAPildora, false)

function addAPildora(e) {
	// prevent actual submission
	e.preventDefault()

	// Get Form Values
	const descripcion = document.getElementById('descripcion').value
	const nombre = document.getElementById('nombre').value
	const fecha_presentacion = document.getElementById('fecha_presentacion').value

	if (!descripcion || !nombre || !fecha_presentacion) {
		UI.showAlert('Please enter correct details', 'danger')
		return
	}

	// Instantiate a new Pildora object
	const pildora = new Pildora(nombre, descripcion, fecha_presentacion)

	// Add pildora object to UI
	UI.addPildoraToList(pildora)

	// Add pildora to store
	Store.addPildora(pildora)

	UI.showAlert('Pildora Added', 'success')

	// Clear fields
	UI.clearFields()
}

document.getElementById('pildora-list').addEventListener('click', handleRemove)
function handleRemove(e) {
	// Remove pildora from UI
	UI.deletePildora(e.target)
	UI.showAlert('Pildora Removed', 'success')

	// Remove pildora from store
	Store.removePildora(e.target.parentElement.previousElementSibling.textContent)
}