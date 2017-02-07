// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  View,
  Header,
  Title,
  Button,
  Icon,
  InputGroup,
  Input,
} from 'native-base';

import myTheme from '../../theme/base-theme';
import s from './styles';

const {
  popRoute,
} = actions;

class MobileLogin extends Component {
  static propTypes = {
    popRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  render() {
    return (
      <Container theme={myTheme}>
        <Header>
          <Button
            transparent
            onPress={() => this.popRoute()}
          >
            <Icon name="keyboard-arrow-left" />
          </Button>

          <Title>手机登陆</Title>
        </Header>
        <View style={s.container}>
          <InputGroup style={[s.inputGroup, s.firstInput]}>
            <Icon name="ios-person" />
            <Input
              renderToHardwareTextureAndroid
              style={s.input}
              keyboardType="numeric"
              placeholder="手机号码"
            />
          </InputGroup>
          <InputGroup style={[s.inputGroup, s.lastInput]}>
            <Icon name="ios-unlock-outline" />
            <Input
              renderToHardwareTextureAndroid
              style={s.input}
              placeholder="密码"
              secureTextEntry
            />
          </InputGroup>
          <View style={s.buttonGroup}>
            <Button
              rounded
              block
              success
            >
              登陆
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});
export default connect(mapStateToProps, bindActions)(MobileLogin);
