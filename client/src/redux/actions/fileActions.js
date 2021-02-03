import {
  FILE_SALE,
  FILE_SALE_OK,
  FILE_SALE_ERROR,
  GET_FILES,
  GET_FILES_OK,
  GET_FILES_ERROR,
  FILE_DETAIL,
  FILE_DETAIL_OK,
  FILE_DETAIL_ERROR,
  DELETE_FILE,
  DELETE_FILE_OK,
  DELETE_FILE_ERROR,
  FILE_PROCESSING,
  FILE_PROCESSING_OK,
  FILE_PROCESSING_ERROR
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
      // eslint-disable-next-line
      const response = await clienteAxios.post('/file/upload',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // const data = response.data;
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
      console.log(data);
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

export const detalleArchivoAction = (file) => {
  return async (dispatch) => {
    dispatch(detalleArchivo());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get(`/file/ventas/${file._id}`);
      const data = response.data;
      console.log(data);
      dispatch(detalleArchivoOk(data.file));
    } catch (error) {
      console.log(error.response);
      dispatch(detalleArchivoError())
    }
  }
}

const detalleArchivo = () => ({
  type: FILE_DETAIL
})
const detalleArchivoOk = (file) => ({
  type: FILE_DETAIL_OK,
  payload: file
})
const detalleArchivoError = () => ({
  type: FILE_DETAIL_ERROR
})

export const eliminarArchivoAction = (file) => {
  return async (dispatch) => {
    dispatch(eliminarArchivo());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.delete(`/file/${file._id}`);
      const data = response.data;
      console.log(data);
      Notification(data.ok,data.msg);
      dispatch(eliminarArchivoOk());
    } catch (error) {
      console.log(error.response);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(eliminarArchivoError());
    }
  }
}

const eliminarArchivo = () => ({
  type: DELETE_FILE
})
const eliminarArchivoOk = () => ({
  type: DELETE_FILE_OK
})
const eliminarArchivoError = () => ({
  type: DELETE_FILE_ERROR
})

export const procesarArchivoAction = (file,setReloadFiles) => {
  return async (dispatch) => {
    dispatch(procesarArchivo());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.post(`/file/clientes/${file._id}`);
      const data = response.data;
      Notification(data.ok,data.msg);
      if(data.ok){
        setReloadFiles(true);
      }
      dispatch(procesarArchivoOk())
    } catch (error) {
      console.log(error.response);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(procesarArchivoError())
    }
  }
}

const procesarArchivo = () => ({
  type: FILE_PROCESSING
})
const procesarArchivoOk = () => ({
  type: FILE_PROCESSING_OK
})
const procesarArchivoError = () => ({
  type: FILE_PROCESSING_ERROR
})