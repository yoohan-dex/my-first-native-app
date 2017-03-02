import { call, put, takeEvery, takeLates, take, fork } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { purgeStoredState } from 'redux-persist';
import { actions } from 'react-native-navigation-redux-helpers';

import { driverState } from '../utils/parseState';

import {
  MOBILE_LOGIN,
  LOGIN_FAIL,
  loginFullfill,
  LOGOUT,
  logoutFulfill,
} from '../actions/login';
import { setUser } from '../actions/global';
import { saveUser } from '../actions/user';
import { appOnload } from '../actions/app';
import { changeHomeState } from '../actions/home';

import api from '../api';

const {
  replaceAt,
} = actions;

function* mobileLogin(action) {
  try {
    const result = yield call(api.mobileLogin, action.form);
    if (result) {
      const { KEY_DRIVER_STATE } = result.data;
      const state = driverState(KEY_DRIVER_STATE);
      yield put(appOnload());
      yield put(loginFullfill());
      yield put(saveUser(action.form.phone, action.form.password, state));
      yield put(setUser(action.form.phone));
    }
  } catch ({ message }) {
    yield put({ type: LOGIN_FAIL, message });
  }
}

function* logout() {
  while (true) {
    yield take(LOGOUT);
    yield purgeStoredState({ storage: AsyncStorage }, ['user', 'global']);
    yield put(logoutFulfill());
    yield put(changeHomeState('home'));
  }
}

function* mySaga() {
  yield fork(logout);
  yield takeEvery(MOBILE_LOGIN, mobileLogin);
}
export default mySaga;
