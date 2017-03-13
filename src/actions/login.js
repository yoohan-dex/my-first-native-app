import { Login, Action } from './types';

export const MOBILE_LOGIN = 'MOBILE_LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_FULLFILL = 'LOGIN_FULLFILL';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const WECHAT_LOGIN = 'WECHAT_LOGIN';
export const WECHAT_LOGIN_SUCCEED = 'WECHAT_LOGIN_SUCCEED';
export const WECHAT_LOGIN_FAILED = 'WECHAT_LOGIN_FAILED';
export const WECHAT_AUTO_LOGIN = 'WECHAT_AUTO_LOGIN';
export const RELOGIN = 'RELOGIN';

export function mobileLogin(form: Login): Action {
  return ({
    type: MOBILE_LOGIN,
    form,
  });
}
export function loginFail(message: string): Action {
  return ({
    type: LOGIN_FAIL,
    message,
  });
}
export function loginFullfill(): Action {
  return ({
    type: LOGIN_FULLFILL,
  });
}

export function logout(): Action {
  return ({
    type: LOGOUT,
  });
}

export function logoutFulfill(): Action {
  return ({
    type: LOGOUT_SUCCESS,
  });
}

export function wechatLogin(): Action {
  return ({
    type: WECHAT_LOGIN,
  });
}

export function wechatAutoLogin(account: String, token: String): Action {
  return ({
    type: WECHAT_AUTO_LOGIN,
    account,
    token,
  });
}

export function wechatLoginSucceed(account: String, token: String): Action {
  return ({
    type: WECHAT_LOGIN_SUCCEED,
    account,
    token,
  });
}

export function wechatLoginFailed(message: String) {
  return ({
    type: WECHAT_LOGIN_FAILED,
    message,
  });
}

export function relogin(): Action {
  return ({
    type: RELOGIN,
  });
}
