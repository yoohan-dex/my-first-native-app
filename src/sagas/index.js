import saga from './register';
import login from './login';
import carList from './carList';
import action from './action';
import reset from './reset';

export default function* rootSaga() {
  yield [
    reset(),
    saga(),
    login(),
    carList(),
    action(),
  ];
}
