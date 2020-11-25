import {combineReducers} from 'redux';
import authReducer from './authReducer';
import newAdminReducer from './newAdminReducer';
import newBusinessReducer from './newBusinessReducer';
import businessReducer from './businessReducer';
import fileReducer from './fileReducer';
import competitionReducer from './competitionReducer';

export default combineReducers({
  authentication :authReducer,
  newAdmin: newAdminReducer,
  newBusiness: newBusinessReducer,
  business: businessReducer,
  files: fileReducer,
  competition: competitionReducer
})