import saga from './register';
import login from './login';
import carList from './carList';
import action from './action';
import reset from './reset';

export default [
  saga,
  login,
  carList,
  action,
  reset,
];
