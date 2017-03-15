import { call, put, takeEvery, takeLates, take, fork } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { purgeStoredState, getStoredState } from 'redux-persist';
import * as wechat from 'react-native-wechat';
import { actions } from 'react-native-navigation-redux-helpers';

import { driverState } from '../utils/parseState';

import {
  MOBILE_LOGIN,
  LOGIN_FAIL,
  loginFullfill,
  LOGOUT,
  logoutFulfill,
  WECHAT_LOGIN,
  wechatLoginFailed,
  RELOGIN,
  WECHAT_AUTO_LOGIN,
} from '../actions/login';

import { setUser } from '../actions/global';
import { saveUser, saveWechatUser } from '../actions/user';
import { appOnload } from '../actions/app';
import { changeHomeState } from '../actions/home';

import api from '../api';

const { reset } = actions;

function* mobileLogin(action) {
  try {
    const result = yield call(api.mobileLogin, action.form);
    if (result) {
      const { KEY_DRIVER_STATE, KEY_DRIVER_ID: id, KEY_WECHAT_BINDING_RESULT: bind } = result.data;
      const state = driverState(KEY_DRIVER_STATE);
      yield put(appOnload());
      yield put(loginFullfill());
      yield put(saveUser(action.form.phone, action.form.password, state, bind, id));
      yield put(setUser(action.form.phone));
    }
  } catch ({ message }) {
    yield put({ type: LOGIN_FAIL, message });
  }
}

function* wechatLogin() {
  while (true) {
    try {
      yield take(WECHAT_LOGIN);
      const isInstalled = yield wechat.isWXAppInstalled();
      if (isInstalled) {
        const code = yield wechat.sendAuthRequest('snsapi_userinfo');
        const res = yield api.login.getWechatAccount(code);
        const { KEY_PRINCIPAL: account, KEY_TEMP_CODE_TOKEN: token } = res.data;
        if (account && token) {
          const result = yield api.login.wechatLogin(account, token);
          const { KEY_DRIVER_STATE, KEY_PHONE_BINDING_RESULT: bind, KEY_DRIVER_ID: id } = result.data;
          const state = driverState(KEY_DRIVER_STATE);
          yield put(appOnload());
          yield put(loginFullfill());
          yield put(saveWechatUser(account, token, state, bind, id));
        }
      } else {
        yield put(wechatLoginFailed('你还没有安装微信'));
      }
    } catch ({ message }) {
      Alert.alert(message);
    }
  }
}

function* wechatAutoLogin() {
  while (true) {
    const action = yield take(WECHAT_AUTO_LOGIN);
    try {
      const { account, token } = action;
      if (account && token) {
        const result = yield api.login.wechatLogin(account, token);
        const { KEY_DRIVER_STATE, KEY_PHONE_BINDING_RESULT: bind } = result.data;
        const state = driverState(KEY_DRIVER_STATE);
        yield put(appOnload());
        yield put(loginFullfill());
        yield put(saveWechatUser(account, token, state, bind));
      }
    } catch ({ message }) {
      yield put({ type: LOGIN_FAIL, message });
    }
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

function* relogin() {
  while (true) {
    yield take(RELOGIN);
    const states = yield getStoredState({ storage: AsyncStorage });
    const { account, token } = states.user;
    try {
      if (account && token) {
        const result = yield api.login.wechatLogin(account, token);
        const { KEY_DRIVER_STATE, KEY_PHONE_BINDING_RESULT: bind } = result.data;
        const state = driverState(KEY_DRIVER_STATE);
        yield put(appOnload());
        yield put(loginFullfill());
        yield put(saveWechatUser(account, token, state, bind));
        yield put(reset([{
          key: 'home',
          index: 0,
        }], 'global'));
      }
    } catch (e) {
      // ...
    }
  }
}

function* mySaga() {
  yield fork(wechatAutoLogin);
  yield fork(relogin);
  yield fork(logout);
  yield fork(wechatLogin);
  yield takeEvery(MOBILE_LOGIN, mobileLogin);
}
export default mySaga;

