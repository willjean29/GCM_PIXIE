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
    dispatch(getClients());
    tokenAuthAdmin();
    try {
      const responseActives = await clienteAxios.get('/clients/activos');
      const responseInactives = await clienteAxios.get('/clients/inactivos');
      const {clientesActivos} = responseActives.data;
      const {clientesInactivos} = responseInactives.data;
      const clientsData = {
        actives: clientesActivos,
        inactives: clientesInactivos
      }
      dispatch(getClientsOk(clientsData));
    } catch (error) {
      console.log(error.response);
      dispatch(getClientsError());

    }
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
