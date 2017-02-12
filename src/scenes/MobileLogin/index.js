import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
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
import Spinner from 'react-native-loading-spinner-overlay';

import RenderField from '../../components/RenderField';
import myTheme from '../../theme/base-theme';
import s from './styles';

// import request from '../../utils/request';
import { mobileLogin } from '../../actions/login';
import { removeError } from '../../actions/global';

import { Login } from '../../actions/types';
// import InputField from '../../gear/InputField';

const {
  popRoute,
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
}

class MobileLogin extends Component {
  constructor() {
    super();

    this.state = {
      state: '登录',
    };
  }

  componentWillUnmount() {
    this.props.removeError();
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  login() {
    const data: Data = this.props.data;
    console.log(data);
    if (data.values) {
      const { phone, password } = data.values;
      if (phone && password) {
        this.props.loginAction(data.values);
      }
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
          <Spinner
            visible={pending}
            textContent={'正在注册...'}
            textStyle={{ color: '#FFF' }}
          />
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
            <Text style={{ textAlign: 'center', marginTop: 30 }}>{error}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    loginAction: form => dispatch(mobileLogin(form)),
    removeError: () => dispatch(removeError()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  state: state.mobileLogin,
  data: state.form.mobileLogin,
});

const Final = reduxForm({
  form: 'mobileLogin',
})(MobileLogin);
export default connect(mapStateToProps, bindActions)(Final);
