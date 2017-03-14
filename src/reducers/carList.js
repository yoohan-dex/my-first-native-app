import { Action } from '../actions/types';
import {
  GET_WAITING_SUCCEED,
  GET_WAITING,
  GET_WAITING_FAILED,
  ROB_SUCCEED,
  ROB_ITEM,
  ROB_FAILED,
  GET_UNFULFILLED_ITEMS_SUCCEED,
  GET_ITEM_DETAIL_SUCCEED,
  REMOVE_ITEM_DETAIL,
  GET_FULFILLED_ITEMS_SUCCEED,
  GET_FULFILLED_ITEMS_FAILED,
  GET_CANCELLED_ITEMS_SUCCEED,
  GET_CANCELLED_ITEMS_FAILED,
  ROB_ITEM_CLEAN,
} from '../actions/carList';

export type State = {
  pending: boolean,
  list: Object[],
  unfulfilled: Object[],
  detail: Object[],
  robbing: boolean,
  state: 'default' | 'success' | 'failed',
  message: string,
  fulfilled: Object[],
  cancelled: Object[],
};

const initialState = {
  pending: false,
  list: '',
  unfulfilled: '',
  robbing: false,
  state: 'default',
  detail: '',
  message: '',
  fulfilled: '',
  cancelled: '',
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case GET_WAITING:
      return {
        ...state,
        list: '',
        pending: true,
      };
    case GET_WAITING_SUCCEED:
      return {
        ...state,
        pending: false,
        list: action.list,
      };
    case GET_WAITING_FAILED:
      return {
        ...state,
        pending: false,
        message: action.message,
      };
    case ROB_ITEM:
      return {
        ...state,
        robbing: true,
      };
    case ROB_FAILED:
      return {
        ...state,
        robbing: false,
        state: 'failed',
      };
    case ROB_SUCCEED:
      return {
        ...state,
        state: 'success',
        robbing: false,
      };
    case ROB_ITEM_CLEAN:
      return {
        ...state,
        state: '',
        robbing: false,
      };
    case GET_UNFULFILLED_ITEMS_SUCCEED:
      return {
        ...state,
        unfulfilled: action.list,
      };
    case GET_ITEM_DETAIL_SUCCEED:
      return {
        ...state,
        detail: action.detail,
      };
    case REMOVE_ITEM_DETAIL:
      return {
        ...state,
        detail: '',
      };
    case GET_FULFILLED_ITEMS_SUCCEED:
      return {
        ...state,
        fulfilled: action.list,
      };
    case GET_FULFILLED_ITEMS_FAILED:
      return {
        ...state,
        fulfilled: '',
      };
    case GET_CANCELLED_ITEMS_SUCCEED:
      return {
        ...state,
        cancelled: action.list,
      };
    case GET_CANCELLED_ITEMS_FAILED:
      return {
        ...state,
        cancelled: '',
      };
    default:
      return state;
  }
}
