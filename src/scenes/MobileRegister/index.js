// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  View,
  Header,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { Field, reduxForm } from 'redux-form';

import renderField from '../../components/RenderField';

import ButtonForSms from '../../components/ButtonForSms';
import myTheme from '../../theme/base-theme';
import s from './styles';
import { Register } from '../../actions/types';
import { mobileRegister } from '../../actions/register';
import { removeError } from '../../actions/global';
import api from '../../api';

const {
  popRoute,
  replaceAt,
} = actions;

type Data = {
  values?: Register,
}

type Props = {
  popRoute: Function,
  navigation: Object,
  data: Data,
  registerAction: Function,
  removeError: Function,
  state: Object,
}

class MobileRegister extends Component {

  constructor() {
    super();
    this.state = {
      uri: '',
      transfer: false,

    };

    this.getSMS = this.getSMS.bind(this);
  }

  componentWillUnmount() {
    this.props.removeError();
  }

  getSMS: () => void
  getSMS() {
    const { values } = this.props.data;
    if (values && values.phone) {
      api.mobile.getValidCode(values.phone);
    }
  }

  props: Props

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  mobileRegister() {
    const data: Data = this.props.data;
    const { syncErrors } = data;
    if (data.values && !syncErrors) {
      const { phone, password, validCode } = data.values;
      if (phone && password && validCode) {
        this.props.registerAction(data.values);
      }
    } else if (syncErrors) {
      const errors = Object.keys(syncErrors).map(v => syncErrors[v]);
      Alert.alert(errors[0]);
    }
  }

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

          <Title>手机注册</Title>
        </Header>
        <View style={s.container}>
          <Spinner
            visible={pending}
            textContent={'正在注册...'}
            textStyle={{ color: '#FFF' }}
          />
          <Field
            name="phone"
            type="numeric"
            component={ButtonForSms}
            label="手机号码"
            button={this.getSMS}
          />

          <Field
            name="validCode"
            type="numeric"
            component={renderField}
            label="验证码"
          />
          <Field
            name="password"
            type="ascii-capable"
            password
            component={renderField}
            label="密码"
          />
          <View style={s.buttonGroup}>
            <Button

              rounded
              block
              success
              onPress={() => {
                this.mobileRegister();
              }}
            >
              注册
            </Button>
            <Text style={{ textAlign: 'center', marginTop: 30 }}>{error}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const validate = (values: Register) => {
  const errors = {};
  const { phone, validCode, password } = values;
  if (!phone) {
    errors.phone = '手机号不可为空';
  } else if (phone.length !== 11) {
    errors.phone = '请输入正确的手机号';
  } else if (!validCode) {
    errors.validCode = '验证码不可为空';
  } else if (validCode !== 4) {
    errors.validCode = '验证码必须为4位数';
  } else if (!password) {
    errors.password = '密码不可为空';
  } else if (password.length < 8) {
    errors.password = '密码必须不小于八位';
  }
  return errors;
};

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    registerAction: form => dispatch(mobileRegister(form)),
    removeError: () => dispatch(removeError()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  data: state.form.register,
  state: state.register,
  global: state.global,
});
const component = reduxForm({
  form: 'register',
  validate,
})(MobileRegister);

export default connect(mapStateToProps, bindActions)(component);

