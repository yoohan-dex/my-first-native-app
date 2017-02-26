/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, View } from 'native-base';
import { getStoredState } from 'redux-persist';
// import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/EvilIcons';

import theme from './theme/base-theme';
// import loginLogo from './images/login.jpg';
import AppNavigator from './AppNavigator';
import { mobileLogin } from './actions/login';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: null,
//     height: null,
//   },
//   input: {
//     marginBottom: 20,
//   },
//   btn: {
//     marginTop: 20,
//     alignSelf: 'center',
//   },
// });


class App extends Component {

  constructor() {
    super();

    this.state = {
      loginState: false,
    };
  }

  async componentDidMount() {
    const state = await getStoredState({ storage: AsyncStorage });
    console.log(state);
    const { user, password } = state.user;
    if (user && password) {
      console.log(user);
      console.log(password);
      this.props.login(user, password);

      this.setState({
        loginState: true,
      });
    }


  }

  props: {
    login: Function,
  }
  render() {
    
    return (
      <AppNavigator haveLogin={this.state.loginState} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

function bindActions(dispatch) {
  return {
    login: (user, password) => dispatch(mobileLogin({ phone: user, password })),
  };
}

export default connect(mapStateToProps, bindActions)(App);
