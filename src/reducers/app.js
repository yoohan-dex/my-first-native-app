import { Action } from '../actions/types';

import { APP_ONLOAD } from '../actions/app';
import { LOGOUT_SUCCESS, LOGIN_FAIL } from '../actions/login';

type State = {
  login: Boolean,
  error: String,
}

const initialState = {
  login: false,
  error: '',
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case APP_ONLOAD:
      return {
        ...state,
        login: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        login: false,
        error: action.message,
      };
    default:
      return state;
  }
}
