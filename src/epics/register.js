import { postDriver } from '../utils/request';

import { Form } from '../actions/types';
import { MOBILE_REGISTER } from '../actions/register';



export function mobileRegister(action$) {
  action$.ofType(MOBILE_REGISTER)
  .mergeMap(action => postDriver('driver_register', {
    phone_num: action.form.phone,
    sms_code: action.form.validCode,
    password: action.form.password,
  }).then(res => ({ type: 'ok', result: res }))
  .catch(err => ({ type: 'ohno!', err })),
  );
}
