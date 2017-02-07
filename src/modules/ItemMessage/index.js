import React, { Component } from 'react';
import {
  View,
  Text,
  Grid,
  Col,
  Row,
  H2,
} from 'native-base';
import Countdown from '../../components/Countdown';

import itemClass from '../../components/ItemClass';

const { StartItem, EndItem, TimeItem, PayItem } = itemClass(40, { fontWeight: 'bold', color: '#34314c' });

class ItemMessage extends Component {
  render() {
    return (
      <View style={{ flex: 0, height: 250 }}>
        <Text style={{ color: '#888', marginBottom: 10, marginLeft: 8 }}>订单号：233333333333</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 10 }}>
          <H2 style={{ color: '#555', fontWeight: 'bold', margin: 10 }}>发车倒计时</H2>
          <Countdown
            dead={new Date().getTime() + 10000000}
            style={{ fontSize: 40, fontWeight: 'bold' }}
          />
        </View>
        <Grid style={{ flex: 0, height: 110, marginHorizontal: 25, paddingVertical: 15 }}>
          <Row size={50} style={{ justifyContent: 'space-between' }}>
            <StartItem>广东海洋大学</StartItem>
            <EndItem>清华大学</EndItem>
          </Row>
          <Row size={50} style={{ justifyContent: 'space-between' }}>
            <PayItem>30</PayItem>
            <TimeItem>20: 30</TimeItem>
          </Row>
        </Grid>
      </View>
    );
  }
}

export default ItemMessage;
