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
import { Field, reduxForm } from 'redux-form';

import RenderField from '../../components/RenderField';
import myTheme from '../../theme/base-theme';
import s from './styles';

// import InputField from '../../gear/InputField';

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
          <Title>手机登陆</Title>
        </Header>
        <View style={s.container}>
          <Field
            name="realName"
            type="numeric"
            component={RenderField}
            label="手机号码"
          />
          <Field
            name="personCard"
            type="default"
            component={RenderField}
            label="密码"
          />
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

const Final = reduxForm({
  form: 'mobileLogin',
})(MobileLogin);
export default connect(mapStateToProps, bindActions)(Final);
