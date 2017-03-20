import React, { Component } from 'react';
import {
  View,
  Text,
  Grid,
  Row,
  H1,
  H3,
} from 'native-base';
import Countdown from '../../components/Countdown';

import itemClass from '../../components/ItemClass';
import {
  ONGOING,
  CONFIRM_RECEIVE,
  CONFIRM_ARRIVAL,
  ORDER_ISSUE_OVER,
  ORDER_FULFILLED,
  ORDER_ISSUE,
} from '../../constants/orderState';

const { StartItem, EndItem, TimeItem, PayItem } = itemClass(40, { fontWeight: 'bold', color: '#34314c' });

type Props = {
  id: number,
  time: string,
  state: string,
  start: string,
  end: string,
  money: number,
  dead: number,
  dispute: Object,
}

const OngoingTitle = ({ dead }: { dead: number }) =>
  <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
    <H3 style={{ color: '#555', fontWeight: 'bold', margin: 10, padding: 10, borderBottomColor: '#555', borderBottomWidth: 1 }}>发车倒计时</H3>
    <Countdown
      dead={dead}
      style={{ fontSize: 40, fontWeight: 'bold' }}
    />
  </View>;

const CommonTitle = ({ h1, h3, money, reason }: {h1: String, h3: String, money: ?string, reason: ?string}) =>
  <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 10 }}>
    <H1 style={{ color: '#555', fontWeight: 'bold', margin: 10 }}>{h1}</H1>
    <Text style={{ color: '#555' }}>{h3}</Text>
    { money ? <Text style={{ color: '#555' }}>本单最终收入 {money} 元</Text> : undefined}
    { reason ? reason.map((v, i) => <Text key={i} style={{ color: '#555' }}>纠纷原因: {v}</Text>) : undefined}
  </View>;

class ItemMessage extends Component {

  constructor() {
    super();

    this.renderTitle = this.renderTitle.bind(this);
  }

  props: Props

  renderTitle() {
    const { state, dead, dispute } = this.props;
    switch (state) {
      case ONGOING:
        return <OngoingTitle dead={dead} />;
      case CONFIRM_RECEIVE:
        return (
          <CommonTitle
            h1="已经出发"
            h3="一路顺风，开车要小心哦"
          />
        );
      case CONFIRM_ARRIVAL:
        return (
          <CommonTitle
            h1="已经送达"
            h3="等乘客确认后金额即可收入钱包"
          />
        );
      case ORDER_FULFILLED:
        return (
          <CommonTitle
            h1="订单已完成"
            h3="订单收入可在钱包中确认"
          />
        );
      case ORDER_ISSUE:
        return (
          <CommonTitle
            h1="订单纠纷处理中"
            reason={dispute.reason}
          />
        );
      case ORDER_ISSUE_OVER:
        return (
          <CommonTitle
            h1="订单纠纷结束"
            h3={dispute.result}
            money={dispute.money}
          />
        );
      default:
        return undefined;
    }
  }

  render() {
    const { id, time, start, end, money } = this.props;
    return (
      <View style={{ flex: 0, height: 250 }}>
        <Text style={{ color: '#888', marginBottom: 10, marginLeft: 8 }}>订单号：{id}</Text>
        {this.renderTitle()}
        <Grid style={{ flex: 0, height: 110, marginHorizontal: 25, paddingVertical: 15 }}>
          <Row size={50} style={{ justifyContent: 'space-between' }}>
            <StartItem>{start}</StartItem>
            <EndItem>{end}</EndItem>
          </Row>
          <Row size={50} style={{ justifyContent: 'space-between' }}>
            <PayItem>{money}</PayItem>
            <TimeItem>{time}</TimeItem>
          </Row>
        </Grid>
      </View>
    );
  }
}

export default ItemMessage;
