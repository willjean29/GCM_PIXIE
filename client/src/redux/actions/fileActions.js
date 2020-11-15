import {
  FILE_SALE,
  FILE_SALE_OK,
  FILE_SALE_ERROR,
  GET_FILES,
  GET_FILES_OK,
  GET_FILES_ERROR
} from '../types';

import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';

export const registrarArchivoAction = (dataFile) => {
  return async (dispatch) => {
    const file = dataFile[0].originFileObj;
    dispatch(registrarArchivo);
    tokenAuthAdmin();
    try {
      const formData = new FormData();
      formData.append('csv', file);
      const response = await clienteAxios.post('/file/upload',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = response.data;
      // Notification(data.ok,data.msg);
      dispatch(registrarArchivoOk());
    } catch (error) {
      console.log(error.response);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(registrarArchivoError());
    }
  }
}

const registrarArchivo = () => ({
  type: FILE_SALE
})
const registrarArchivoOk = () => ({
  type: FILE_SALE_OK
})
const registrarArchivoError = () => ({
  type: FILE_SALE_ERROR
})

export const obtenerArchivosAction = () => {
  return async (dispatch) => {
    dispatch(obtenerArchivos);
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/file/all')
      const data = response.data;
      dispatch(obtenerArchivosOk(data.files));
      // console.log(data);
    } catch (error) {
      console.log(error.response);
      dispatch(obtenerArchivosError());
    }
  }
}

const obtenerArchivos = () => ({
  type: GET_FILES
})
const obtenerArchivosOk = (data) => ({
  type: GET_FILES_OK,
  payload: data
})
const obtenerArchivosError = () => ({
  type: GET_FILES_ERROR
})