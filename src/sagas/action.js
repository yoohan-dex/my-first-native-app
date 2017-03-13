import { call, put, takeEvery, takeLatest, fork, take } from 'redux-saga/effects';

import {
  CONFIRM_RECEIVE_PASSENGER,
  CONFIRM_ARRIVAL,
  CANCEL_ITEM,
  receiveSucceed,
  arrivalSucceed,
  cancelSucceed,
  BIND_PHONE,
  bindPhoneFailed,
  bindPhoneSucceed,
} from '../actions/action';
import {
  relogin,
} from '../actions/login';

import {
  getItemDetail,
} from '../actions/carList';

import api from '../api';
import moment from '../utils/moment';
import parseState from '../utils/parseState';

function* receive() {
  while (true) {
    const action = yield take(CONFIRM_RECEIVE_PASSENGER);
    const { id, longitude, latitude } = action;
    try {
      yield call(api.action.receivedPassenger, id, longitude, latitude);
      yield put(getItemDetail(id));
      yield put(receiveSucceed());
    } catch ({ message }) {
      console.log(message);
      yield put(receiveSucceed());
    }
  }
}

function* arrival() {
  while (true) {
    const action = yield take(CONFIRM_ARRIVAL);
    const { id, longitude, latitude } = action;
    try {
      yield call(api.action.arrivalConfirm, id, longitude, latitude);
      yield put(getItemDetail(id));
      yield put(arrivalSucceed());
    } catch ({ message }) {
      console.log(message);
      yield put(arrivalSucceed());
    }
  }
}

function* cancel() {
  while (true) {
    const action = yield take(CANCEL_ITEM);
    const { id } = action;
    try {
      yield call(api.action.cancelItem, id);
      yield put(getItemDetail(id));
      yield put(cancelSucceed());
    } catch ({ message }) {
      console.log(message);
      yield put(cancelSucceed());
    }
  }
}

function* bindPhone() {
  while (true) {
    const action = yield take(BIND_PHONE);
    const { phone, validCode } = action;
    try {
      yield call(api.action.bindPhone, phone, validCode);
      yield put(bindPhoneSucceed());
      yield put(relogin());
    } catch ({ message }) {
      yield put(bindPhoneFailed(message));
    }
  }
}

function* actions() {
  yield fork(bindPhone);
  yield fork(receive);
  yield fork(arrival);
  yield fork(cancel);
}

export default actions;
