import { Action } from './types';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCEED = 'RESET_PASSWORD_SUCCEED';

export function resetPassword(phone: number, validCode: number, newPassword: string): Action {
  return ({
    type: RESET_PASSWORD,
    phone,
    validCode,
    newPassword,
  });
}

export function resetPasswordSucceed(): Action {
  return ({
    type: RESET_PASSWORD_SUCCEED,
  });
}
