import {
  REGISTER_COMPETITION,
  REGISTER_COMPETITION_OK,
  REGISTER_COMPETITION_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  data: null
}

const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_COMPETITION: 
      return {
        ...state,
        loading: true
      }
    case REGISTER_COMPETITION_OK: 
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case REGISTER_COMPETITION_ERROR: 
      return {
        ...state,
        loading: false,
        error: true,
        data: null
      }
    default:
      return state;
  }
}

export default competitionReducer;