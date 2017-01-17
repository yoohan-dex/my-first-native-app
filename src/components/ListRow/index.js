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

type Props = {
  start: string,
  end: string,
  time: string,
  state: 'ongoing' | 'issue' | 'checking' | 'driving',
  handlePress: Function,
}

const Ongoing = () => <Countdown
  dead={new Date().getTime() + 10000000}
  style={{
    fontWeight: 'bold',
    fontSize: 22,
  }}
/>;

const State = props => <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center', alignSelf: 'center' }}>{props.children}</Text>;
const Current = ({ start, end, time, handlePress, state }: Props) => {
  const parseState = () => {
    switch (state) {
      case 'ongoing':
        return <Ongoing />;
      case 'checking':
        return <State>等待乘客确认订单</State>;
      case 'driving':
        return <State>已载到乘客</State>;
      case 'issue':
        return <State>纠纷处理中</State>;
      default:
        return <Ongoing />;
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
          { state === 'ongoing'
          ? <Grid>
            <Row size={50} style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>出车倒计时</Text>
            </Row>
            <Row size={50} style={{ justifyContent: 'center' }}>
              {parseState()}
            </Row>
          </Grid>
          : parseState()
        }
        </Col>
      </Grid>
    </CardItem>
  );
};

export { Current };

