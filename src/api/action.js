import request, { post } from '../utils/request';

const postCar = post('cargroupOrder');

export function receivedPassenger(id: Number, latitude: Number, longitude: Number) {
  return postCar('driverAcceptConfirmed', {
    cargroup_orderId: id,
    latitude,
    longitude,
  });
}

export function arrivalConfirm(id: Number, latitude: Number, longitude: Number) {
  return postCar('driverArrivalConfirmed', {
    cargroup_orderId: id,
    latitude,
    longitude,
  });
}

export function fetchBalance() {
  return request('driver')('getDriverPocketBalance');
}

export function cancelItem(id: Number) {
  return postCar('cancelCargroupOrderByDriver', {
    cargroup_orderId: id,
  });
}

export function bindPhone(phone: Number, validCode: Number) {
  return post('driver')('driverWxLoginBindMobphone', {
    phone_num: phone,
    sms_code: validCode,
  });
}
