import React, { Component } from 'react';
import {
  View,
  Text,
} from 'native-base';


class SuccessMessage extends Component {
  render() {
    return (
      <View>
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
      </View>
    );
  }
}

export default SuccessMessage;
