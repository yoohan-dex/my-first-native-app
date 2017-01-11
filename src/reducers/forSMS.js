import type { Action } from '../actions/types';
import {
  SMS_TIMING_CONTINUE,
  SMS_TIMING_START,
  SMS_TIMING_FINISH,
} from '../actions/forSMS';

export type State = {
  available: boolean,
  timing: number,
};

const initialState = {
  available: true,
  timing: 0,
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SMS_TIMING_START:
      return {
        available: false,
        timing: action.second,
      };
    case SMS_TIMING_CONTINUE:
      return {
        ...state,
        timing: state.timing - 1,
      };
    case SMS_TIMING_FINISH:
      return {
        ...state,
        available: true,
      };
    default:
      return state;
  }
}
