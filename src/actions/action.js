import { Action } from './types';

export const CONFIRM_RECEIVE_PASSENGER = 'CONFIRM_RECEIVE_PASSENGER';
export const CONFIRM_ARRIVAL = 'CONFIRM_ARRIVAL';
export const CONFIRM_RECEIVE_PASSENGER_SUCCEED = 'CONFIRM_RECEIVE_PASSENGER_SUCCEED';
export const CONFIRM_ARRIVAL_SUCCEED = 'CONFIRM_ARRIVAL_SUCCEED';
export const CANCEL_ITEM = 'CANCEL_ITEM';
export const CANCEL_ITEM_SUCCEED = 'CANCEL_ITEM_SUCCEED';
export const BIND_PHONE = 'BIND_PHONE';
export const BIND_PHONE_FAILED = 'BIND_PHONE_FAILED';
export const BIND_PHONE_SUCCEED = 'BIND_PHONE_SUCCEED';

export function receive(id: Number, longitude: Number, latitude: Number): Action {
  return ({
    type: CONFIRM_RECEIVE_PASSENGER,
    id,
    latitude,
    longitude,
  });
}

export function arrival(id: Number, longitude: Number, latitude: Number): Action {
  return ({
    type: CONFIRM_ARRIVAL,
    id,
    latitude,
    longitude,
  });
}

export function receiveSucceed(): Action {
  return ({
    type: CONFIRM_RECEIVE_PASSENGER_SUCCEED,
  });
}

export function arrivalSucceed(): Action {
  return ({
    type: CONFIRM_ARRIVAL_SUCCEED,
  });
}

export function cancel(id: Number): Action {
  return ({
    type: CANCEL_ITEM,
    id,
  });
}

export function cancelSucceed(): Action {
  return ({
    type: CANCEL_ITEM_SUCCEED,
  });
}

export function bindPhone(phone: Number, validCode: Number): Action {
  return {
    type: BIND_PHONE,
    phone,
    validCode,
  };
}

export function bindPhoneFailed(message: String): Action {
  return {
    type: BIND_PHONE_FAILED,
    message,
  };
}

export function bindPhoneSucceed(): Action {
  return {
    type: BIND_PHONE_SUCCEED,
  };
}


