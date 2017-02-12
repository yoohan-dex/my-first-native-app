import type { Action } from './types';

export const GET_SMS_MESSAGE = 'GET_SMS_MESSAGE';

export function getSmsMessage(phone: number): Action {
  return {
    type: GET_SMS_MESSAGE,
    phone,
  };
}
