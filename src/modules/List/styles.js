import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    backgroundColor: '#72818a',
    height: 56,
  },
  tablabel: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 8,
  },
  indicator: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 4,
  },
});
