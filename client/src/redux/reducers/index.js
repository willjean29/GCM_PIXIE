import {combineReducers} from 'redux';
import authReducer from './authReducer';
import newAdminReducer from './newAdminReducer';
import newBusinessReducer from './newBusinessReducer';
export default combineReducers({
  authentication :authReducer,
  newAdmin: newAdminReducer,
  newBusiness: newBusinessReducer,
})