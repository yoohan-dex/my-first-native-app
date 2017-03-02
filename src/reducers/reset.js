// @flow
import { Action } from '../actions/types';
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCEED,
} from '../actions/reset';
import {
  REMOVE_MESSAGE,
} from '../actions/global';

type State = {
  pending: boolean,
  succeed: boolean,
  error: string,
}

const initialState = {
  pending: false,
  succeed: false,
  error: '',
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        pending: true,
      };
    case RESET_PASSWORD_SUCCEED:
      return {
        ...state,
        pending: false,
        succeed: true,
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        pending: false,
        succeed: false,
        error: '',
      };
    default:
      return state;
  }
}
