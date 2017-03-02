import { post } from '../utils/request';


export function getValidCode(phone: number) {
  return post('smsoperation')('sendSmsVerificationCode', {
    phone_num: phone,
  });
}

export default 'a';
