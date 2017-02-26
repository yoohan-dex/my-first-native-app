import { Form, Action, CarInfo, PersonCard } from './types';

export const MOBILE_REGISTER = 'MOBILE_REGISTER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_FULLFILL = 'REGISTER_FULLFILL';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_PERSONAL_MESSAGE = 'UPLOAD_PERSONAL_MESSAGE';
export const UPLOAD_CAR_MESSAGE = 'UPLOAD_CAR_MESSAGE';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';
export const GET_AREA_LIST = 'GET_AREA_LIST';
export const GET_AREA_LIST_SUCCESS = 'GET_AREA_LIST_SUCCESS';
export const SET_AREA = 'SET_AREA';

type Type = 'carImage' | 'idcardImage' | 'idcardOppositeImage' | 'drivinglicenceImage' | 'vehiclelicenceImage';

export function mobileRegister(form: Form): Action {
  return ({
    type: MOBILE_REGISTER,
    form,
  });
}
export function registerError(message: string): Action {
  return ({
    type: REGISTER_ERROR,
    message,
  });
}
export function registerFullfill(): Action {
  return ({
    type: REGISTER_FULLFILL,
  });
}

export function uploadImage(imageType: Type, uri: string): Action {
  return ({
    type: UPLOAD_IMAGE,
    imageType,
    uri,
  });
}

export function uploadCar(form: CarInfo): Action {
  return ({
    type: UPLOAD_CAR_MESSAGE,
    form,
  });
}

export function uploadPersonalCard(form: PersonCard): Action {
  return ({
    type: UPLOAD_PERSONAL_MESSAGE,
    form,
  });
}

export function uploadSuccess() {
  return ({
    type: UPLOAD_SUCCESS,
  });
}

export function uploadFailed(message: string) {
  return ({
    type: UPLOAD_FAILED,
    message,
  });
}

export function getAreaList() {
  return ({ type: GET_AREA_LIST });
}

export function getAreaListSuccess(list: Array) {
  return {
    type: GET_AREA_LIST_SUCCESS,
    list,
  };
}

export function setArea(id: number) {
  return ({
    type: SET_AREA,
    id,
  });
}
