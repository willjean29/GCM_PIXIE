import {
  LOGIN_USER,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR
} from '../types';

export const loginUserAction = (userData) => {
  return async (dispatch) => {
    console.log(userData);
    dispatch(loginUser());
    try {
      dispatch(loginUserOk(userData));
    } catch (error) {
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
  type: LOGIN_USER_ERROR,
  payload: true
})