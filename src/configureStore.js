import { AsyncStorage } from 'react-native';
import 'rxjs';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
// import { createEpicMiddleware } from 'redux-observable';
import createSagaMiddleware from 'redux-saga';

// import promise from './promise';
import reducer from './reducers';
import sagas from './sagas';
// import epics from './epics';

// const epicMiddleware = createEpicMiddleware(epics);
const composeEnhance = composeWithDevTools({
  name: 'app',
  realtime: true,
});

// const middlewares = {
//   epicMiddleware,
//   promise,
// };

const sagaMiddleware = createSagaMiddleware();
export const runSaga = () => sagas.forEach(saga => sagaMiddleware.run(saga));
export default function configureStore(onCompletion: () => void) {
  const enhancer = composeEnhance(
    applyMiddleware(sagaMiddleware),
  );

  const store = createStore(reducer, enhancer, autoRehydrate());
  persistStore(store, { whitelist: 'global', storage: AsyncStorage }, onCompletion);

  return store;
}
