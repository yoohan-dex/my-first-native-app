import { Action } from './types';

export const GET_WAITING = 'GET_WAITING';
export const GET_WAITING_SUCCEED = 'GET_WAITING_SUCCEED';
export const GET_WAITING_FAILED = 'GET_WAITING_FAILED';

export const ROB_ITEM = 'ROB_ITEM';
export const ROB_SUCCEED = 'ROB_SUCCEED';
export const ROB_FAILED = 'ROB_FAILED';
export const GET_UNFULFILLED_ITEMS = 'GET_UNFULFILLED_ITEMS';
export const GET_UNFULFILLED_ITEMS_SUCCEED = 'GET_UNFULFILLED_ITEMS_SUCCEED';

export const GET_ITEM_DETAIL = 'GET_ITEM_DETAIL';
export const GET_ITEM_DETAIL_SUCCEED = 'GET_ITEM_DETAIL_SUCCEED';
export const REMOVE_ITEM_DETAIL = 'REMOVE_ITEM_DETAIL';

export function getWaiting(): Action {
  return ({
    type: GET_WAITING,
  });
}

export function getWaitingSucceed(list: Object[]): Action {
  return ({
    type: GET_WAITING_SUCCEED,
    list,
  });
}

export function getWaitingFailed(message: string): Action {
  return ({
    type: GET_WAITING_FAILED,
    message,
  });
}

export function robItem(id: number): Action {
  return ({
    type: ROB_ITEM,
    id,
  });
}

export function robFailed(): Action {
  return ({
    type: ROB_FAILED,
  });
}

export function robSucceed(): Action {
  return ({
    type: ROB_SUCCEED,
  });
}

export function getUnfulfilled(): Action {
  return ({
    type: GET_UNFULFILLED_ITEMS,
  });
}

export function getUnfulfilledSucceed(list: Object[]): Action {
  return ({
    type: GET_UNFULFILLED_ITEMS_SUCCEED,
    list,
  });
}

export function getItemDetail(id: number) {
  return ({
    type: GET_ITEM_DETAIL,
    id,
  });
}

export function getItemDetailSucceed(detail: Object) {
  return ({
    type: GET_ITEM_DETAIL_SUCCEED,
    detail,
  });
}

export function removeItemDetial() {
  return ({
    type: REMOVE_ITEM_DETAIL,
  });
}
