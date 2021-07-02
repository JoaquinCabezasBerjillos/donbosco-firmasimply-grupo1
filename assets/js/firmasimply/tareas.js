import Auth from './Modules/Auth/Auth.js';
  import Tareas from './Modules/Tarea.js';
// import Categoria from './Modules/Categoria.js';
async function getListadoTareas(){
  let res = await Tareas.getListadoTareas();
  console.log(res);
  var arrayData = res;
      todoList.innerHTML = '';
      for (let i = 0; i < arrayData.length; i++) {
          todoList.innerHTML += '<li>' + arrayData[i].name + '</li>';
      }
}
getListadoTareas();

class Tarea {
    constructor(nombre, categoria, descripcion) {
      this.nombre = nombre;
      this.categoria = categoria;
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
        <td>${tarea.nombre}</td>
        <td>${tarea.categoria}</td>
        <td>${tarea.descripcion}</td>
        <td></td>
        <td></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteTarea(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#tarea-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#nombre').value = '';
      document.querySelector('#categoria').value = '';
      document.querySelector('#descripcion').value = '';
	}
}
  
  // Store Class: Handles Storage
  class Store {
    static getTareas() {
      let tareas;
      if(localStorage.getItem('tareas') === null) {
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
  
    static removeTarea(isbn) {
      const tareas = Store.getTareas();
  
      tareas.forEach((tarea, index) => {
        if(tarea.descripcion === descripcion) {
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
    const categoria = document.querySelector('#categoria').value;
    const descripcion = document.querySelector('#descripcion').value;
    Tareas.crearTarea({titulo,categoria,descripcion, user_id: 2, categoria_id: 1});
    // // Validate
    // if(nombre === '' || categoria === '' || descripcion === '') {
    //   UI.showAlert('Please fill in all fields', 'danger');
    // } else {
    
    //   const tarea = new Tarea(nombre, categoria, descripcion)
  
    //   // Add Tarea to UI
    //   UI.addTareaToList(tarea)
  
    //   // Add book to store
    //  Store.addTarea(tarea);
  
    //   // Show success message
    //  UI.showAlert('Tarea Added', 'success');
  
    //   // Clear fields
    //   UI.clearFields();
    // }
  });
  
  // Event: Remove a Tarea
  document.querySelector('#tarea-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteTarea(e.target);
  
    // Remove book from store
    Store.removeTarea(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Tarea Removed', 'success');
  });
