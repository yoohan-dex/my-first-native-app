import { call, put, takeEvery, takeLatest, fork, take } from 'redux-saga/effects';
import {
  REGISTER_FULLFILL,
  registerFullfill,
  MOBILE_REGISTER,
  UPLOAD_IMAGE,
  GET_AREA_LIST,
  UPLOAD_CAR_MESSAGE,
  UPLOAD_PERSONAL_MESSAGE,
  uploadSuccess,
  uploadFailed,
  registerError,
  getAreaListSuccess,
} from '../actions/register';
import { mobileLogin } from '../actions/login';

import api from '../api';


function* mobileregister() {
  while (true) {
    const action = yield take(MOBILE_REGISTER);
    try {
      const result = yield call(api.mobileRgister.register, action.form);
      if (result) {
        yield put(registerFullfill());
        yield put(mobileLogin({ phone: action.form.phone, password: action.form.password }));
      }
    } catch ({ message }) {
      yield put(registerError(message));
    }
  }
}

function* uploadMessage() {
  while (true) {
    const image = yield take(UPLOAD_IMAGE);
    try {
      const result = yield call(api.mobileRgister.uploadImage, image.imageType, image.uri);
      if (result) {
        yield put(uploadSuccess());
      }
    } catch ({ message }) {
      yield put(uploadFailed(message));
    }
  }
}

function* getArea() {
  while (true) {
    yield take(GET_AREA_LIST);
    try {
      const result = yield call(api.mobileRgister.getServiceAreaList);
      const list = result.data.KEY_LIST_MARKETAREAS;
      yield put(getAreaListSuccess(list));
    } catch ({ message }) {
      yield put(registerError(message));
    }
  }
}

function* uploadPerson() {
  while (true) {
    const action = yield take(UPLOAD_PERSONAL_MESSAGE);
    const { id, name } = action.form;
    try {
      yield call(api.mobileRgister.uploadPersonalCard, name, id);
    } catch (err) {
      yield put(registerError(err));
    }
  }
}

function* uploadCar() {
  while (true) {
    const action = yield take(UPLOAD_CAR_MESSAGE);
    const { id, brand, selectedArea } = action.form;
    try {
      yield call(api.mobileRgister.uploadCarInfo, id, brand, selectedArea);
    } catch (err) {
      yield put(registerError(err));
    }
  }
}

function* mySaga() {
  yield fork(mobileregister);
  yield fork(uploadPerson);
  yield fork(uploadCar);
  yield fork(uploadMessage);
  yield fork(getArea);
}
export default mySaga;
