import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initalState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'default',
      index: 0,
    },
  ],
};

export default cardStackReducer(initalState);
