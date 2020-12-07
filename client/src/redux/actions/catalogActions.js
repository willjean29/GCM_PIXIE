import {
  GET_CATEGORIES,
  GET_CATEGORIES_OK,
  GET_CATEGORIES_ERROR,
  REGISTER_CATALOG,
  REGISTER_CATALOG_OK,
  REGISTER_CATALOG_ERROR,
  GET_PRIZES,
  GET_PRIZES_OK,
  GET_PRIZES_ERROR
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

export const registerCatalogAction = (dataCatalog) => {
  return async (dispatch) => {
    dispatch(registerCatalog())
    tokenAuthAdmin();
    try {
      const dataform = new FormData();
      for (const itemCatalog of dataCatalog) {
        dataform.append('image',itemCatalog.image);
        dataform.append('nombre',itemCatalog.nombre);
        dataform.append('precio',itemCatalog.precio);
        dataform.append('puntos',itemCatalog.puntos);
        dataform.append('categoria',itemCatalog.categoria);
        dataform.append('descripcion',itemCatalog.descripcion);
      }
      const response = await clienteAxios.post('/catalog/register',dataform,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      const data = response.data;
      Notification(data.ok,data.msg);
      dispatch(registerCatalogOk());
    } catch (error) {
      const msg = error.response.data ? error.response.data.err.msg : "Hubo un error";
      Notification(error.response.data.ok,msg);
      dispatch(registerCatalogError());
    }

  }
}

const registerCatalog = () => ({
  type: REGISTER_CATALOG
})
const registerCatalogOk = () => ({
  type: REGISTER_CATALOG_OK
})
const registerCatalogError = () => ({
  type: REGISTER_CATALOG_ERROR
})

export const obtenerPremiosAction = () => {
  return async (dispatch) => {
    dispatch(obtenerPremios());
    tokenAuthAdmin();
    try {
      const response = await clienteAxios.get('/prize');
      const data = response.data;
      dispatch(obtenerPremiosOk(data.premios));
    } catch (error) {
      console.log(error.response);
      dispatch(obtenerPremiosError());
    }
  }
}

const obtenerPremios = () => ({
  type: GET_PRIZES
})
const obtenerPremiosOk = (premios) => ({
  type: GET_PRIZES_OK,
  payload: premios
})
const obtenerPremiosError = () => ({
  type: GET_PRIZES_ERROR
})
