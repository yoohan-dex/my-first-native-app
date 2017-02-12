import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { MOBILE_LOGIN, LOGIN_FAIL, LOGIN_FULLFILL } from '../actions/login';
import { SET_USER } from '../actions/global';
import api from '../api';


function* mobileLogin(action) {
  try {
    console.log('logining');
    const result = yield call(api.mobileLogin, action.form);
    if (result) {
      console.log('fullfill:', result);
      yield put({ type: LOGIN_FULLFILL });
      yield put({ type: SET_USER, user: action.form.phone });
    }
  } catch ({ message }) {
    console.log(message);
    yield put({ type: LOGIN_FAIL, message });
  }
}

function* mySaga() {
  console.log('login?');
  yield takeEvery(MOBILE_LOGIN, mobileLogin);
}
export default mySaga;
