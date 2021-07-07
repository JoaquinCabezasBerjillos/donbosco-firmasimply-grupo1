import Auth from './Modules/Auth/Auth.js';
import Pildoras from './Modules/Pildora.js';

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
getListadoPildoras();

class Pildora {
	constructor(nombre, descripcion, fecha_presentacion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.fecha_presentacion = fecha_presentacion;
	}
}
class UI {
	static displayPildoras() {
		const pildoras = Store.getPildoras();

		pildoras.forEach((pildora) => UI.addPildoraToList(pildora));
	}

	static addTareaToList(pildora){
		const list = document.querySelector('#pildora-list');

		const row = document.createElement('tr');

		row.innerHTML =  `
        <td>${pildora.nombre}</td>
        <td>${pildora.categoria_id}</td>
        <td>${pildora.descripcion}</td>
        <td></td>
        <td></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  }

  	static deletePildora(el){
		if (el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}
	}

	static clearFields() {
		document.querySelector('#nombre').value = '';
		document.querySelector('#descripcion').value = '';
		document.querySelector('#fecha_presentacion').value = '';
	}
}

class Store {
	static getPildoras() {
	  let pildoras;
	  if (localStorage.getItem('pildoras') === null) {
		pildoras = [];
	  } else {
		pildoras = JSON.parse(localStorage.getItem('pildoras'));
	  }
  
	  return pildoras;
	}
  
	static addTarea(pildora) {
	  const pildoras = Store.getPildoras();
	  pildoras.push(pildora);
	  localStorage.setItem('pildoras', JSON.stringify(pildoras));
	}
  
	static removeTarea(pildora) {
	  const pildoras = Store.getTareas();
  
	  pildoras.forEach((pildora, index) => {
		if (pildora.descripcion === descripcion) {
		  pildora.splice(index, 1);
		}
	  });
  
	  localStorage.setItem('pildoras', JSON.stringify(pildoras));
	}
  }

  document.addEventListener('DOMContentLoaded', UI.displayTareas);
  console.log(1);
  // Event: Add a Pildora
  document.querySelector('#pildora-form').addEventListener('submit', (e) => {
	e.preventDefault();
  
  
	// Get form values
	const nombre = document.querySelector('#nombre').value;
	const descripcion = document.querySelector('#descripcion').value;
	const fecha_presentacion = document.querySelector('#fecha_presentacion').value;
	Pildoras.crearPildora({ nombre, descripcion, fecha_presentacion, user_id: 2, categoria_id: 1 });
	// // Validate
	if(nombre === '' || descripcion === '' || fecha_presentacion === '') {
	  UI.showAlert('Please fill in all fields', 'danger');
	} else {
  
	  const pildora = new Pildora(nombre, descripcion, fecha_presentacion)
  
	  // Add Pildora to UI
	  UI.addTareaToList(pildora)
  
	  // Add Pildora to store
	 Store.addPildora(pildora);
  
	  // Show success message
	//  UI.showAlert('Pildora Added', 'success');
	UI.showAlert('Pildora borrada','success')
  
	  // Clear fields
	  UI.clearFields();
	}
  });
  
  // Event: Remove a Pildora
  document.querySelector('#pildora-list').addEventListener('click', (e) => {
	// Remove Pildora from UI
	UI.deletePildora(e.target);
  
	// Remove Pildora from store
	Store.removePildora(e.target.parentElement.previousElementSibling.textContent);
  
	// Show success message
	// UI.showAlert('Pildora Removed', 'success');
  });