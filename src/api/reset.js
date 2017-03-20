import { post } from '../utils/request';

export function resetPassword(phone: number, validCode: number, newPassword: string) {
  return post('driver')('resetDriverPassword', {
    phone_num: phone,
    newPassword,
    sms_code: validCode,
  });
}
