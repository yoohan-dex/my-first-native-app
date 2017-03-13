import React, { Component } from 'react';
import {
  View,
  Text,
  Container,
  Header,
  Title,
  Button,
} from 'native-base';
import { connect } from 'react-redux';

import mytheme from '../../theme/base-theme';
import { logout } from '../../actions/login';

type Props = {
  logout: () => void,
}

class SuccessPage extends Component {
  props: Props
  render() {
    return (
      <Container theme={mytheme}>
        <Header>

          <Title>
            上传审核资料成功
          </Title>
          <Button
            transparent
            onPress={() => this.props.logout()}
          >
            重新登录
          </Button>
        </Header>
        <View style={{ padding: 20 }}>
          <Text>
            将会在两个工作日内完成资料审核，届时将会发送信息通知您
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          <Text>
            客服电话： 99999999
          </Text>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = state => ({
  global: state.global,
});

export default connect(mapStateToProps, bindActions)(SuccessPage);
