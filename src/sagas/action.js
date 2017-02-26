import { call, put, takeEvery, takeLatest, fork, take } from 'redux-saga/effects';

import {
  CONFIRM_RECEIVE_PASSENGER,
  CONFIRM_ARRIVAL,
  receiveSucceed,
  arrivalSucceed,
} from '../actions/action';

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

function* actions() {
  yield fork(receive);
  yield fork(arrival);
}

export default actions;
