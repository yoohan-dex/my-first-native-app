
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  firstInput: {
    marginTop: 10,
  },
  lastInput: {
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 10,
    borderRadius: 50,
  },
  buttonGroup: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
});
