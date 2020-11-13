import {combineReducers} from 'redux';
import authReducer from './authReducer';
import newAdminReducer from './newAdminReducer';
export default combineReducers({
  authentication :authReducer,
  newAdmin: newAdminReducer,
})