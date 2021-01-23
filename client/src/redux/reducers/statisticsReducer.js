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

const initialState = {
  loading: null,
  error: null,
  data: null,
  dataGenero: null,
  dataPuntos: null,
  dataEstado: null
}

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_DASHBOARD:
    case DATA_GENERO:
    case DATA_ESTADO:
    case DATA_PUNTOS:
      return {
        ...state,
        loading: true
      }
    case DATA_DASHBOARD_OK:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      }
    case DATA_GENERO_OK:
      return {
        ...state,
        dataGenero: action.payload,
        loading: false,
        error: false
      }
    case DATA_ESTADO_OK:
      return {
        ...state,
        dataEstado: action.payload,
        loading: false,
        error: false
      }
    case DATA_PUNTOS_OK:
      return {
        ...state,
        dataPuntos: action.payload,
        loading: false,
        error: false
      }
    case DATA_DASHBOARD_ERROR:
    case DATA_GENERO_ERROR:
    case DATA_ESTADO_ERROR:
    case DATA_PUNTOS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export default statisticsReducer;