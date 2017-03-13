import { post } from '../utils/request';

export function getWechatAccount(code: String) {
  return post('driver')('driverAppWechatAuthorize', {
    code,
  });
}

export function wechatLogin(account: String, token: String) {
  return post('driver')('driverAppWechatPrincipalLogin', {
    principal: account,
    code_token: token,
  });
}
