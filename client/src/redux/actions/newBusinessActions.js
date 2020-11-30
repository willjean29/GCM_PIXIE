import {
  RUC,
  RUC_OK,
  RUC_ERROR,
  REGISTER_BUSINESS,
  REGISTER_BUSINESS_OK,
  REGISTER_BUSINESS_ERROR
} from '../types';
import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';
export const validarRucAction = (ruc,next) => {
  return async (dispatch) => {
    dispatch(validarRuc());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.post('/business/verificar-ruc',ruc);
      const data = response.data;
      if(data.ok) next();
      Notification(data.ok,data.msg);
      dispatch(validarRucOk(data.business));
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(validarRucError());
    }
  }
}

const validarRuc = () => ({
  type: RUC
})
const validarRucOk = (data) => ({
  type: RUC_OK,
  payload: data
})
const validarRucError = () => ({
  type: RUC_ERROR
})

export const registrarEmpresaAction = (dataBusiness,next,setReloadUser) => {
  return async (dispatch) => {
    dispatch(registrarEmpresa());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.post('/business/registrar',dataBusiness);
      const data = response.data;
      console.log(data);
      Notification(data.ok,data.msg);
      dispatch(registrarEmpresaOk());
      if(data.ok) {
        next();
        setReloadUser(true);
      };
    } catch (error) {
      console.log(error);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(registrarEmpresaError());
    }
  }
}

const registrarEmpresa = () => ({
  type: REGISTER_BUSINESS
})
const registrarEmpresaOk = () => ({
  type: REGISTER_BUSINESS_OK
})
const registrarEmpresaError = () => ({
  type: REGISTER_BUSINESS_ERROR
})