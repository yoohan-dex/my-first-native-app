export type Register = {
  phone: number,
  validCode: number,
  password: any,
}

export type Login = {
  phone: number,
  password: any,
}

export type Action =
    { type: 'PUSH_NEW_ROUTE', route: string }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: string }
  | { type: 'REPLACE_ROUTE', route: string }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'SAVE_USER', user: string, password: string }
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

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
