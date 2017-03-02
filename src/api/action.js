import request, { post } from '../utils/request';

const postCar = post('cargroupOrder');

export function receivedPassenger(id: number, latitude: number, longitude: number) {
  return postCar('driverAcceptConfirmed', {
    cargroup_orderId: id,
    latitude,
    longitude,
  });
}

export function arrivalConfirm(id: number, latitude: number, longitude: number) {
  return postCar('driverArrivalConfirmed', {
    cargroup_orderId: id,
    latitude,
    longitude,
  });
}

export function fetchBalance() {
  return request('driver')('getDriverPocketBalance');
}
