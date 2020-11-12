import {
  LOGIN_USER,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  USER_LOG,
  USER_LOG_OK,
  USER_LOG_ERROR,
  LOGOUT_USER
} from '../types';
const initialState = {
  auth: localStorage.getItem('token') ? true : false,
  user : null,
  loading: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case USER_LOG:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_USER_OK:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        auth: true
      }
    case LOGIN_USER_ERROR:
      // localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        auth: false,
        error: action.payload
      }
    case USER_LOG_OK:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        auth: true
      }
    case USER_LOG_ERROR:
      return {
        ...state,
        loading: false,
        auth: false,
        error: action.payload
      }
    case LOGOUT_USER:
      return {
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