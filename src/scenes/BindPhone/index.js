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
import { bindPhone } from '../../actions/action';
import { removeMessage } from '../../actions/global';
import { logout } from '../../actions/login';


import api from '../../api';

const {
  popRoute,
  replaceAt,
} = actions;

type Data = {
  values?: {
    phone: Number,
    validCode: Number,
  },
}

type Props = {
  popRoute: Function,
  navigation: Object,
  data: Data,
  bindPhone: (phone: Number, validCode: Number) => void,
  removeMessage: () => void,
  state: {
    pending: Boolean,
    error?: String,
    succeed: Boolean,
  },
  logout: () => void,
}

class BindPhone extends Component {

  constructor() {
    super();

    this.getSMS = this.getSMS.bind(this);
    this.bindPhone = this.bindPhone.bind(this);
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
  bindPhone: () => void
  bindPhone() {
    const { values } = this.props.data;
    if (values) {
      const { phone, validCode } = values;
      if (phone && validCode) {
        this.props.bindPhone(phone, validCode);
      }
    }
  }

  render() {
    const { pending, error, succeed } = this.props.state;

    return (
      <Container theme={myTheme}>
        <Header>
          <Title>绑定手机号码</Title>
          <Button
            transparent
            onPress={() => this.props.logout()}
          >
            重新登录
          </Button>
        </Header>
        <View style={s.container}>
          <Spinner
            visible={pending}
            textContent={'正在绑定手机'}
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
          <View style={s.buttonGroup}>
            <Button
              rounded
              block
              success
              onPress={this.bindPhone}
            >
              确定绑定
            </Button>
            <Text style={{ textAlign: 'center', marginTop: 30 }}>{error || (succeed && '手机绑定成功')}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const validate = (values: { phone: number, validCode: number }) => {
  const errors = {};
  const { phone, validCode } = values;
  if (!phone) {
    errors.phone = 'Required';
  } else if (phone.length !== 11) {
    errors.phone = 'Must be 11 number';
  } else if (!validCode) {
    errors.validCode = 'Required';
  }
  return errors;
};

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    bindPhone: (phone, validCode) =>
      dispatch(bindPhone(phone, validCode)),
    removeMessage: () => dispatch(removeMessage()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  data: state.form.bindPhone,
  state: state.bindPhone,
  global: state.global,
});
const component = reduxForm({
  form: 'bindPhone',
  validate,
})(BindPhone);
export default connect(mapStateToProps, bindActions)(component);

