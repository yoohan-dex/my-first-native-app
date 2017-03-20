import { Action } from './types';

export const CHANGE_HOME_STATE = 'CHANGE_HOME_STATE';
export const INCREASE_ITEM_BADGE = 'INCREASE_ITEM_BADGE';
export const DECREASE_ITEM_BADGE = 'DECREASE_ITEM_BADGE';

export function changeHomeState(state: 'home' | 'list' | 'account'): Action {
  return ({
    type: CHANGE_HOME_STATE,
    state,
  });
}

export function increaseItemBadge(id: number): Action {
  return ({
    type: INCREASE_ITEM_BADGE,
    id,
  });
}

export function decreaseItemBadge(id: number): Action {
  return ({
    type: DECREASE_ITEM_BADGE,
    id,
  });
}
