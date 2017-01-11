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
  Text,
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { startSMSTiming } from '../../actions/forSMS';

import renderField from '../../components/RenderField';

import ButtonForSms from '../../components/ButtonForSms';
import myTheme from '../../theme/base-theme';
import s from './styles';


const {
  popRoute,
  pushRoute,
} = actions;

class MobileRegister extends Component {

  static propTypes = {
    popRoute: PropTypes.func,
    pushRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
    }),
    sms: PropTypes.shape({
      available: PropTypes.bool,
      timing: PropTypes.number,
    }),
    startTiming: PropTypes.func,
  }
  constructor() {
    super();
    this.state = {
      uri: '',
    };
  }


  getSMS() {
    const { startTiming } = this.props;
    startTiming(60);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route }, this.props.navigation.key);
  }

  render() {
    const { available, timing } = this.props.sms;
    
    return (
      <Container theme={myTheme}>
        <Header>
          <Button
            transparent
            onPress={() => this.popRoute()}
          >
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>手机注册</Title>
        </Header>
        <View style={s.container}>
          <ButtonForSms
            onPress={() => this.getSMS()}
            inputStyle={s.input}
            available={available}
            timing={timing}
          />
          <Field
            name="realName"
            type="default"
            component={renderField}
            label="真实姓名"
          />
          <Field
            name="personCard"
            type="numeric"
            component={renderField}
            label="身份证号码"
          />
          <View style={s.buttonGroup}>
            <Button
              
              rounded
              block
              success
              onPress={() => this.pushRoute('register-message')}
            >
              注册
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
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    startTiming: second => dispatch(startSMSTiming(second)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  sms: state.forSMS,
});
const component = reduxForm({
  form: 'Register',
})(MobileRegister);
export default connect(mapStateToProps, bindActions)(component);

