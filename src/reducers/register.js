import { Action } from '../actions/types';
import { MOBILE_REGISTER, REGISTER_ERROR, REGISTER_FULLFILL } from '../actions/register';
import { REMOVE_ERROR } from '../actions/global';

type State = {
  registering: boolean,
  error: string,
  success: boolean,
}

const initialState: State = {
  registering: false,
  error: '',
  success: false,
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case MOBILE_REGISTER:
      return {
        ...state,
        registering: true,
        error: '',
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registering: false,
        error: action.message,
      };
    case REGISTER_FULLFILL:
      return {
        ...state,
        registering: false,
        success: true,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        registering: false,
        error: '',
      };
    default:
      return state;
  }
}
