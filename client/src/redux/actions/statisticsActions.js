import {
  DATA_DASHBOARD,
  DATA_DASHBOARD_OK,
  DATA_DASHBOARD_ERROR,
  DATA_GENERO,
  DATA_GENERO_OK,
  DATA_GENERO_ERROR,
  DATA_ESTADO,
  DATA_ESTADO_OK,
  DATA_ESTADO_ERROR,
  DATA_PUNTOS,
  DATA_PUNTOS_OK,
  DATA_PUNTOS_ERROR
} from '../types';

import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';

export const dataDashboardAction = () => {
  return async (dispatch) => {
    dispatch(dataDashboard());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios('/admin/data');
      const data = response.data;
      console.log(data);
      dispatch(dataDashboardOk(data.data));
    } catch (error) {
      console.log(error);
      dispatch(dataDashboardError());
    }
  }
}

const dataDashboard = () => ({
  type: DATA_DASHBOARD
})
const dataDashboardOk = (data) => ({
  type: DATA_DASHBOARD_OK,
  payload: data
})
const dataDashboardError = () => ({
  type: DATA_DASHBOARD_ERROR
})

export const dataGeneroAction = () => {
  return async (dispatch) => {
    dispatch(dataGenero());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios('/admin/status/genero');
      const data = response.data;
      console.log(data);
      dispatch(dataGeneroOk(data.dataGenero));	
    } catch (error) {
      console.log(error)
      dispatch(dataGeneroError());
    }
  }
}

const dataGenero = () => ({
  type: DATA_GENERO
})
const dataGeneroOk = (data) => ({
  type: DATA_GENERO_OK,
  payload: data
})
const dataGeneroError = () => ({
  type: DATA_GENERO_ERROR
})

export const dataEstadoAction = () => {
  return async (dispatch) => {
    dispatch(dataEstado());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/admin/status/estado');
      const data = response.data;
      console.log(data);
      dispatch(dataEstadoOk(data.dataEstado));
    } catch (error) {
      console.log(error);
      dispatch(dataEstadoError());
    }
  }
}

const dataEstado = () => ({
  type: DATA_ESTADO
})
const dataEstadoOk = (data) => ({
  type: DATA_ESTADO_OK,
  payload: data
})
const dataEstadoError = () => ({
  type: DATA_ESTADO_ERROR
})

export const dataPuntosAction = () => {
  return async (dispatch) => {
    dispatch(dataPuntos());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/admin/status/puntos');
      const data = response.data;
      console.log(data);
      dispatch(dataPuntosOk(data.dataPuntos))
    } catch (error) {
      console.log(error);
      dispatch(dataPuntosError());
    }
  }
}

const dataPuntos = () => ({
  type: DATA_PUNTOS
})
const dataPuntosOk = (data) => ({
  type: DATA_PUNTOS_OK,
  payload: data
})
const dataPuntosError = () => ({
  type: DATA_PUNTOS_ERROR
})