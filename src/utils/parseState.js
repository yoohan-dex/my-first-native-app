import * as c from '../constants/orderState';

export default (state) => {
  switch (state) {
    case 2:
      return c.ONGOING;
    case 3:
      return c.CANCELLED_BY_PASSANGER;
    case 5:
      return c.CONFIRM_RECEIVE;
    case 6:
      return c.CONFIRM_ARRIVAL;
    case 7:
      return c.ORDER_ISSUE;
    case 8:
      return c.ORDER_FULFILLED;
    case 9:
      return c.ORDER_ISSUE_OVER;
    default:
      return '';
  }
};
