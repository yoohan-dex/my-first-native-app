import * as c from '../constants/orderState';
import * as d from '../constants/driverState';

export default (state: number) => {
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


export const driverState = (state: number) => {
  switch (state) {
    case 0:
      return d.NOT_SUBMITTED;
    case 1:
      return d.HAVE_SUBMITTED;
    case 2:
      return d.HAVE_REJECTED;
    case 3:
      return d.PASS;
    case 4:
      return d.ISSUE;
    default:
      return '';
  }
};

