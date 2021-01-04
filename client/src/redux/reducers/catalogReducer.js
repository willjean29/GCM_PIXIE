import {
  GET_CATEGORIES,
  GET_CATEGORIES_OK,
  GET_CATEGORIES_ERROR,
  REGISTER_CATALOG,
  REGISTER_CATALOG_OK,
  REGISTER_CATALOG_ERROR,
  GET_PRIZES,
  GET_PRIZES_OK,
  GET_PRIZES_ERROR,
  DELETE_PRIZE,
  DELETE_PRIZE_OK,
  DELETE_PRIZE_ERROR,
  UPDATE_PRIZE,
  UPDATE_PRIZE_OK,
  UPDATE_PRIZE_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  categories: [],
  prizes: null
}

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: 
    case REGISTER_CATALOG:
    case GET_PRIZES:
    case DELETE_PRIZE:
    case UPDATE_PRIZE:
      return {
        ...state,
        loading: true
      }
    case GET_CATEGORIES_OK:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: false
      }
    case REGISTER_CATALOG_OK:
    case DELETE_PRIZE_OK:
    case UPDATE_PRIZE_ERROR:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_PRIZES_OK:
      return {
        ...state,
        loading: false,
        error: false,
        prizes: action.payload
      }
    case GET_CATEGORIES_ERROR:
    case REGISTER_CATALOG_ERROR:
    case GET_PRIZES_ERROR:
    case DELETE_PRIZE_ERROR:
    case UPDATE_PRIZE_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export default catalogReducer;