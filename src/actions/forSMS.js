// @flow
import type { Action } from './types';

export const SMS_TIMING_START = 'SMS_TIMING_START';
export const SMS_TIMING_CONTINUE = 'SMS_TIMING_CONTINUE';
export const SMS_TIMING_FINISH = 'SMS_TIMING_FINISH';

export function startSMSTiming(second: number): Action {
  return {
    type: SMS_TIMING_START,
    second,
  };
}

export function continueSMSTiming(): Action {
  return {
    type: SMS_TIMING_CONTINUE,
  };
}

export function finishSMSTiming(): Action {
  return {
    type: SMS_TIMING_FINISH,
  };
}


