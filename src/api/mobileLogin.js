import { postDriver } from '../utils/request';
import { Login } from '../actions/types';

export function mobileLogin(form: Login) {
  return postDriver('common_login', {
    username: form.phone,
    password: form.password,
  });
}
