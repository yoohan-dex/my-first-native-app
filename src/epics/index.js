// @flow
import { combineEpics } from 'redux-observable';

import { timingStart, timingFinish } from './smsTiming';
import { mobileRegister } from './register';
export default combineEpics(
  timingStart,
  timingFinish,
  mobileRegister,
);
