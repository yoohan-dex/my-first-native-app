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
import push from 'jpush-react-native';
// import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/EvilIcons';
import pusher from './utils/push';

import abyss from './images/monkey.jpeg';
import AppNavigator from './AppNavigator';
import { mobileLogin, wechatAutoLogin } from './actions/login';
import { getWaiting } from './actions/carList';

type Props = {
  app: { login: Boolean, error: String },
  login: (user: String, password: String) => void,
  wechatLogin: (account: String, token: String) => void,
  getWaiting: () => void,
  user: {
    userType: string,
    user: string,
    id: number,
  },
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      ready: false,
    };

    this.ready = this.ready.bind(this);
  }
  state: { ready: boolean }

  async componentDidMount() {
    try {
      const { login, wechatLogin } = this.props;
      const state = await getStoredState({ storage: AsyncStorage });
      if (state.user) {
        const { user, password, account, token } = state.user;
        if (user && password) {
          login(user, password);
        } else if (account && token) {
          wechatLogin(account, token);
        } else {
          this.ready();
        }
      } else {
        this.ready();
      }
      push.addReceiveNotificationListener(() => this.props.getWaiting());
    } catch (e) {
      this.ready();
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.user.userType && nextProps.user.userType && nextProps.user.id) {
      pusher(`${nextProps.user.id}`, ['0']);
    }
    if (nextProps.app.login && !this.state.ready) {
      this.ready();
    }
    if (nextProps.app.error && !this.state.ready) {
      this.ready();
    }
  }
  componentWillUnmount() {
    push.removeReceiveNotificationListener();
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
    wechatLogin: (account, token) => dispatch(wechatAutoLogin(account, token)),
    getWaiting: () => dispatch(getWaiting()),
  };
}

export default connect(mapStateToProps, bindActions)(App);
