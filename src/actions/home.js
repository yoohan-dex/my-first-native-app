import { Action } from './types';

export const CHANGE_HOME_STATE = 'CHANGE_HOME_STATE';

export function changeHomeState(state: 'home' | 'list' | 'account'): Action {
  return ({
    type: CHANGE_HOME_STATE,
    state,
  });
}
