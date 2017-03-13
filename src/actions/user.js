// @flow
import { Action } from './types';

export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USER = 'GET_USER';
export const SAVE_WECHAT_USER = 'SAVE_WECHAT_USER';

export function saveUser(user: String, password: String, state: String, bind: Boolean, id: Number): Action {
  return {
    type: SAVE_USER,
    user,
    password,
    state,
    bind,
  };
}

function saveWechatUser(account: String, token: String, state: String, bind: Boolean, id: Number): Action {
  return {
    type: SAVE_WECHAT_USER,
    account,
    token,
    state,
    bind,
    id,
  };
}


export { saveWechatUser };
