import { Action } from '../actions/types';
import { CHANGE_HOME_STATE } from '../actions/home';

type State = {
  tab: 'list' | 'home' | 'account',
};

const initalState = {
  tab: 'home',
};

export default function (state: State = initalState, action: Action) {
  switch (action.type) {
    case CHANGE_HOME_STATE:
      return {
        ...state,
        tab: action.state,
      };
    default:
      return state;
  }
}
