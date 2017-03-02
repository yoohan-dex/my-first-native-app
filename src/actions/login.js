import { Login, Action } from './types';

export const MOBILE_LOGIN = 'MOBILE_LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_FULLFILL = 'LOGIN_FULLFILL';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
