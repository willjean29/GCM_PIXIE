import {
  BUSINESS_ADMIN,
  BUSINESS_ADMIN_OK,
  BUSINESS_ADMIN_ERROR,
  BUSINESS_EDIT,
  BUSINESS_EDIT_OK,
  BUSINESS_EDIT_ERROR
} from '../types';
import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';

export const obtenerEmpresaAction = () => {
  return async (dispatch) => {
    dispatch(obtenerEmpresa());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/business');
      const data = response.data;
      dispatch(obtenerEmpresaOk(data.business));
    } catch (error) {
      dispatch(obtenerEmpresaError());
    }
  }
}

const obtenerEmpresa = () => ({
  type: BUSINESS_ADMIN
})
const obtenerEmpresaOk = (business) => ({
  type: BUSINESS_ADMIN_OK,
  payload: business
})
const obtenerEmpresaError = () => ({
  type: BUSINESS_ADMIN_ERROR
})

export const actualizarEmpresaAction = (dataAdmin) => {
  return async (dispatch) => {
    dispatch(actualizarEmpresa());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.put('/business',dataAdmin);
      const data = response.data;
      Notification(data.ok,data.msg);
      dispatch(actualizarEmpresaOk(data.business));
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(actualizarEmpresaError());
    }
  }
}

const actualizarEmpresa = () => ({
  type: BUSINESS_EDIT
})
const actualizarEmpresaOk = (data) => ({
  type: BUSINESS_EDIT_OK,
  payload: data
})
const actualizarEmpresaError = () => ({
  type: BUSINESS_EDIT_ERROR
})