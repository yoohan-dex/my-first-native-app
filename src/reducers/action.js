import { Action } from '../actions/types';

import {
  CONFIRM_RECEIVE_PASSENGER,
  CONFIRM_ARRIVAL,
  CONFIRM_ARRIVAL_SUCCEED,
  CONFIRM_RECEIVE_PASSENGER_SUCCEED,
} from '../actions/action';

type State = {
  pending: boolean,
}

const initialState = {
  pending: false,
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case CONFIRM_RECEIVE_PASSENGER:
    case CONFIRM_ARRIVAL:
      return {
        ...state,
        pending: true,
      };
    case CONFIRM_RECEIVE_PASSENGER_SUCCEED:
    case CONFIRM_ARRIVAL_SUCCEED:
      return {
        ...state,
        pending: false,
      };
    default:
      return state;
  }
}

