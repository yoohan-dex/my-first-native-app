import { delay } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';
import wechat from 'react-native-wechat';
import { actions as routeActions } from 'react-native-navigation-redux-helpers';
import { Alert } from 'react-native';
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
  BIND_WECHAT,
  bindWechatFailed,
  bindWechatSucceed,
  FETCH_BALANCE,
  fetchBalance,
  fetchBalanceSucceed,
  WITHDRAW,
} from '../actions/action';
import {
  relogin,
} from '../actions/login';
import {
  changeHomeState,
} from '../actions/home';
import {
  getItemDetail,
} from '../actions/carList';

import api from '../api';

const { reset } = routeActions;

function* receive() {
  while (true) {
    const action = yield take(CONFIRM_RECEIVE_PASSENGER);
    const { id, longitude, latitude } = action;
    try {
      yield call(api.action.receivedPassenger, id, longitude, latitude);
      yield put(getItemDetail(id));
      yield put(receiveSucceed());
    } catch ({ message }) {
      yield put(receiveSucceed());
      yield delay(200);
      Alert.alert(message);
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
      yield put(arrivalSucceed());
      yield delay(200);
      Alert.alert(message);
    }
  }
}

function* cancel() {
  while (true) {
    const action = yield take(CANCEL_ITEM);
    const { id } = action;
    try {
      yield call(api.action.cancelItem, id);
      yield put(cancelSucceed());
      yield put(reset([{
        key: 'home',
        index: 0,
      }], 'global'));
      yield put(changeHomeState('home'));
    } catch ({ message }) {
      yield put(cancelSucceed());
      yield delay(200);
      Alert.alert(message);
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

function* bindWechat() {
  while (true) {
    yield take(BIND_WECHAT);
    let isInstalled;
    try {
      isInstalled = yield wechat.isWXAppInstalled();
    } catch (e) {
      // ...
    }
    if (isInstalled) {
      try {
        const code = yield wechat.sendAuthRequest('snsapi_userinfo');
        yield call(api.action.bindWechat, code);
        yield put(bindWechatSucceed());
      } catch ({ message }) {
        put(bindWechatFailed(message));
        Alert.alert('绑定失败', message);
      }
    } else {
      Alert.alert('绑定失败', '你可能还没有安装微信或者版本过低');
    }
  }
}

function* getBalance() {
  while (true) {
    yield take(FETCH_BALANCE);
    try {
      const data = yield call(api.action.fetchBalance);
      const { money, withdrawMoney } = data.data.KEY_DRIVERPOCKETPOJO;
      yield put(fetchBalanceSucceed(money, withdrawMoney));
    } catch ({ message }) {
      Alert.alert(message);
    }
  }
}

function* withdrawSaga() {
  while (true) {
    yield take(WITHDRAW);
    try {
      yield call(api.action.withdraw);
      Alert.alert('提现成功', '提现申请成功,平台将在1-2个工作日内处理提现,请再接再厉接单吧!!');
      yield put(fetchBalance());
    } catch ({ message }) {
      Alert.alert('提现失败', message);
      yield put(fetchBalance());
    }
  }
}

function* actions() {
  yield fork(bindWechat);
  yield fork(bindPhone);
  yield fork(receive);
  yield fork(arrival);
  yield fork(cancel);
  yield fork(getBalance);
  yield fork(withdrawSaga);
}

export default actions;
