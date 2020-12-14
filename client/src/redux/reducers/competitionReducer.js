import {
  REGISTER_COMPETITION,
  REGISTER_COMPETITION_OK,
  REGISTER_COMPETITION_ERROR,
  GET_COMPETITION,
  GET_COMPETITION_OK,
  GET_COMPETITION_ERROR,
  COMPETITION_IMAGE,
  COMPETITION_IMAGE_OK,
  COMPETITION_IMAGE_ERROR,
  UPDATE_COMPETITION,
  UPDATE_COMPETITION_OK,
  UPDATE_COMPETITION_ERROR,
  ACTIVE_COMPETITION,
  ACTIVE_COMPETITION_OK,
  ACTIVE_COMPETITION_ERROR
} from '../types';

const initialState = {
  loading: null,
  error: null,
  data: null
}

const competitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_COMPETITION: 
    case GET_COMPETITION:
    case COMPETITION_IMAGE:
    case UPDATE_COMPETITION:
    case ACTIVE_COMPETITION:
      return {
        ...state,
        loading: true
      }
    case REGISTER_COMPETITION_OK: 
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_COMPETITION_OK:
    case COMPETITION_IMAGE_OK:
    case UPDATE_COMPETITION_OK:
    case ACTIVE_COMPETITION_OK:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      }
    case REGISTER_COMPETITION_ERROR: 
    case GET_COMPETITION_ERROR:
    case COMPETITION_IMAGE_ERROR:
    case UPDATE_COMPETITION_ERROR:
    case ACTIVE_COMPETITION_ERROR:
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