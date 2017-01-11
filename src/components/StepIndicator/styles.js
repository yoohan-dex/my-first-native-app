
const React = require('react-native');

const { StyleSheet } = React;


module.exports = StyleSheet.create({
  step: {
    flex: 1,
    width: null,
    height: 85,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  stepItem: {
    width: 100,
    height: 75,
    backgroundColor: '#F0F0F0',
  },
  stepActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#77AAAD',
  },
  textFade: {
    textAlign: 'center',
    color: '#aaa',
  },
  textFocus: {
    textAlign: 'center',
    color: '#77AAAD',
  },
});
