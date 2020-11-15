import {
  FILE_SALE,
  FILE_SALE_OK,
  FILE_SALE_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  data: null
}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_SALE:
      return {
        ...state,
        loading: false,
        error: false
      }
    case FILE_SALE_OK:
      return {
        ...state,
        loading: false,
        error: false,
      }
    case FILE_SALE_ERROR:
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