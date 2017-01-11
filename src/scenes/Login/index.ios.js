// @flow
import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

import { connect } from 'react-redux';
import { Container, Button, Icon, Text, View } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import myTheme from './theme';
import s from './styles';
import background from '../../images/login.jpeg';

import { setUser } from '../../actions/user';

const {
  replaceAt,
  pushRoute,
} = actions;

class Login extends Component {

  static propTypes = {
    replaceAt: PropTypes.func,
    pushRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
    }),
  }

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
              onPress={() => this.replaceRoute('home')}
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
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  user: state.user,
});


export default connect(mapStateToProps, bindActions)(Login);
