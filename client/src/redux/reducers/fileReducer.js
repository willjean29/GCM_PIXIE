import {
  FILE_SALE,
  FILE_SALE_OK,
  FILE_SALE_ERROR,
  GET_FILES,
  GET_FILES_OK,
  GET_FILES_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  data: null
}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_SALE:
    case GET_FILES:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_FILES_OK:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      }
    case FILE_SALE_OK:
      return {
        ...state,
        loading: false,
        error: false,
      }
    case FILE_SALE_ERROR:
    case GET_FILES_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
      }
    default:
      return state;
  }
}

export default fileReducer;