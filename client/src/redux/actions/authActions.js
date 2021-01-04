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
  ADMIN_UPDATE_ERROR,
  ADMIN_IMAGE,
  ADMIN_IMAGE_OK,
  ADMIN_IMAGE_ERROR
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
      dispatch(userLogOk(data.admin));
    } catch (error) {
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

export const actualizarAdminAction = (dataAdmin) => {
  return async (dispatch) => {
    dispatch(actualizarAdmin());
    tokenAuthAdmin()
    try {
      const response = await clienteAxios.put('/admin',dataAdmin);
      const data = response.data;
      dispatch(actualizarAdminOk(data.administrator));
      Notification(data.ok,data.msg);
    } catch (error) {
      console.log(error);
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(actualizarAdminError());  
    }
  }
}

const actualizarAdmin = () => ({
  type: ADMIN_UPDATE
})
const actualizarAdminOk = (user) => ({
  type: ADMIN_UPDATE_OK,
  payload: user
})
const actualizarAdminError = () => ({
  type: ADMIN_UPDATE_ERROR
})

export const avatarAdminAction = (dataImage) => {
  return async (dispatch) => {
    dispatch(avatarAdmin());
    tokenAuthAdmin();
    try {
      const formData = new FormData();
      formData.append('image',dataImage.file);
      const response = await clienteAxios.put('/admin/avatar',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const data = response.data;
      Notification(data.ok,data.msg);
      dispatch(avatarAdminOk(data.administrator));
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(avatarAdminError());
    }

  }
}

const avatarAdmin = () => ({
  type: ADMIN_IMAGE
});
const avatarAdminOk = (user) => ({
  type: ADMIN_IMAGE_OK,
  payload: user
});
const avatarAdminError = () => ({
  type: ADMIN_IMAGE_ERROR
});

