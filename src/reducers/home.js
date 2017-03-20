import { Action } from '../actions/types';
import {
  CHANGE_HOME_STATE,
  INCREASE_ITEM_BADGE,
  DECREASE_ITEM_BADGE,
} from '../actions/home';

type State = {
  tab: 'list' | 'home' | 'account',
  activeItems: [],
};

const initalState = {
  tab: 'home',
  activeItems: [],
};

export default function (state: State = initalState, action: Action) {
  switch (action.type) {
    case CHANGE_HOME_STATE:
      return {
        ...state,
        tab: action.state,
      };
    case INCREASE_ITEM_BADGE:
      return {
        ...state,
        activeItems: [...state.activeItems, action.id],
      };
    case DECREASE_ITEM_BADGE:
      return {
        ...state,
        activeItems: state.activeItems.filter(id => id !== action.id),
      };
    default:
      return state;
  }
}
