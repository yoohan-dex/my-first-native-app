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
import { post } from '../../utils/request';
import { Register } from '../../actions/types';
import { mobileRegister } from '../../actions/register';
import { removeError } from '../../actions/global';

const {
  popRoute,
  replaceAt,
} = actions;

type Data = {
  values?: Register,
}

type Props = {
  popRoute: Function,
  replaceAt: Function,
  navigation: Object,
  data: Object<Data>,
  registerAction: Function,
  removeError: Function,
  state: Object,
  global: Object,
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
  componentDidUpdate() {
    const { state, global } = this.props;
    if (state.success && global.user && !this.state.transfer) {
      this.toRegisterMessage();
      this.finishTransfer();
    }
  }

  componentWillUnmount() {
    this.props.removeError();
  }


  getSMS() {
    const { data } = this.props;
    if (data.values && data.values.phone) {
      post('smsoperation/sendSmsVerificationCode', { phone_num: data.values.phone });
    }
  }
  finishTransfer() {
    this.setState(pre => ({ transfer: !pre.transfer }));
  }
  props: Props

  toRegisterMessage() {
    this.props.replaceAt('mobile-register', { key: 'register-message' }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  mobileRegister() {
    const data: Data = this.props.data;
    if (data.values) {
      const { phone, password, validCode } = data.values;
      if (phone && password && validCode) {
        this.props.registerAction(data.values);
      }
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
    errors.phone = 'Required';
  } else if (phone.length !== 11) {
    errors.phone = 'Must be 11 number';
  } else if (!validCode) {
    errors.validCode = 'Required';
  } else if (!password) {
    errors.password = 'Required';
  } else if (password.length < 8) {
    errors.password = 'Must be 8 characters or more';
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

