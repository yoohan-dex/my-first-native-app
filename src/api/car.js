import request, { post } from '../utils/request';

const fetchCar = request('cargroupOrder');
const postCar = post('cargroupOrder');
export function getWaiting() {
  return fetchCar('waitingCarGroups');
}

export function getUnfulfilled() {
  return fetchCar('getDriverIncompleteOrderList');
}

export function robItem(id) {
  return post('driver')('driverRobOrder', {
    cargroup_orderId: id,
  });
}

export function getItemDetail(id) {
  return postCar('getCurDriverCargroupOrder', {
    cargroup_orderId: id,
  });
}
