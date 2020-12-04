import {
  GET_CATEGORIES,
  GET_CATEGORIES_OK,
  GET_CATEGORIES_ERROR
} from '../types';
import Notification from '../../components/UiElements/Notification';
import clienteAxios from '../../config/clienteAxios';
import {tokenAuthAdmin} from '../../config/token';
export const getCategoriesAction = () => {
  return async (dispatch) => {
    dispatch(getCategories());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/categories');
      const data = response.data;
      dispatch(getCategoriesOk(data.categories));
    } catch (error) {
      dispatch(getCategoriesError());
    }
  }
}

const getCategories = () => ({
  type: GET_CATEGORIES
})
const getCategoriesOk = (categories) => ({
  type: GET_CATEGORIES_OK,
  payload: categories
})
const getCategoriesError = () => ({
  type: GET_CATEGORIES_ERROR
})