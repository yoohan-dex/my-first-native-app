import { delay } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  RESET_PASSWORD,
  resetPasswordSucceed,
} from '../actions/reset';

import { mobileLogin } from '../actions/login';

import api from '../api';


function* resetPassword() {
  while (true) {
    const action = yield take(RESET_PASSWORD);
    try {
      const { phone, validCode, newPassword } = action;
      yield call(api.reset.resetPassword, phone, validCode, newPassword);
      yield put(resetPasswordSucceed());
      yield delay(200);
      yield put(mobileLogin({ phone, password: newPassword }));
    } catch ({ message }) {
      Alert.alert(message);
    }
  }
}

function* resetSaga() {
  yield fork(resetPassword);
}

export default resetSaga;
