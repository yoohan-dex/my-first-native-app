import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REGISTER_ERROR, REGISTER_FULLFILL, MOBILE_REGISTER } from '../actions/register';
import api from '../api';


function* mobileregister(action) {
  try {
    console.log('reigstering');
    const result = yield call(api.mobileRegister, action.form);
    if (result) {
      console.log('fullfill:', result);
      yield put({ type: REGISTER_FULLFILL });
    }
  } catch ({ message }) {
    console.log(message);
    yield put({ type: REGISTER_ERROR, message });
  }
}

function* mySaga() {
  console.log('yes?');
  yield takeEvery(MOBILE_REGISTER, mobileregister);
}
export default mySaga;
