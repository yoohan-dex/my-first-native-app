import { Platform } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jpush from 'jpush-react-native';
import { registerApp as wechatRegisterApp } from 'react-native-wechat';

import App from './App';
import configureStore, { runSaga } from './configureStore';

import config from './config';

function setup():Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(),
      };
      runSaga();
      if (Platform.OS === 'android') {
        jpush.initPush();
      }
      wechatRegisterApp(config.wechatAppId);
    }
    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
