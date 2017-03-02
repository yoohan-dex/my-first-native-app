import { Action } from '../actions/types';
import { SET_USER } from '../actions/global';
import { LOGOUT_SUCCESS } from '../actions/login';

type State = {
  user: string,
}

const initialState = {
  user: '',
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: '',
      };
    default:
      return state;
  }
}
