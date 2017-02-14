import { Action } from '../actions/types';
import { MOBILE_REGISTER, REGISTER_ERROR, REGISTER_FULLFILL } from '../actions/register';
import { REMOVE_ERROR } from '../actions/global';

type State = {
  pending: boolean,
  error: string,
  success: boolean,
}

const initialState: State = {
  pending: false,
  error: '',
  success: false,
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case MOBILE_REGISTER:
      return {
        ...state,
        pending: true,
        error: '',
      };
    case REGISTER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.message,
      };
    case REGISTER_FULLFILL:
      return {
        ...state,
        pending: false,
        success: true,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        pending: false,
        error: '',
      };
    default:
      return state;
  }
}
