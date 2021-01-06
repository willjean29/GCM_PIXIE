import {
  UPLOAD_CLIENTS,
  UPLOAD_CLIENTS_OK,
  UPLOAD_CLIENTS_ERROR
} from '../types';

import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';

export const getClientsAction = () => {
  return async (dispatch) => {
    console.log("obtener clientes desde la base de datos")
  }
}

const getClients = () =>({
  type: UPLOAD_CLIENTS
})
const getClientsOk = (clients) =>({
  type: UPLOAD_CLIENTS_OK,
  payload: clients
})
const getClientsError = () => ({
  type: UPLOAD_CLIENTS_ERROR
})
