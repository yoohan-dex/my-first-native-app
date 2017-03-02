import { Action } from './types';


export const REMOVE_ERROR = 'REMOVE_ERROR';
export const SET_USER = 'SET_USER';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export function removeError(): Action {
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

export function removeMessage(): Action {
  return ({
    type: REMOVE_MESSAGE,
  });
}
