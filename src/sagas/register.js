import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REGISTER_ERROR, REGISTER_FULLFILL, MOBILE_REGISTER } from '../actions/register';
import { saveUser } from '../actions/user';
import { setUser } from '../actions/global';

import api from '../api';


function* mobileregister(action) {
  try {
    const result = yield call(api.mobileRegister, action.form);
    if (result) {
      yield put(saveUser(action.form.phone, action.form.password));
      yield put(setUser(action.form.phone));
      yield put({ type: REGISTER_FULLFILL });
    }
  } catch ({ message }) {
    yield put({ type: REGISTER_ERROR, message });
  }
}

function* mySaga() {
  yield takeEvery(MOBILE_REGISTER, mobileregister);
}
export default mySaga;
