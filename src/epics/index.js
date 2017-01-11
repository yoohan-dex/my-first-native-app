// @flow
import { combineEpics } from 'redux-observable';

import { timingStart, timingFinish } from './smsTiming';

export default combineEpics(
  timingStart,
  timingFinish,
);
