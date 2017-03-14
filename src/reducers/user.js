import { Action } from '../actions/types';
import { SAVE_USER, DELETE_USER, SAVE_WECHAT_USER } from '../actions/user';
import { LOGOUT_SUCCESS } from '../actions/login';
import { BIND_WECHAT_SUCCEED, FETCH_BALANCE_SUCCEED } from '../actions/action';

export type State = {
  user: String,
  password: String,
  state: String,
  account: String,
  token: String,
  bind: Boolean,
  userType: '' | 'wechat' | 'phone',
  id: Number,
  total: Number,
  withdrawMoney: Number,
}
const initialState = {
  userType: '',
  user: '',
  password: '',
  state: '',
  account: '',
  token: '',
  bind: '',
  id: '',
  total: '',
  withdrawMoney: '',
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user,
        password: action.password,
        state: action.state,
        userType: 'phone',
        bind: action.bind,
        id: action.id,
      };
    case SAVE_WECHAT_USER:
      return {
        ...state,
        account: action.account,
        token: action.token,
        state: action.state,
        bind: action.bind,
        userType: 'wechat',
        id: action.id,
      };
    case BIND_WECHAT_SUCCEED:
      return {
        ...state,
        bind: true,
      };
    case FETCH_BALANCE_SUCCEED:
      return {
        ...state,
        total: action.total,
        withdrawMoney: action.withdrawMoney,
      };
    case DELETE_USER:
      return initialState;
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
