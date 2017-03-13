import { Action } from '../actions/types';

import {
  BIND_PHONE,
  BIND_PHONE_SUCCEED,
  BIND_PHONE_FAILED,
} from '../actions/action';

type State = {
  pending: Boolean,
  error: String,
  succeed: Boolean,
}

const initialState = {
  pending: false,
  error: '',
  succeed: false,
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case BIND_PHONE:
      return {
        ...state,
        pending: true,
        error: '',
      };
    case BIND_PHONE_FAILED:
      return {
        ...state,
        error: action.message,
        pending: false,
      };
    case BIND_PHONE_SUCCEED:
      return {
        ...state,
        error: '',
        pending: false,
        succeed: true,
      };
    default:
      return state;
  }
}
