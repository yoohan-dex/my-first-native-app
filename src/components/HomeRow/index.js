import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Grid,
  Col,
} from 'native-base';
import { RectangleButton } from 'react-native-button-component';

import ItemText from '../../gear/ItemText';

export type RowProps = {
  start: string,
  end: string,
  time: string,
  money: number,
  buttonState: string,
  add: Function,
  reject: Function,
}

const Row = ({ start, end, time, money, add, reject, buttonState }: RowProps) => (
  <Card style={{ flex: 0, borderWidth: 0 }}>
    <CardItem style={{ marginLeft: 10, borderBottomWidth: 0 }}>
      <Grid>
        <Col size={75}>
          <ItemText text={start} icon="room" color="#F16B6F" />
          <ItemText text={end} icon="room" color="#79BD9A" />
          <ItemText text={`${time} 出发`} icon="schedule" color="#F17F42" />
        </Col>
        <Col size={25} style={{ justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 15, borderLeftWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ textAlign: 'center', color: 'green', fontSize: 20, lineHeight: 30, fontWeight: 'bold', marginBottom: 10 }}>{`${money} 元`}</Text>
          <RectangleButton
            buttonState={buttonState}
            style={{ alignSelf: 'center', borderRadius: 5 }}
            height={45}
            width={70}
            type="primary"
            gradientStart={{ x: 0.5, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}
            onPress={() => {}}
            text="Button"
            states={{
              add: {
                backgroundColors: ['#4DC7A4', '#66D37A'],
                text: '抢单',
                onPress: add,
              },
              adding: {
                gradientStart: { x: 0.8, y: 1 },
                gradientEnd: { x: 1, y: 1 },
                backgroundColors: ['#e94e77', '#d68189'],
                spinner: true,
                text: '抢单中',
              },
              success: {
                backgroundColors: ['#4DC7A4', '#66D37A'],
                text: '抢单成功',
              },
              reject: {
                backgroundColors: ['#4DC7A4', '#66D37A'],
                text: '抢单失败',
                onPress: reject,
              },
            }}
          />
        </Col>
      </Grid>
    </CardItem>
  </Card>
);

export default Row;
