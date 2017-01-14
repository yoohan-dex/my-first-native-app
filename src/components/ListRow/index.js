import React from 'react';
import {
  CardItem,
  Grid,
  Col,
  Row,
  Text,
} from 'native-base';

import ItemText from '../../gear/ItemText';
import Countdown from '../Countdown';

type Props = {
  start: string,
  end: string,
  time: string,
  handlePress: Function,
}
const Current = ({ start, end, time, handlePress }: Props) => {
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
        <Col size={40} style={{ padding: 20 }}>
          <Grid>
            <Row size={50} style={{ justifyContent: 'center' }}>
              <Text>出车倒计时</Text>
            </Row>
            <Row size={50} style={{ justifyContent: 'center' }}>
              <Text>20: 20</Text>
            </Row>
          </Grid>
        </Col>
      </Grid>
    </CardItem>
  );
};

export { Current };

