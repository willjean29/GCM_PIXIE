import {
  REGISTER_COMPETITION,
  REGISTER_COMPETITION_OK,
  REGISTER_COMPETITION_ERROR,
  GET_COMPETITION,
  GET_COMPETITION_OK,
  GET_COMPETITION_ERROR,
  COMPETITION_IMAGE,
  COMPETITION_IMAGE_OK,
  COMPETITION_IMAGE_ERROR,
  UPDATE_COMPETITION,
  UPDATE_COMPETITION_OK,
  UPDATE_COMPETITION_ERROR,
  ACTIVE_COMPETITION,
  ACTIVE_COMPETITION_OK,
  ACTIVE_COMPETITION_ERROR
} from '../types';

import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';

export const registrarConcursoAction = (dataCompetition,setReloadUser) => {
  return async (dispatch) => {
    dispatch(registrarConcurso());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.post('/competition/register',dataCompetition);
      const data = response.data;
      Notification(data.ok,data.msg);
      dispatch(registrarConcursoOk());
      if(data.ok){
        setReloadUser(true);
      }
    } catch (error) {
      console.log(error)
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(registrarConcursoError());
    }
  }
}

const registrarConcurso = () => ({
  type: REGISTER_COMPETITION
})
const registrarConcursoOk = () => ({
  type: REGISTER_COMPETITION_OK
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

export const modificarConcursoAction = (dataConcurso) => {
  return async (dispatch) => {
    dispatch(modificarConcurso());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.put('/competition',dataConcurso);
      const data = response.data;
      console.log(data)
      Notification(data.ok,data.msg);
      dispatch(modificarConcursoOk(data.competition));
    } catch (error) {
      console.log(error.response);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(modificarConcursoError());
    }
  }
}

const modificarConcurso = () => ({
  type: UPDATE_COMPETITION
})
const modificarConcursoOk = (concurso) => ({
  type: UPDATE_COMPETITION_OK,
  payload: concurso
})
const modificarConcursoError = () => ({
  type: UPDATE_COMPETITION_ERROR
})

export const activarConcursoAction = (concurso) => {
  return async (dispatch) => {
    dispatch(activarConcurso());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.post(`/competition/active/${concurso._id}`);
      const data = response.data;
      Notification(data.ok,data.msg);
      dispatch(activarConcursoOk(data.competition));
    } catch (error) {
      console.log(error.response);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(activarConcursoError());
    }
  }
}

const activarConcurso = () => ({
  type: ACTIVE_COMPETITION
})
const activarConcursoOk = (concurso) => ({
  type: ACTIVE_COMPETITION_OK,
  payload: concurso
})
const activarConcursoError = () => ({
  type: ACTIVE_COMPETITION_ERROR
})
