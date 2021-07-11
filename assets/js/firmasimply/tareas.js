import Auth from './Modules/Auth/Auth.js';
import Tareas from './Modules/Tarea.js';
// import Categoria from './Modules/Categoria.js';

async function getListadoTareas() {
  let res = await Tareas.getListadoTareas();
  console.log(res);

  var arrayData = res;
  for (let i = 0; i < arrayData.length; i++) {
    console.log(arrayData[i]);
    const list = document.querySelector('#tarea-list');

    const row = document.createElement('tr');

    row.innerHTML = `
          <td>${arrayData[i].titulo}</td>
          <td>${arrayData[i].categoria}</td>
          <td>${arrayData[i].descripcion}</td>
          <td>${arrayData[i].estado}</td>
          <td>${arrayData[i].created_at}</td>
          <td><a href="#" id="${arrayData[i].id}" class="btn btn-danger btn-sm delete">X</a></td>

         `

    list.appendChild(row);

   }
 }

 let btnAgregar = document.getElementById("borrar")
btnBorrar.addEventListener("click", async function borrarTarea(e){
e.preventDefault()
console.log(e)


})
// let tarea = {//
// 	titulo: document.getElementById('titulo').value,
// 	categoria: document.getElementById('categoria').value,
//   descripcion: document.getElementById('descripcion').value,
// 	estado: 0, // 0 pendiente, 1 presentada
// 	user_id: Auth.getCoder().id, // esta funcion devuelve el id del coder logeado
// };
// console.log(tarea)
// Tareas.crearTarea(tarea);
// })

Tareas.getListadoTareas();
getListadoTareas();


class Tarea {
  constructor(titulo, categoria_id, descripcion) {
    this.titulo = titulo;
    this.categoria_id = categoria_id;
    this.descripcion = descripcion;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayTareas() {
    const tareas = Store.getTareas();

    tareas.forEach((tarea) => UI.addTareaToList(tarea));
  }

  static addTareaToList(tarea) {
    const list = document.querySelector('#tarea-list');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${tarea.titulo}</td>
        <td>${tarea.categoria_id}</td>
        <td>${tarea.descripcion}</td>
        <td></td>
        <td></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

    list.appendChild(row);
  }

  static deleteTarea(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // static showAlert(message, className) {
  //   const div = document.createElement('div');
  //   div.className = `alert alert-${className}`;
  //   div.appendChild(document.createTextNode(message));
  //   const container = document.querySelector('.container');
  //   const form = document.querySelector('#tarea-form');
  //   container.insertBefore(div, form);

  //   // Vanish in 3 seconds
  //   setTimeout(() => document.querySelector('.alert').remove(), 3000);
  // }

  static clearFields() {
    document.querySelector('#titulo').value = '';
    document.querySelector('#categoria_id').value = '';
    document.querySelector('#descripcion').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getTareas() {
    let tareas;
    if (localStorage.getItem('tareas') === null) {
      tareas = [];
    } else {
      tareas = JSON.parse(localStorage.getItem('tareas'));
    }

    return tareas;
  }

  static addTarea(tarea) {
    const tareas = Store.getTareas();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  static removeTarea(tarea) {
    const tareas = Store.getTareas();

    tareas.forEach((tarea, index) => {
      if (tarea.descripcion === descripcion) {
        tarea.splice(index, 1);
      }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
  }
}

// Event: Display Tareas 
document.addEventListener('DOMContentLoaded', UI.displayTareas);
console.log(1);
// Event: Add a Tarea
document.querySelector('#tarea-form').addEventListener('submit', (e) => {
  e.preventDefault();


  // Get form values
  const titulo = document.querySelector('#nombre').value;
  const categoria_id = document.querySelector('#categoria').value;
  const descripcion = document.querySelector('#descripcion').value;
  Tareas.crearTarea({ titulo, categoria_id, descripcion, user_id: 2, categoria_id: 1, estado: 0});
  // // Validate
  if(titulo === '' || categoria_id === '' || descripcion === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {

    const tarea = new Tarea(titulo, categoria_id, descripcion)

    // Add Tarea to UI
    UI.addTareaToList(tarea)

    // Add Tarea to store
   Store.addTarea(tarea);

    // Show success message
  //  UI.showAlert('Tarea Added', 'success');
  UI.showAlert('Tarea borrada','success')

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Tarea
document.querySelector('#tarea-list').addEventListener('click', (e) => {
  // Remove Tarea from UI
  UI.deleteTarea(e.target);

  // Remove Tarea from store
  Store.removeTarea(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  // UI.showAlert('Tarea Removed', 'success');
});
