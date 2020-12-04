import {
  GET_CATEGORIES,
  GET_CATEGORIES_OK,
  GET_CATEGORIES_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  categories: []
}

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: 
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
    case GET_CATEGORIES_ERROR:
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