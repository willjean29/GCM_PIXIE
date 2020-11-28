import {
  LOGIN_USER,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  USER_LOG,
  USER_LOG_OK,
  USER_LOG_ERROR,
  LOGOUT_USER,
  ADMIN_UPDATE,
  ADMIN_UPDATE_OK,
  ADMIN_UPDATE_ERROR
} from '../types';

const initialState = {
  auth: localStorage.getItem('access-token-admin') ? true : false,
  user : null,
  loading: null,
  error: null
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case USER_LOG:
    case ADMIN_UPDATE:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_USER_OK:
    case ADMIN_UPDATE_OK:
      return {
        ...state,
        loading: false,
        user: action.payload,
        auth: true
      }
    case LOGIN_USER_ERROR:
      // localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        auth: false,
        error: true
      }
    case ADMIN_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case USER_LOG_OK:
      return {
        ...state,
        loading: false,
        user: action.payload,
        auth: true
      }
    case USER_LOG_ERROR:
      return {
        ...state,
        loading: false,
        auth: false,
        error: true
      }
    case LOGOUT_USER:
      return {
        token: null,
        auth: false,
        user: null,
        loading: null,
        error: null
      }
    default:
      return state
  }
}

export default authReducer;