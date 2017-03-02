import request, { post } from '../utils/request';

const fetchCar = request('cargroupOrder');
const postCar = post('cargroupOrder');
export function getWaiting() {
  return fetchCar('waitingCarGroups');
}

export function getUnfulfilled() {
  return fetchCar('getDriverIncompleteOrderList');
}

export function robItem(id: Number) {
  return post('driver')('driverRobOrder', {
    cargroup_orderId: id,
  });
}

export function getItemDetail(id: Number) {
  return postCar('getCurDriverCargroupOrder', {
    cargroup_orderId: id,
  });
}

export function getFulfilled() {
  return postCar('getDriverFinishCargroupOrderList', {
    pageSize: 100,
    pageNo: 1,
  });
}

export function getCancelled() {
  return postCar('getDriverFinishCanceledCargroupOrderList', {
    pageSize: 100,
    pageNo: 1,
  });
}
