/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { Container, View } from 'native-base';
// import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/EvilIcons';

import theme from './theme/base-theme';
// import loginLogo from './images/login.jpg';
import AppNavigator from './AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
});


export default class App extends Component {
  props: {
    s: string,
  }
  render() {
    return (
      <AppNavigator />
    );
  }
}
