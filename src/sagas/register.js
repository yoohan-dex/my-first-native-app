import { call, put, takeEvery, takeLatest, fork, take } from 'redux-saga/effects';
import {
  REGISTER_ERROR,
  REGISTER_FULLFILL,
  MOBILE_REGISTER,
  UPLOAD_IMAGE,
  GET_AREA_LIST,
  UPLOAD_CAR_MESSAGE,
  UPLOAD_PERSONAL_MESSAGE,
  uploadSuccess,
  uploadFailed,
  registerError,
  getAreaListSuccess,
  GET_AREA_LIST_SUCCESS,
} from '../actions/register';
import { saveUser } from '../actions/user';
import { setUser } from '../actions/global';

import api from '../api';


function* mobileregister(action) {
  try {
    const result = yield call(api.mobileRgister.register, action.form);
    if (result) {
      yield put(saveUser(action.form.phone, action.form.password));
      yield put(setUser(action.form.phone));
      yield put({ type: REGISTER_FULLFILL });
    }
  } catch ({ message }) {
    yield put(registerError(message));
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
    const a = yield take(GET_AREA_LIST);
    console.log('area: ', a);
    try {
      const result = yield call(api.mobileRgister.getServiceAreaList);
      const list = result.data.KEY_LIST_MARKETAREAS;
      console.log('list:', list);
      yield put(getAreaListSuccess(list));
    } catch ({ message }) {
      console.log(message);
      yield put(registerError(message));
    }
  }
}

function* uploadPerson() {
  while (true) {
    const action = yield take(UPLOAD_PERSONAL_MESSAGE);
    console.log(action.form);
    const { id, name } = action.form;
    console.log('id: ', id);
    console.log('name: ', name);
    try {
      yield call(api.mobileRgister.uploadPersonalCard, name, id);
    } catch (err) {
      yield put(registerError(err));
      console.log('error': err);
    }
  }
}

function* uploadCar() {
  while (true) {
    const action = yield take(UPLOAD_CAR_MESSAGE);
    const { id, brand, selectedArea } = action.form;
    try {
      const result = yield call(api.mobileRgister.uploadCarInfo, id, brand, selectedArea);
      console.log('hahha', result);
    } catch (err) {
      yield put(registerError(err));
      console.log('error': err);
    }
  }
}

function* mySaga() {
  yield fork(uploadPerson);
  yield fork(uploadCar);
  yield fork(uploadMessage);
  yield fork(getArea);
  yield takeEvery(MOBILE_REGISTER, mobileregister);
}
export default mySaga;
