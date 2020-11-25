import {
  TOKEN_MASTER,
  TOKEN_MASTER_OK,
  TOKEN_MASTER_ERROR,
  DNI,
  DNI_OK,
  DNI_ERROR,
  REGISTER_ADMIN,
  REGISTER_ADMIN_OK,
  REGISTER_ADMIN_ERROR
} from '../types';
import clienteAxios from '../../config/clienteAxios';
import Notification from '../../components/UiElements/Notification';
export const tokenMasterAction = (token, next) => {
  return async (dispatch) => {
    dispatch(tokenMaster())
    try {
      const response = await clienteAxios.post('/admin/validarToken',token);
      const data = response.data;
      if(data.ok) next();
      Notification(data.ok,data.msg);
      dispatch(tokenMasterOk());
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(tokenMasterError());
    }
  }
}

const tokenMaster = () => ({
  type: TOKEN_MASTER
})
const tokenMasterOk = () => ({
  type: TOKEN_MASTER_OK
})
const tokenMasterError = () => ({
  type: TOKEN_MASTER_ERROR
})

export const validarDniAction = (dni,next) => {
  return async (dispatch) => {
    dispatch(validarDni());
    try {
      const response = await clienteAxios.post('/admin/verificar-dni',dni);
      const data = response.data;
      if(data.ok) next();
      Notification(data.ok,data.msg);
      dispatch(validarDniOk(data.user));
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(validarDniError());
    }
  }
}

const validarDni = () => ({
  type: DNI
})
const validarDniOk = (dataAdmin) => ({
  type: DNI_OK,
  payload: dataAdmin
})
const validarDniError = () => ({
  type: DNI_ERROR
})

export const registrarAdminAction = (formData,next) => {
  return async (dispatch) => {
    dispatch(registrarAdmin());
    try {
      const response = await clienteAxios.post('/admin/register',formData);
      const data = response.data;
      if(data.ok) next(false);
      Notification(data.ok,data.msg);
      dispatch(registrarAdminOk());
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(registrarAdminError());
    }
  }
}

const registrarAdmin = () => ({
  type: REGISTER_ADMIN
})
const registrarAdminOk = () => ({
  type: REGISTER_ADMIN_OK
})
const registrarAdminError = () => ({
  type: REGISTER_ADMIN_ERROR
})
