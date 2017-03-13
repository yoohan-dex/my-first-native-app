import { Action } from '../actions/types';
import {
  MOBILE_LOGIN,
  LOGIN_FAIL,
  LOGIN_FULLFILL,
  WECHAT_LOGIN,
  WECHAT_LOGIN_FAILED,
  WECHAT_LOGIN_SUCCEED,
} from '../actions/login';
import { REMOVE_ERROR } from '../actions/global';

type State = {
  pending: boolean,
  success: boolean,
  error: string,
};

const initialState = {
  pending: false,
  success: false,
  error: '',
  wechatError: '',
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case MOBILE_LOGIN:
      return {
        ...state,
        pending: true,
        error: '',
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.message,
        pending: false,
      };
    case LOGIN_FULLFILL:
      return {
        ...state,
        error: '',
        success: true,
        pending: false,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        pending: false,
        error: '',
      };
    case WECHAT_LOGIN:
      return {
        ...state,
        pending: true,
        error: '',
      };
    case WECHAT_LOGIN_SUCCEED:
      return {
        ...state,
        pending: false,
        error: '',
      };
    case WECHAT_LOGIN_FAILED:
      return {
        ...state,
        pending: false,
        wechatError: action.message,
      };
    default:
      return state;
  }
}
