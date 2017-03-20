import { AsyncStorage } from 'react-native';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import sagas from './sagas';

// const composeEnhance = composeWithDevTools({
//   name: 'app',
//   realtime: true,
// });

const sagaMiddleware = createSagaMiddleware();
export const runSaga = () => sagaMiddleware.run(sagas);
export default function configureStore() {
  const enhancer = applyMiddleware(sagaMiddleware);

  const store = createStore(reducer, enhancer, autoRehydrate());

  persistStore(store, { whitelist: ['user', 'global'], storage: AsyncStorage });

  return store;
}
