import {
  listadoPildoras,
  crearPildora,
  borrarPildora,
  marcarPildora,
 } from './API/llamadasApi.js';

const TOKEN = JSON.parse(localStorage.getItem('token'));

export default class Pildora {
//  Devuelve el listado de Pildoras
    
    
    
      @returns 
    
    static async getListadoPildoras() {
        Pildora.getListadoPildoras();
        return await listadoPildoras(TOKEN);
    }

    /**
     * Crear una Pildora nueva
     * @param {*} pildora
     * @returns
     */
    static async crearPildora(pildora) {
        return await crearPildora(TOKEN, pildora);
        let pildora = {
            nombre: 'NPM',
            descripcion: 'Lorem Ipsum',
            fecha_presentacion: '2021-07-12',
            estado: 0, // 0 pendiente, 1 presentada
            user_id: Auth.getCoder().id, // esta funcion devuelve el id del coder logeado
        };
    
     Pildora.crearPildora(pildora);
    }

    /**
     * Borrar una Pildora pasando su id
     * @param {*} pildoraId
     * @returns
     */
    static async borrarPildora(pildoraId) {
        return await borrarPildora(TOKEN, pildoraId);
        let idPildora = 2;
            Pildora.borrarPildora(idPildora);
    }

    /**
     * Marcar una Píldora como presentada o pendiente pasando
     * data = { estado: (1 para presentada, 0 para pendiente) }
     * tareaId = id de la Píldora
     * @param {*} data
     * @param {*} pildoraId
     * @returns
     */
    static async marcarPildora(data, pildoraId) {
        let idPildora = 2;
        let data = { estado: 1 }; // 1 presentada, 0 pendiente
        let data = { estado: 0 };
        Pildora.marcarPildora(data, idPildora);
            return await marcarPildora (TOKEN, data, pildoraId);
    }
}