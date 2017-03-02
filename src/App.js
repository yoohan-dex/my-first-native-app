/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getStoredState } from 'redux-persist';
// import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/EvilIcons';

import abyss from './images/monkey.jpeg';
import AppNavigator from './AppNavigator';
import { mobileLogin } from './actions/login';

type Props = {
  app: { login: boolean, error: string },
  login: (user: string, password: string) => void,
}

class App extends Component {

  constructor() {
    super();

    this.state = {
      ready: false,
    };

    this.ready = this.ready.bind(this);
  }

  async componentDidMount() {
    try {
      const { login } = this.props;
      const state = await getStoredState({ storage: AsyncStorage });
      if (state.user) {
        const { user, password } = state.user;
        if (user && password) {
          login(user, password);
        }
      } else {
        this.ready();
      }
    } finally {
      // ..nothing
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.app.login && !this.state.ready) {
      this.ready();
    }
    if (nextProps.app.error && !this.state.ready) {
      this.ready();
    }
  }

  props: Props
  ready: () => void
  ready() {
    this.setState({
      ready: true,
    });
  }

  render() {
    return this.state.ready || this.props.app.login || this.props.app.error ?
      <AppNavigator /> :
      <View style={{ flex: 1 }}>
        <Image source={abyss} style={{ flex: 1, justifyContent: 'center' }} />
      </View>
    ;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
});

function bindActions(dispatch) {
  return {
    login: (user, password) => dispatch(mobileLogin({ phone: user, password })),
  };
}

export default connect(mapStateToProps, bindActions)(App);
