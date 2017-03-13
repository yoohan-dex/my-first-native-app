export type Register = {
  phone: Number,
  validCode: Number,
  password: any,
}

export type Login = {
  phone: Number,
  password: any,
}

export type PersonCard = {
  name: String,
  id: String,
}

export type CarInfo = {
  brand: String,
  id: String,
  area: String,
}

export type Action =
    { type: 'PUSH_NEW_ROUTE', route: String }
  | { type: 'APP_ONLOAD' }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: String }
  | { type: 'REPLACE_ROUTE', route: String }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: String }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'SAVE_USER', user: String, password: String, state: String, bind: Boolean, id: Number }
  | { type: 'SAVE_WECHAT_USER', account: String, token: String, state: String, bind: Boolean, id: Number }
  | { type: 'SET_USER', user: String }
  | { type: 'SET_LIST', list: String }
  | { type: 'SMS_TIMING_START', second: Number }
  | { type: 'SMS_TIMING_CONTINUE' }
  | { type: 'SMS_TIMING_FINISH' }
  | { type: 'MOBILE_REGISTER', form: Register}
  | { type: 'REGISTER_ERROR', message: String }
  | { type: 'REGISTER_FULLFILL' }
  | { type: 'REMOVE_REGISTER_ERROR' }
  | { type: 'MOBILE_LOGIN', from: Login }
  | { type: 'LOGIN_FAIL', message: String }
  | { type: 'LOGIN_FULLFILL' }
  | { type: 'LOGOUT' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'UPLOAD_IMAGE', imageType: String, uri: String }
  | { type: 'UPLOAD_PERSONAL_MESSAGE', form: PersonCard }
  | { type: 'UPLOAD_CAR_MESSAGE', form: CarInfo }
  | { type: 'UPLOAD_SUCCESS' }
  | { type: 'UPLOAD_FAILED', message: String }
  | { type: 'GET_AREA_LIST' }
  | { type: 'GET_AREA_LIST_SUCCESS', list: Array }
  | { type: 'SET_AREA', id: Number }
  | { type: 'GET_WAITING' }
  | { type: 'GET_WAITING_SUCCEED', list: Object[]}
  | { type: 'GET_WAITING_FAILED', message: String }
  | { type: 'ROB_ITEM', id: Number }
  | { type: 'ROB_SUCCEED' }
  | { type: 'ROB_FAILED' }
  | { type: 'GET_UNFULFILLED_ITEMS' }
  | { type: 'GET_UNFULFILLED_ITEMS_SUCCEED', list: Object[] }
  | { type: 'GET_FULFILLED_ITEMS' }
  | { type: 'GET_FULFILLED_ITEMS_SUCCEED', list: Object[] }
  | { type: 'GET_FULFILLED_ITEMS_FAILED', message: String }
  | { type: 'GET_CANCELLED_ITEMS' }
  | { type: 'GET_CANCELLED_ITEMS_SUCCEED', list: Object[] }
  | { type: 'GET_CANCELLED_ITEMS_FAILED', message: String }
  | { type: 'GET_ITEM_DETAIL', id: Number }
  | { type: 'GET_ITEM_DETAIL_SUCCEED', detail: Object }
  | { type: 'REMOVE_ITEM_DETAIL' }
  | { type: 'CONFIRM_RECEIVE_PASSENGER', id: Number, latitude: Number, longitude: Number }
  | { type: 'CONFIRM_RECEIVE_PASSENGER_SUCCEED' }
  | { type: 'CONFIRM_ARRIVAL', id: Number, latitude: Number, longitude: Number }
  | { type: 'CONFIRM_ARRIVAL_SUCCEED' }
  | { type: 'CHANGE_HOME_STATE', state: 'home' | 'account' | 'list' }
  | { type: 'RESET_PASSWORD', phone: Number, validCode: Number, newPassword: String }
  | { type: 'RESET_PASSWORD_SUCCEED' }
  | { type: 'REMOVE_MESSAGE' }
  | { type: 'CANCEL_ITEM', id: Number }
  | { type: 'CANCEL_ITEM_SUCCEED' }
  | { type: 'WECHAT_LOGIN' }
  | { type: 'WECHAT_LOGIN_FAILED', message: String }
  | { type: 'WECHAT_AUTO_LOGIN', account: String, token: String }
  | { type: 'WECHAT_LOGIN_SUCCEED', account: String, token: String }
  | { type: 'BIND_PHONE', phone: Number, validCode: Number }
  | { type: 'BIND_PHONE_FAILED', message: String }
  | { type: 'BIND_PHONE_SUCCEED' }
  | { type: 'RELOGIN' }


export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
