import { Action } from './types';

export const CONFIRM_RECEIVE_PASSENGER = 'CONFIRM_RECEIVE_PASSENGER';
export const CONFIRM_ARRIVAL = 'CONFIRM_ARRIVAL';
export const CONFIRM_RECEIVE_PASSENGER_SUCCEED = 'CONFIRM_RECEIVE_PASSENGER_SUCCEED';
export const CONFIRM_ARRIVAL_SUCCEED = 'CONFIRM_ARRIVAL_SUCCEED';

export function receive(id: number, longitude: number, latitude: number): Action {
  return ({
    type: CONFIRM_RECEIVE_PASSENGER,
    id,
    latitude,
    longitude,
  });
}

export function arrival(id: number, longitude: number, latitude: number): Action {
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
