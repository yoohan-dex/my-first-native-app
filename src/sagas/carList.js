import { call, put, takeEvery, takeLatest, fork, take } from 'redux-saga/effects';
import {
  getWaitingSucceed,
  getWaitingFailed,
  GET_WAITING,
  ROB_ITEM,
  robFailed,
  robSucceed,
  GET_UNFULFILLED_ITEMS,
  getUnfulfilledSucceed,
  GET_ITEM_DETAIL,
  getItemDetailSucceed,
} from '../actions/carList';

import api from '../api';
import moment from '../utils/moment';
import parseState from '../utils/parseState';

function* getWaitingList() {
  while (true) {
    yield take(GET_WAITING);
    try {
      const result = yield call(api.car.getWaiting);
      const car = result.data.cargroups;
      const list = car.map(v => ({
        start: v.beginLocation,
        end: v.finishLocation,
        time: moment(v.departureTime),
        money: v.price,
        id: v.carGroupId,
      }));
      yield put(getWaitingSucceed(list));
    } catch ({ message }) {
      yield put(getWaitingFailed(message));
    }
  }
}

function* robItem() {
  while (true) {
    console.log('running?>');
    const action = yield take(ROB_ITEM);
    console.log('ok start rob!');
    try {
      const res = yield call(api.car.robItem, action.id);
      console.log(res);
      yield put(robSucceed());
    } catch ({ message }) {
      console.log(message);
      yield put(robFailed());
    }
  }
}

function* getUnfulfilled() {
  while (true) {
    yield take(GET_UNFULFILLED_ITEMS);
    try {
      const result = yield call(api.car.getUnfulfilled);
      console.log(result);
      const car = result.data['12'];
      const list = car.map(v => ({
        start: v.station_beginName,
        end: v.station_finishName,
        time: moment(v.departureTime),
        dead: v.departureTime,
        money: v.fare,
        id: v.cargroup_orderId,
        state: parseState(v.order_state),
      }));
      console.log(list);
      yield put(getUnfulfilledSucceed(list));
    } catch ({ message }) {
      console.log(message);
    }
  }
}

function* getItemDetail() {
  while (true) {
    const action = yield take(GET_ITEM_DETAIL);
    console.log('action: ', action);
    try {
      const result = yield call(api.car.getItemDetail, action.id);
      console.log(result);
      const car = result.data['2'];
      console.log('car???: ', car);
      const detail = {
        start: car.station_beginName,
        end: car.station_finishName,
        state: parseState(car.order_state),
        time: moment(car.departureTime),
        dead: car.departureTime,
        passengers: car.passengerInfoPojos.map(v => ({
          portrait: v.headImgUrl,
          phone: v.mobilephoneNum,
          name: v.nickname,
          id: v.userId,
        })),
        createAt: car.createTime,
        money: car.fare,
        id: car.cargroup_orderId,
      };
      yield put(getItemDetailSucceed(detail));
      console.log(result);
    } catch ({ message }) {
      console.log(message);
    }
  }
}

function* carList() {
  yield fork(getWaitingList);
  yield fork(robItem);
  yield fork(getUnfulfilled);
  yield fork(getItemDetail);
}

export default carList;
