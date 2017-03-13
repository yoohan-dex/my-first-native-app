// @flow
import React, { Component, PropTypes } from 'react';
import { Image, AlertIOS } from 'react-native';

import { connect } from 'react-redux';
import { Container, Button, Icon, Text, View } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import myTheme from './theme';
import s from './styles';
import background from '../../images/login.jpeg';

import { wechatLogin } from '../../actions/login';

const {
  replaceAt,
  pushRoute,
} = actions;

type Props = {
  replaceAt: (routeKey: String, route: { key: String }, key: String) => void,
  pushRoute: (route: { key: String }, key: String) => void,
  navigation: {
    key: String,
  },
  wechatLogin: () => void,
  login: Object,
}

class Login extends Component {

  componentDidUpdate() {
    const { wechatError } = this.props.login;
    if (wechatError) {
      AlertIOS.alert(
        '提示',
        wechatError,
      );
    }
  }
  props: Props
  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container theme={myTheme}>
        <Image source={background} style={s.shadow}>
          <View style={s.formWrap}>
            <Button
              onPress={() => this.props.wechatLogin()}
              rounded
              block
              style={s.btn}
            >
              <Icon name="weixin" />
              <Text>微信快捷登陆</Text>
            </Button>
            <View style={s.otherFormWrap}>
              <Button
                rounded
                block
                style={[s.otherBtn, s.firstOtherBtn]}
                textStyle={s.otherBtnText}
                onPress={() => this.pushRoute('mobile-login')}
              >
                手机登陆
                </Button>
              <Button
                rounded
                block
                style={s.otherBtn}
                textStyle={s.otherBtnText}
                onPress={() => this.pushRoute('mobile-register')}
              >
              手机注册
              </Button>
            </View>
          </View>
        </Image>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    wechatLogin: () => dispatch(wechatLogin()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  user: state.user,
  login: state.mobileLogin,
});


export default connect(mapStateToProps, bindActions)(Login);
