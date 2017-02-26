import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { MOBILE_LOGIN, LOGIN_FAIL, loginFullfill } from '../actions/login';
import { setUser } from '../actions/global';
import { saveUser } from '../actions/user';

import api from '../api';


function* mobileLogin(action) {
  try {
    console.log('im also running');
    console.log(action);
    const result = yield call(api.mobileLogin, action.form);
    console.log('next????');
    console.log(result);
    if (result) {
      yield put(loginFullfill());
      console.log('save?', action.form.phone);
      console.log('save?', action.form.password);
      yield put(saveUser(action.form.phone, action.form.password));
      yield put(setUser(action.form.phone));
    }
  } catch ({ message }) {
    yield put({ type: LOGIN_FAIL, message });
  }
}

function* mySaga() {
  console.log('i m running');
  yield takeEvery(MOBILE_LOGIN, mobileLogin);
}
export default mySaga;
