import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { MOBILE_LOGIN, LOGIN_FAIL, loginFullfill } from '../actions/login';
import { setUser } from '../actions/global';
import { saveUser } from '../actions/user';

import api from '../api';


function* mobileLogin(action) {
  try {
    const result = yield call(api.mobileLogin, action.form);
    if (result) {
      yield put(loginFullfill());
      yield put(saveUser(action.form.phone, action.form.password));
      yield put(setUser(action.form.phone));
    }
  } catch ({ message }) {
    yield put({ type: LOGIN_FAIL, message });
  }
}

function* mySaga() {
  yield takeEvery(MOBILE_LOGIN, mobileLogin);
}
export default mySaga;
