import {
  DNI,
  DNI_OK,
  DNI_ERROR,
  TOKEN_MASTER,
  TOKEN_MASTER_OK,
  TOKEN_MASTER_ERROR,
  REGISTER_ADMIN,
  REGISTER_ADMIN_OK,
  REGISTER_ADMIN_ERROR
} from '../types';

const initialState = {
  loading: false,
  dataAdmin: null,
  error: false
}
const newAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_MASTER: 
    case DNI: 
    case REGISTER_ADMIN:
      return {
        ...state,
        loading: true
      }
    case TOKEN_MASTER_OK:
    case DNI_OK:
    case REGISTER_ADMIN_OK:
      return {
        ...state,
        loading: false,
        error: false,
        dataAdmin: action.payload ? action.payload: null
      }
    case TOKEN_MASTER_ERROR:
    case DNI_ERROR:
    case REGISTER_ADMIN_ERROR:
      return{
        ...state,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export default newAdminReducer;