// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { resetPassword } from '../../actions/reset';
import { removeMessage } from '../../actions/global';


import api from '../../api';

const {
  popRoute,
  replaceAt,
} = actions;

type Data = {
  values?: {
    phone: number,
    password: string,
    validCode: number,
  },
}

type Props = {
  popRoute: Function,
  navigation: Object,
  data: Data,
  resetPassword: (phone: number, validCode: number, password: string) => void,
  removeMessage: () => void,
  state: {
    pending: boolean,
    error?: string,
    succeed: boolean,
  },
}

class ResetPassword extends Component {

  constructor() {
    super();

    this.getSMS = this.getSMS.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentWillUnmount() {
    this.props.removeMessage();
  }

  getSMS: () => void
  getSMS() {
    const { values } = this.props.data;
    if (values && values.phone.length === 11) {
      api.mobile.getValidCode(values.phone);
    }
  }

  props: Props

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  resetPassword: () => void
  resetPassword() {
    const { values } = this.props.data;
    if (values) {
      const { phone, password, validCode } = values;
      if (phone && password && validCode) {
        this.props.resetPassword(phone, validCode, password);
      }
    }
  }

  render() {
    const { pending, error, succeed } = this.props.state;

    return (
      <Container theme={myTheme}>
        <Header>
          <Button
            transparent
            onPress={() => this.popRoute()}
          >
            <Icon name="keyboard-arrow-left" />
          </Button>

          <Title>重置密码</Title>
        </Header>
        <View style={s.container}>
          <Spinner
            visible={pending}
            textContent={'正在重新设置'}
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
            label="手机验证码"
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
              onPress={this.resetPassword}
            >
              确定重置
            </Button>
            <Text style={{ textAlign: 'center', marginTop: 30 }}>{error || (succeed && '密码重置成功')}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const validate = (values: { phone: number, validCode: number, password: string }) => {
  const errors = {};
  const { phone, validCode, password } = values;
  if (!phone) {
    errors.phone = 'Required';
  } else if (phone.length !== 11) {
    errors.phone = 'Must be 11 number';
  } else if (!validCode) {
    errors.validCode = 'Required';
  } else if (!password) {
    errors.password = 'Required';
  } else if (password.length <= 8) {
    errors.password = 'Must be 8 characters or more';
  }
  return errors;
};

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    resetPassword: (phone, validCode, password) =>
      dispatch(resetPassword(phone, validCode, password)),
    removeMessage: () => dispatch(removeMessage()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  data: state.form.resetForm,
  state: state.reset,
  global: state.global,
});
const component = reduxForm({
  form: 'resetForm',
  validate,
})(ResetPassword);
export default connect(mapStateToProps, bindActions)(component);

