import {
  REGISTER_COMPETITION,
  REGISTER_COMPETITION_OK,
  REGISTER_COMPETITION_ERROR,
  GET_COMPETITION,
  GET_COMPETITION_OK,
  GET_COMPETITION_ERROR,
  COMPETITION_IMAGE,
  COMPETITION_IMAGE_OK,
  COMPETITION_IMAGE_ERROR
} from '../types';

import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';

export const registrarConcursoAction = (dataCompetition) => {
  return async (dispatch) => {
    dispatch(registrarConcurso());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.post('/competition/register',dataCompetition);
      const data = response.data;
      Notification(data.ok,data.msg);
      dispatch(registrarConcursoOk(data.competition));
    } catch (error) {
      console.log(error.response)
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(registrarConcursoError());
    }
  }
}

const registrarConcurso = () => ({
  type: REGISTER_COMPETITION
})
const registrarConcursoOk = (data) => ({
  type: REGISTER_COMPETITION_OK,
  payload: data
})
const registrarConcursoError = () => ({
  type: REGISTER_COMPETITION_ERROR
})

export const obtenerConcursoAction = () => {
  return async (dispatch) => {
    dispatch(obtenerConcurso());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/competition');
      const data = response.data;
      // Notification(data.ok,data.msg);
      dispatch(obtenerConcursoOk(data.competition));
    } catch (error) {
      console.log(error.response)
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(obtenerConcursoError());
    }
  }
}

const obtenerConcurso = () => ({
  type: GET_COMPETITION
})
const obtenerConcursoOk = (data) => ({
  type: GET_COMPETITION_OK,
  payload: data
})
const obtenerConcursoError = () => ({
  type: GET_COMPETITION_ERROR
})

export const agregarImagenAction = (dataImage) => {
  return async (dispatch) => {
    dispatch(agregarImagen());
    tokenAuthAdmin()
    try {
      const formData = new FormData();
      formData.append('image', dataImage.file);
      const response = await clienteAxios.put('/competition/image',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = response.data;
      Notification(data.ok,data.msg);
      console.log(data);
      dispatch(agregarImagenOk(data.competition));
    } catch (error) {
      console.log(error.response);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(agregarImagenError());
    }
  }
}

const agregarImagen = () => ({
  type: COMPETITION_IMAGE
})
const agregarImagenOk = (data) => ({
  type: COMPETITION_IMAGE_OK,
  payload: data
})
const agregarImagenError = () => ({
  type: COMPETITION_IMAGE_ERROR
})
