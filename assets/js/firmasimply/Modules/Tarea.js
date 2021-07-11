import {
  listadoTareas,
  crearTarea,
  borrarTarea,
  marcarTarea,
 } from './API/llamadasApi.js';

const TOKEN = JSON.parse(localStorage.getItem('token'));

export default class Tarea {

    /**
     * Devuelve el listado de tareas
     * @returns
     */
    static async getListadoTareas() {
        return await listadoTareas(TOKEN);
    }

    /**
     * Crear una tarea nueva

     * @param {*} tarea
     * @returns
     */
    static async crearTarea(tarea) {
        return await crearTarea(TOKEN, tarea);
    //     let tarea = {
    //         titulo: 'Tarea nueva',
    //         descripcion: 'Lorem Ipsum',
    //         estado: 0, // 0 pendiente, 1 completada
    //         user_id: Auth.getCoder().id, // esta funcion devuelve el id del coder logeado
    //         categoria_id: 1,
    //     };
    
    //  Tarea.crearTarea(tarea);
    }

    /**
     * Borrar una tarea pasando su id
     * @param {*} tareaId
     * @returns
     */
    
    static async borrarTarea(tareaId) {
        return await borrarTarea(TOKEN, tareaId);
    }

    /**
     * Marcar una tarea como completada o pendiente pasando
     * data = { estado: (1 para completa, 0 para pendiente) }
     * tareaId = id de la tarea
     * @param {*} data
     * @param {*} tareaId
     * @returns
     */
    
    static async marcarTarea(data, tareaId) {
        return await marcarTarea(TOKEN, data, tareaId);
    
    let idTarea = 2;
//let data = { estado: 1 }; // 1 completada, 0 pendiente
Tarea.marcarTarea(data, idTarea);
}
}