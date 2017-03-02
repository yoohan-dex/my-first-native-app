
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
  },
  firstInput: {
    
  },
  lastInput: {
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 10,
    borderRadius: 50,
  },
  buttonGroup: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
