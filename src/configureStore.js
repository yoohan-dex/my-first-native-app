import { AsyncStorage } from 'react-native';
import 'rxjs';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable';

// import promise from './promise';
import reducer from './reducers';
import epics from './epics';

const epicMiddleware = createEpicMiddleware(epics);
const composeEnhance = composeWithDevTools({
  name: 'app',
  realtime: true,
});

// const middlewares = {
//   epicMiddleware,
//   promise,
// };

export default function configureStore(onCompletion: () => void) {
  const enhancer = composeEnhance(
    applyMiddleware(epicMiddleware),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
