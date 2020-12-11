import {
  FILE_SALE,
  FILE_SALE_OK,
  FILE_SALE_ERROR,
  GET_FILES,
  GET_FILES_OK,
  GET_FILES_ERROR,
  FILE_DETAIL,
  FILE_DETAIL_OK,
  FILE_DETAIL_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  data: null,
  fileCurret: null
}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_SALE:
    case GET_FILES:
    case FILE_DETAIL:
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
    case FILE_DETAIL_OK: 
      return {
        ...state,
        loading: false,
        error: false,
        fileCurret: action.payload
      }
    case FILE_SALE_ERROR:
    case GET_FILES_ERROR:
    case FILE_DETAIL_ERROR:
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