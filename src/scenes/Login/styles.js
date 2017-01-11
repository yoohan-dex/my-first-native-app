import React from 'react-native';

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: null,
    height: null,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#A593E0',
    padding: 20,
    justifyContent: 'center',
    paddingBottom: 44,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  title: {
    alignSelf: 'center',
    color: '#333',
    fontSize: 18,
    margin: 10,
  },
  input: {
    marginBottom: 20,
  },
  hint: {
    alignSelf: 'flex-end',
  },
  formWrap: {
  },
  btn: {
    marginBottom: 10,
    height: 44,
    justifyContent: 'center',
    backgroundColor: '#09BB07',
  },
  otherFormWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  firstOtherBtn: {
    marginRight: 10,
  },
  otherBtn: {
    backgroundColor: '#d9e1e8',
    flex: 1,
    height: 44,
  },
  otherBtnText: {
    color: '#282c37',
  },
});
