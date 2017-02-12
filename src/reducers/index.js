import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import cardNavigation from './cardNavigation';
import forSMS from './forSMS';
import register from './register';
import mobileLogin from './login';
import global from './global';

export default combineReducers({
  form: formReducer,
  user,
  forSMS,
  cardNavigation,
  register,
  mobileLogin,
  global,
});
