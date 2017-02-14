import {
  GET_SMS_MESSAGE,
  getSmsMessage,
} from '../actions/sms';

export default (action$, store) =>
  action$.ofType(GET_SMS_MESSAGE)
  .mapTo