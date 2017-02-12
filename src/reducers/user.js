import type { Action } from '../actions/types';
import { SAVE_USER, DELETE_USER } from '../actions/user';


export type State = {
  user: string,
  passwrod: string,
}
const initialState = {
  user: '',
  password: '',
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user,
        passwrod: action.password,
      };
    case DELETE_USER:
      return {
        ...state,
        user: '',
        passwrod: '',
      };
    default:
      return state;
  }
}
