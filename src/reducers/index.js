import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import cardNavigation from './cardNavigation';
import forSMS from './forSMS';

export default combineReducers({
  form: formReducer,
  user,
  forSMS,
  cardNavigation,
});
