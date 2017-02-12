import { Form, Action } from './types';

export const MOBILE_REGISTER = 'MOBILE_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_FULLFILL = 'REGISTER_FULLFILL';

export function mobileRegister(form: Form): Action {
  return ({
    type: MOBILE_REGISTER,
    form,
  });
}
export function registerError(message: string): Action {
  return ({
    type: REGISTER_ERROR,
    message,
  });
}
export function registerFullfill(): Action {
  return ({
    type: REGISTER_FULLFILL,
  });
}
