import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Alert } from 'react-native';
import {
  Container,
  View,
  Header,
  Title,
  Text,
  Button,
  Icon,
} from 'native-base';

import { Field, reduxForm } from 'redux-form';

import RenderField from '../../components/RenderField';
import myTheme from '../../theme/base-theme';
import s from './styles';

import { mobileLogin } from '../../actions/login';
import { removeError } from '../../actions/global';

import { Login } from '../../actions/types';

const {
  popRoute,
  replaceAt,
  pushRoute,
} = actions;


type Data = {
  values?: Login,
}

type Props = {
  popRoute: Function,
  navigation: Object,
  state: Object,
  data: Object,
  loginAction: Function<Login>,
  removeError: Function,
  pushRoute: (route: { key: string }, key: string) => void,
}

class MobileLogin extends Component {
  constructor() {
    super();

    this.state = {
      transfer: false,
      state: '登录',
    };
  }


  componentWillUnmount() {
    this.props.removeError();
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  login() {
    const data: Data = this.props.data;
    const { syncErrors } = data;
    if (data.values && !syncErrors) {
      const { phone, password } = data.values;
      if (phone && password) {
        this.props.loginAction(data.values);
      }
    } else if (syncErrors) {
      const errors = Object.keys(syncErrors).map(v => syncErrors[v]);
      Alert.alert(errors[0]);
    }
  }

  props: Props
  render() {
    const { pending, error } = this.props.state;
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
          <Field
            name="phone"
            type="numeric"
            component={RenderField}
            label="手机号码"
          />
          <Field
            name="password"
            type="default"
            component={RenderField}
            label="密码"
            password
          />
          <View style={s.buttonGroup}>
            <Button
              rounded
              block
              success
              onPress={() => this.login()}
            >
              登录
            </Button>
            <Button
              style={{ alignSelf: 'center', marginTop: 20 }}
              transparent
              textStyle={{ color: '#555' }}
              onPress={() => this.pushRoute('reset-password')}
            >
              忘记密码
            </Button>
            <Text style={{ textAlign: 'center', marginTop: 30 }}>{error}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const validate = (values: Login) => {
  const errors = {};
  const { phone, password } = values;
  if (!phone) {
    errors.phone = '手机号不可为空';
  } else if (phone.length !== 11) {
    errors.phone = '请输入正确的手机号';
  } else if (!password) {
    errors.password = '密码不可为空';
  }
  return errors;
};

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    loginAction: form => dispatch(mobileLogin(form)),
    removeError: () => dispatch(removeError()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  state: state.mobileLogin,
  data: state.form.mobileLogin,
  global: state.global,
});

const Final = reduxForm({
  form: 'mobileLogin',
  validate,
})(MobileLogin);
export default connect(mapStateToProps, bindActions)(Final);
