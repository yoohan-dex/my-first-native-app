import React, { Component } from 'react';

import {
  Button,
  Grid,
  Col,
  View,
} from 'native-base';

import {
  ONGOING,
  CONFIRM_RECEIVE,
  CONFIRM_ARRIVAL,
} from '../../constants/orderState';

type Props = {
  state: string,
  receive: (id: number, latitude: number, longitude: number) => void,
  arrival: (id: number, latitude: number, longitude: number) => void,
  back: (tab: 'home' | 'list' | 'account') => void,
}

const OngoingAction = ({ action, back }: { action: Function, back: Function }) =>
  <Grid style={{ bottom: 0, flex: 0, paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'space-between' }}>
    <Col size={25} style={{ paddingHorizontal: 5 }}>
      <Button
        onPress={back}
        block
        bordered
      >再抢一单</Button>
    </Col>
    <Col size={50}>
      <Button
        onPress={action}
        block
      >已接到所有乘客</Button>
    </Col>
    <Col size={25} style={{ paddingHorizontal: 5 }}>
      <Button block danger bordered>取消订单</Button>
    </Col>
  </Grid>;

const DrivingAction = ({ action }) =>
  <Grid style={{ bottom: 0, flex: 0, paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'space-between' }}>
    <Col size={50}>
      <Button
        onPress={action}
        block
      >已经送达</Button>
    </Col>
  </Grid>;

const CheckingAction = ({ back }) =>
  <Grid style={{ bottom: 0, flex: 0, paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'space-between' }}>
    <Col size={50}>
      <Button
        onPress={back}
        block
      >再去接一单</Button>
    </Col>
  </Grid>;

class ItemAction extends Component {
  constructor() {
    super();

    this.renderAction = this.renderAction.bind(this);
  }
  props: Props


  renderAction() {
    const { receive, arrival, state, back } = this.props;

    switch (state) {
      case ONGOING:
        return <OngoingAction action={receive} back={back} />;
      case CONFIRM_RECEIVE:
        return <DrivingAction action={arrival} />;
      case CONFIRM_ARRIVAL:
        return <CheckingAction back={() => back('home')} />;
      default:
        return undefined;
    }
  }

  render() {
    const { receive, arrival, state } = this.props;

    return (
      <View style={{ bottom: 0, flex: 0 }}>
        {this.renderAction()}
      </View>
    );
  }
}

export default ItemAction;
