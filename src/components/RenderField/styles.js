
const React = require('react-native');

const { StyleSheet } = React;


module.exports = StyleSheet.create({
  step: {
    flex: 1,
    height: 80,
    padding: 10,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  stepItem: {
    width: 100,
    height: 60,
    backgroundColor: 'white',
  },
  stepItemIcon: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  formGroup: {
    marginVertical: 20,
    padding: 20,
  },
  title: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    alignSelf: 'center',
  },
  titleButton: {
    backgroundColor: '#eee',
  },
  titleButtonText: {
    color: '#333',
  },
});
