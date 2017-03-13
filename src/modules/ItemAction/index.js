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
  ORDER_FULFILLED,
  ORDER_ISSUE,
  ORDER_ISSUE_OVER,
} from '../../constants/orderState';

type Props = {
  state: string,
  receive: (id: number, latitude: number, longitude: number) => void,
  arrival: (id: number, latitude: number, longitude: number) => void,
  back: (tab: 'home' | 'list' | 'account') => void,
  cancel: () => void,
}

const OngoingAction =
  ({ action, back, cancel }: { action: Function, back: Function, cancel: Function }) =>
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
        <Button
          onPress={cancel}
          block
          danger
          bordered
        >取消订单</Button>
      </Col>
    </Grid>;

const DrivingAction = ({ action }: { action: Function }) =>
  <Grid style={{ bottom: 0, flex: 0, paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'space-between' }}>
    <Col size={50}>
      <Button
        onPress={action}
        block
      >已经送达</Button>
    </Col>
  </Grid>;

const CheckingAction = ({ back }: { back: Function }) =>
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
    const { receive, arrival, state, back, cancel } = this.props;

    switch (state) {
      case ONGOING:
        return <OngoingAction action={receive} back={back} cancel={cancel} />;
      case CONFIRM_RECEIVE:
        return <DrivingAction action={arrival} />;
      case CONFIRM_ARRIVAL:
      case ORDER_FULFILLED:
      case ORDER_ISSUE:
      case ORDER_ISSUE_OVER:
        return <CheckingAction back={() => back('home')} />;
      default:
        return undefined;
    }
  }

  render() {
    return (
      <View style={{ bottom: 0, flex: 0 }}>
        {this.renderAction()}
      </View>
    );
  }
}

export default ItemAction;
