import {
  LOGIN_USER,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  USER_LOG,
  USER_LOG_OK,
  USER_LOG_ERROR,
  LOGOUT_USER
} from '../types';
import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';
export const loginUserAction = (userData) => {
  return async (dispatch) => {
    dispatch(loginUser());
    try {
      const response = await clienteAxios.post('/admin/login',userData);
      const data = response.data;
      console.log(data);
      Notification(data.ok,data.msg);
      dispatch(loginUserOk(data.administrator));
      localStorage.setItem('access-token-admin',data.token);
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(loginUserError());   
    }
  }
}

const loginUser = () => ({
  type: LOGIN_USER
})
const loginUserOk = (user) => ({
  type: LOGIN_USER_OK,
  payload: user
})
const loginUserError = () => ({
  type: LOGIN_USER_ERROR
})

export const userLogAction = () => {

  return async (dispatch) => {
    dispatch(userLog());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/admin/auth');
      const data = response.data;
      // console.log(data);
      console.log(localStorage.getItem("access-token-admin"));
      dispatch(userLogOk(data.admin));
    } catch (error) {
      console.log(error.response)
      console.log(localStorage.getItem("access-token-admin"));

      dispatch(userLogError());
    }
  }
}

const userLog = () => ({
  type: USER_LOG
})

const userLogOk = (data) => ({
  type: USER_LOG_OK,
  payload: data
})

const userLogError = () => ({
  type: USER_LOG_ERROR
})

export const logoutUserAction = () => {
  return (dispatch) => {
    localStorage.removeItem('access-token-admin');
    dispatch(logoutUser());
  }
}

const logoutUser = () => ({
  type : LOGOUT_USER
})