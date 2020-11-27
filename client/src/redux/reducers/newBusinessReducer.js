import {
  RUC,
  RUC_OK,
  RUC_ERROR,
  REGISTER_BUSINESS,
  REGISTER_BUSINESS_OK,
  REGISTER_BUSINESS_ERROR
} from '../types';

const initialState = {
  loading: false,
  error: false,
  business: null
}

const newBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUC:
    case REGISTER_BUSINESS:
      return {
        ...state,
        loading: true
      }
    case RUC_OK:
    case REGISTER_BUSINESS_OK:
      return {
        ...state,
        loading: false,
        error: false,
        business: action.payload ? action.payload : null
      }
    case RUC_ERROR:
    case REGISTER_BUSINESS_ERROR:
      return {
        ...state,
        loading: false,
        error: false,
        business: null
      }
    default:
      return state;
  }
}

export default newBusinessReducer;
