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

export const BIND_WECHAT = 'BIND_WECHAT';
export const BIND_WECHAT_SUCCEED = 'BIND_WECHAT_SUCCEED';
export const BIND_WECHAT_FAILED = 'BIND_WECHAT_FAILED';

export const FETCH_BALANCE = 'FETCH_BALANCE';
export const FETCH_BALANCE_SUCCEED = 'FETCH_BALANCE_SUCCEED';

export const WITHDRAW = 'WITHDRAW';
export const WITHDRAW_FAILED = 'WITHDRAW_FAILED';
export const WITHDRAW_SUCCEED = 'WITHDRAW_SUCCEED';

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

export function bindWechat(): Action {
  return {
    type: BIND_WECHAT,
  };
}

export function bindWechatSucceed(): Action {
  return {
    type: BIND_WECHAT_SUCCEED,
  };
}

export function bindWechatFailed(message: String): Action {
  return {
    type: BIND_WECHAT_FAILED,
    message,
  };
}

export function fetchBalance(): Action {
  return {
    type: FETCH_BALANCE,
  };
}

export function fetchBalanceSucceed(total: Number, withdrawMoney: Number): Action {
  return {
    type: FETCH_BALANCE_SUCCEED,
    total,
    withdrawMoney,
  };
}

export function withdraw(): Action {
  return {
    type: WITHDRAW,
  };
}

export function withdrawSucceed(): Action {
  return {
    type: WITHDRAW_SUCCEED,
  };
}

export function withdrawFailed(message: string): Action {
  return {
    type: WITHDRAW_FAILED,
    message,
  };
}
