import React from 'react';
import { Text } from 'react-native';
import {
  CardItem,
  Grid,
  Col,
  Row,
} from 'native-base';

import ItemText from '../../gear/ItemText';
import Countdown from '../Countdown';
import {
  ONGOING,
  CONFIRM_RECEIVE,
  CONFIRM_ARRIVAL,
  ORDER_ISSUE,
  ORDER_FULFILLED,
  ORDER_ISSUE_OVER,
} from '../../constants/orderState';

type Props = {
  start: string,
  end: string,
  time: string,
  state: 'ongoing' | 'issue' | 'checking' | 'driving',
  handlePress: Function,
  dead: string,
}

const Ongoing = ({ dead }) => <Countdown
  dead={dead}
  style={{
    fontWeight: 'bold',
    fontSize: 22,
  }}
/>;

const State = props => <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', alignSelf: 'center', color: '#555' }}>{props.children}</Text>;
const Current = ({ start, end, time, handlePress, state, dead }: Props) => {
  const parseState = () => {
    console.log('the state is : ', state);
    switch (state) {
      case ONGOING:
        return <Ongoing dead={dead} />;
      case CONFIRM_ARRIVAL:
        return <State>等待乘客确认订单</State>;
      case CONFIRM_RECEIVE:
        return <State>已载到乘客</State>;
      case ORDER_ISSUE:
        return <State>纠纷处理中</State>;
      case ORDER_FULFILLED:
      case ORDER_ISSUE_OVER:
        return <State>订单完成</State>;
      default:
        return <Ongoing dead={dead} />;
    }
  };

  return (
    <CardItem
      button
      onPress={handlePress}
    >
      <Grid>
        <Col size={60}>
          <ItemText text={start} icon="room" color="#F16B6F" />
          <ItemText text={end} icon="room" color="#79BD9A" />
          <ItemText text={`${time} 出发`} icon="schedule" color="#F17F42" />
        </Col>
        <Col size={40} style={{ paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center' }}>
          <Grid>
            { state === ONGOING ? <Row size={50} style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: '#444' }}>出车倒计时</Text>
            </Row> : <Row size={25} /> }
            <Row size={50} style={{ justifyContent: 'center' }}>
              {parseState()}
            </Row>
          </Grid>
        </Col>
      </Grid>
    </CardItem>
  );
};

export { Current };
