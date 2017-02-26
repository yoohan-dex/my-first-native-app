import React, { Component } from 'react';
import {
  View,
  Text,
  Container,
  Header,
  Title,
} from 'native-base';

import mytheme from '../../theme/base-theme';

class SuccessPage extends Component {
  render() {
    return (
      <Container theme={mytheme}>
        <Header>

          <Title>
            上传审核资料成功
          </Title>
        </Header>
        <View style={{ padding: 20 }}>
          <Text>
            将会在两个工作日内完成资料审核，届时将会发送信息给您
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

export default SuccessPage;
