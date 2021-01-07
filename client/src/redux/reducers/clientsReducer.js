import {
  UPLOAD_CLIENTS,
  UPLOAD_CLIENTS_OK,
  UPLOAD_CLIENTS_ERROR
} from '../types';

const initialState = {
  error: false,
  loading: false,
  activeClients: [],
  inactiveClients: []
}

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_CLIENTS:
      return {
        ...state,
        loading: true,
      }
    case UPLOAD_CLIENTS_OK:
      return {
        ...state,
        loading: false,
        error: false,
        activeClients: action.payload.actives,
        inactiveClients: action.payload.inactives
      }
    case UPLOAD_CLIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export default clientsReducer;