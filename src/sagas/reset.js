import { call, put, fork, take } from 'redux-saga/effects';

import {
  RESET_PASSWORD,
  resetPasswordSucceed,
} from '../actions/reset';


import api from '../api';


function* resetPassword() {
  while (true) {
    const action = yield take(RESET_PASSWORD);
    try {
      const { phone, validCode, newPassword } = action;
      yield call(api.reset.resetPassword, phone, validCode, newPassword);
      yield put(resetPasswordSucceed());
    } catch (e) {
      console.log(e);
    }
  }
}

function* resetSaga() {
  yield fork(resetPassword);
}

export default resetSaga;
