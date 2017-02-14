import request, { postDriver } from '../utils/request';
import { Form } from '../actions/types';

export function mobileRegister(form: Form) {
  return postDriver('driver_register', {
    phone_num: form.phone,
    sms_code: form.validCode,
    password: form.password,
  });
}

export function getDriverInfo() {
  return request('getDriverInfo');
}
