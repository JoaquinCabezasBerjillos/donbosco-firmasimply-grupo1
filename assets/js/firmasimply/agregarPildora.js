const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

// submit form
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = this.name;
  const inputValue = input.value;

  if (inputValue != "") {
    const task = {
      id: new Date().getTime(),
      name: inputValue,
      isCompleted: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(task);
    todoForm.reset();
  }
  input.focus();
});

// remove task
todoList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("remove-task") ||
    e.target.parentElement.classList.contains("remove-task")
  ) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

// update task - change status or name
todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id;
  updateTask(taskId, e.target);
});

// prevent new lines with Enter
todoList.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

// create task
function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);
  const taskElMarkup = `
    <div class="checkbox-wrapper">
      <input type="checkbox" id="${task.name}-${task.id}" name="tasks" ${
    task.isCompleted ? "checked" : ""
  }>
      <label for="${task.name}-${task.id}">
        <svg class="checkbox-empty">
          <use xlink:href="#checkbox_empty"></use>
        </svg>
        <svg class="checkmark">
          <use xlink:href="#checkmark"></use>
        </svg>
      </label>
      <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
    </div>
    <button class="remove-task" title="Remove ${task.name} task">
      <svg>
        <use xlink:href="#close"></use>
      </svg>
    </button>
  `;
  taskEl.innerHTML = taskElMarkup;
  todoList.appendChild(taskEl);
  countTasks();
}

// remove task
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
  countTasks();
}

// update task
function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));

  if (el.hasAttribute("contentEditable")) {
    task.name = el.textContent;
  } else {
    const span = el.nextElementSibling.nextElementSibling;
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      span.removeAttribute("contenteditable");
      el.setAttribute("checked", "");
    } else {
      el.removeAttribute("checked");
      span.setAttribute("contenteditable", "");
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  countTasks();
}

function countTasks() {
  totalTasks.textContent = tasks.length;
  const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

// class Pildora {
//     constructor(nombre, descripcion, presentacion){
//         this.nombre = nombre;
//         this.descripcion = descripcion;
//         this.presentacion = presentacion;
//     }
//   }

// const defaultPildoras = [
// 	{
// 		nombre: 'Pildora 1',
// 		descripcion: 'Brad Traversy',
// 		presentacion: '12345'
// 	},
// 	{
// 		nombre: 'Pildora 2',
// 		descripcion: 'Mehul Mohan',
// 		presentacion: '6789'
// 	}
// ]

// class UI {
//     static displayPildoras(){
//         defaultPildoras.forEach(pildora => UI.addPildoraToList(pildora))
//     }
//     static clearFileds(){
//         document.getElementById("nombre").value = ""
//         document.getElementById("descripcion").value = ""
//         document.getElementById("presentacion").value = ""
//     }
//     static deletePildora(target){
//         if (target.classList.contains('delete')) {
// 			// we clicked the X icon
// 			target.parentElement.parentElement.remove()
// 		}
//     }
//     static addPildoraToList(pildora) {
//         const list = document.getElementById("pildora-list") // get the #pildora-list DOM node here
//         const row = document.createElement("tr")// create a TR row element here (document.createElement)
//         row.innerHTML = `
//         <td>${pildora.nombre}</td>
//         <td>${pildora.descripcion}</td>
//         <td>${pildora.presentacion}</td>
//         <td><input type="checkbox"></td> 
//         <td>${Date()}</td>
//         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
//         `
//         list.appendChild(row)
//     }
// }

// UI.displayPildoras()

// document.querySelector('#pildora-form').addEventListener('submit', addAPildora, false)

// function addAPildora(e) {
// 	// prevent actual submission
// 	e.preventDefault()

// 	// Capturar los valores del Form
//     const nombre = document.getElementById("nombre").value
//     const descripcion = document.getElementById("descripcion").value
//     const presentacion = document.getElementById("presentacion").value
// 	// Crear un nuevo objeto pildora
//     const pildora = new Pildora(nombre, descripcion, presentacion)

//     //Aunque no tenga un valor definido en la funcion, se encarga de darle este valor por defecto a cuaqluier variable que se asigne después.

// 	// Añadir el objeto pildora creado a UI (mostrarlo en HTML)
//     UI.addPildoraToList(pildora)

//     UI.clearFileds()
    
// }
//     document.getElementById('pildora-list').addEventListener('click', handleRemove)
//     function handleRemove(e) {
//         // Remove pildora from UI
//         UI.deletePildora(e.target)
//     }