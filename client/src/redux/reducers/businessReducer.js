import {
  BUSINESS_ADMIN,
  BUSINESS_ADMIN_OK,
  BUSINESS_ADMIN_ERROR,
  BUSINESS_EDIT,
  BUSINESS_EDIT_OK,
  BUSINESS_EDIT_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  data: null
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESS_ADMIN:
    case BUSINESS_EDIT:
      return {
        ...state,
        loading: true,
      }
    case BUSINESS_ADMIN_OK:
    case BUSINESS_EDIT_OK:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
      }
    case BUSINESS_ADMIN_ERROR:
    case BUSINESS_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
        data: null
      }
    default:
    return state;
  }
}

export default businessReducer;