import {
  SMS_TIMING_START,
  SMS_TIMING_CONTINUE,
  continueSMSTiming,
  finishSMSTiming,
} from '../actions/forSMS';

export const timingStart = (action$, store) =>
  action$.ofType(SMS_TIMING_START, SMS_TIMING_CONTINUE)
  .filter(() => store.getState().forSMS.timing > 0)
  .delay(100)
  .mapTo(continueSMSTiming());

export const timingFinish = (action$, store) =>
  action$.ofType(SMS_TIMING_CONTINUE)
  .filter(() => store.getState().forSMS.timing <= 0)
  .mapTo(finishSMSTiming());
