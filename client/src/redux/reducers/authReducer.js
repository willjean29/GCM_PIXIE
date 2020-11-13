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
  loading: false,
  error: false,
  auth: localStorage.getItem('access-token-admin') ? true : false,
  admin: null
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
    case USER_LOG_OK:
      return {
        ...state,
        loading: false,
        admin: action.payload,
        auth: true,
        error: false
      }
    case LOGIN_USER_ERROR:
    case USER_LOG_ERROR:
      // localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        auth: false,
        error: true
      }
    default:
      return state
  }
}

export default authReducer;