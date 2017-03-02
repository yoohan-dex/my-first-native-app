// @flow
import { Action } from './types';

export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USER = 'GET_USER';

export function saveUser(user: string, password: string, state: string): Action {
  return {
    type: SAVE_USER,
    user,
    password,
    state,
  };
}
