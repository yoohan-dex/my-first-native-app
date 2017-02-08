import React, { Component } from 'react';

import {
  View,
  Button,
  Grid,
  Col,
} from 'native-base';

class ItemAction extends Component {
  render() {
    return (
      <Grid style={{ bottom: 0, flex: 0, paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'space-between' }}>
        <Col size={30} style={{ paddingHorizontal: 5 }}>
          <Button block bordered>再抢一单</Button>
        </Col>
        <Col size={40}>
          <Button block>发车</Button>
        </Col>
        <Col size={30} style={{ paddingHorizontal: 5 }}>
          <Button block danger bordered>取消订单</Button>
        </Col>
      </Grid>
    );
  }
}

export default ItemAction;
