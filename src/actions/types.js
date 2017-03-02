export type Register = {
  phone: number,
  validCode: number,
  password: any,
}

export type Login = {
  phone: number,
  password: any,
}

export type PersonCard = {
  name: string,
  id: string,
}

export type CarInfo = {
  brand: string,
  id: string,
  area: string,
}

export type Action =
    { type: 'PUSH_NEW_ROUTE', route: string }
  | { type: 'APP_ONLOAD' }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: string }
  | { type: 'REPLACE_ROUTE', route: string }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'SAVE_USER', user: string, password: string, state: String }
  | { type: 'SET_USER', user: string }
  | { type: 'SET_LIST', list: string}
  | { type: 'SMS_TIMING_START', second: number }
  | { type: 'SMS_TIMING_CONTINUE' }
  | { type: 'SMS_TIMING_FINISH' }
  | { type: 'MOBILE_REGISTER', form: Register}
  | { type: 'REGISTER_ERROR', message: string}
  | { type: 'REGISTER_FULLFILL' }
  | { type: 'REMOVE_REGISTER_ERROR' }
  | { type: 'MOBILE_LOGIN', from: Login }
  | { type: 'LOGIN_FAIL', message: string }
  | { type: 'LOGIN_FULLFILL' }
  | { type: 'LOGOUT' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'UPLOAD_IMAGE', imageType: string, uri: string }
  | { type: 'UPLOAD_PERSONAL_MESSAGE', form: PersonCard }
  | { type: 'UPLOAD_CAR_MESSAGE', form: CarInfo }
  | { type: 'UPLOAD_SUCCESS' }
  | { type: 'UPLOAD_FAILED', message: string }
  | { type: 'GET_AREA_LIST' }
  | { type: 'GET_AREA_LIST_SUCCESS', list: Array }
  | { type: 'SET_AREA', id: number }
  | { type: 'GET_WAITING' }
  | { type: 'GET_WAITING_SUCCEED', list: Object[]}
  | { type: 'GET_WAITING_FAILED', message: string }
  | { type: 'ROB_ITEM', id: number }
  | { type: 'ROB_SUCCEED' }
  | { type: 'ROB_FAILED' }
  | { type: 'GET_UNFULFILLED_ITEMS' }
  | { type: 'GET_UNFULFILLED_ITEMS_SUCCEED', list: Object[] }
  | { type: 'GET_FULFILLED_ITEMS' }
  | { type: 'GET_FULFILLED_ITEMS_SUCCEED', list: Object[] }
  | { type: 'GET_FULFILLED_ITEMS_FAILED', message: string }
  | { type: 'GET_CANCELLED_ITEMS' }
  | { type: 'GET_CANCELLED_ITEMS_SUCCEED', list: Object[] }
  | { type: 'GET_CANCELLED_ITEMS_FAILED', message: string }
  | { type: 'GET_ITEM_DETAIL', id: number }
  | { type: 'GET_ITEM_DETAIL_SUCCEED', detail: Object }
  | { type: 'REMOVE_ITEM_DETAIL' }
  | { type: 'CONFIRM_RECEIVE_PASSENGER', id: number, latitude: number, longitude: number }
  | { type: 'CONFIRM_RECEIVE_PASSENGER_SUCCEED' }
  | { type: 'CONFIRM_ARRIVAL', id: number, latitude: number, longitude: number }
  | { type: 'CONFIRM_ARRIVAL_SUCCEED' }
  | { type: 'CHANGE_HOME_STATE', state: 'home' | 'account' | 'list' }
  | { type: 'RESET_PASSWORD', phone: number, validCode: number, newPassword: string }
  | { type: 'RESET_PASSWORD_SUCCEED' }
  | { type: 'REMOVE_MESSAGE' }


export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
