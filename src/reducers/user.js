import { Action } from '../actions/types';
import { SAVE_USER, DELETE_USER } from '../actions/user';
import { LOGOUT_SUCCESS } from '../actions/login';


export type State = {
  user: string,
  password: string,
  state: string,
}
const initialState = {
  user: '',
  password: '',
  state: '',
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user,
        password: action.password,
        state: action.state,
      };
    case DELETE_USER:
      return {
        ...state,
        user: '',
        password: '',
        state: '',
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: '',
        password: '',
        state: '',
      };
    default:
      return state;
  }
}
