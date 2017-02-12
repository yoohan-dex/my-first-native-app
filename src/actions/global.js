import { Action } from './types';


export const REMOVE_ERROR = 'REMOVE_ERROR';
export const SET_USER = 'SET_USER';

export function removeError(): Action {
  console.log('removeError');
  return ({
    type: REMOVE_ERROR,
  });
}

export function setUser(user: string): Action {
  return ({
    type: SET_USER,
    user,
  });
}
