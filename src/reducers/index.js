import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import user from './user';
import cardNavigation from './cardNavigation';
import forSMS from './forSMS';
import register from './register';
import mobileLogin from './login';
import global from './global';
import carList from './carList';
import action from './action';
import home from './home';
import reset from './reset';
import bindPhone from './bindPhone';

export default combineReducers({
  app,
  form: formReducer,
  user,
  forSMS,
  cardNavigation,
  register,
  mobileLogin,
  global,
  carList,
  action,
  home,
  reset,
  bindPhone,
});
