import React, { Component } from 'react';
import {
  Card,
  CardItem,
  View,
  Text,
  Button,
  Icon,
  Grid,
  Col,
  Row,
} from 'native-base';

import { TouchableNativeFeedback } from 'react-native';
import s from './styles';

type ItemTextProps = {
  text: string,
  icon: string,
  color: string,
}

const ItemText = ({ text, icon, color }: ItemTextProps) =>
  <View style={s.textWrap}>
    <Icon
      name={icon}
      style={[s.icon, { color }, {
        marginLeft: icon === 'ios-pin' ? 2.5 : 0,
        marginRight: icon === 'ios-pin' ? 13 : 10,
      }]}
    />
    <Text style={s.text}>{text}</Text>
  </View>;

class Current extends Component {
  render() {
    return (
      <View>
        
          <Card style={{ flex: 0, borderWidth: 0 }}>
            <CardItem style={{ marginHorizontal: 10, borderBottomWidth: 0}}>
              <Grid>
                <Col size={75}>
                  <ItemText text="广东海洋大学主校区" icon="ios-pin" color="#F16B6F" />
                  <ItemText text="广东海洋大学霞山校区" icon="ios-pin" color="#79BD9A" />
                  <ItemText text="10 : 30 出发" icon="ios-time" color="#F17F42" />
                  <ItemText text="48元" icon="ios-cash" color="#3B8686" />
                </Col>
                <Col size={25} style={{justifyContent: 'flex-end', borderLeftWidth: 1, borderColor: '#c9d6de'}}>
                <Row size={50} style={{ justifyContent: 'center'}}>
                <Button
                  style={{ alignSelf: 'center'}}
                    transparent
                    textStyle={{ color: '#09BB07' }}>
                    <Text>不感兴趣</Text>
                  </Button>
                </Row>
                <Row size={50} style={{ borderTopWidth: 1, borderColor: '#c9d6de', justifyContent: 'center'}}>
                  <Button
                    style={{ alignSelf: 'center'}}
                    transparent
                    textStyle={{ color: '#09BB07' }}>
                    <Icon name="ios-checkmark" style={{color: 'green'}}/>
                    <Text>抢单</Text>
                  </Button>
                </Row>
                </Col>
              </Grid>
            </CardItem>
          </Card>
          <Card style={{ flex: 0, borderWidth: 0 }}>
            <CardItem style={{ marginHorizontal: 10, borderBottomWidth: 0}}>
              <Grid>
                <Col size={75}>
                  <ItemText text="广东海洋大学主校区" icon="ios-pin" color="#F16B6F" />
                  <ItemText text="广东海洋大学霞山校区" icon="ios-pin" color="#79BD9A" />
                  <ItemText text="10 : 30 出发" icon="ios-time" color="#F17F42" />
                  <ItemText text="48元" icon="ios-cash" color="#3B8686" />
                </Col>
                <Col size={25} style={{justifyContent: 'flex-end'}}>

                  <Button transparent style={{alignSelf: 'flex-end'}} textStyle={{color: '#09BB07'}}>
                    <Icon name="ios-checkmark" style={{color: 'green'}}/>
                    <Text>抢单</Text>
                  </Button>
                </Col>
              </Grid>
            </CardItem>
          </Card>
          <Card style={{ flex: 0, borderWidth: 0 }}>
            <CardItem style={{ marginHorizontal: 10, borderBottomWidth: 0}}>
              <Grid>
                <Col size={75}>
                  <ItemText text="广东海洋大学主校区" icon="ios-pin" color="#F16B6F" />
                  <ItemText text="广东海洋大学霞山校区" icon="ios-pin" color="#79BD9A" />
                  <ItemText text="10 : 30 出发" icon="ios-time" color="#F17F42" />
                  <ItemText text="48元" icon="ios-cash" color="#3B8686" />
                </Col>
                <Col size={25} style={{justifyContent: 'flex-end'}}>

                  <Button transparent style={{alignSelf: 'flex-end'}} textStyle={{color: '#09BB07'}}>
                    <Icon name="ios-checkmark" style={{color: 'green'}}/>
                    <Text>抢单</Text>
                  </Button>
                </Col>
              </Grid>
            </CardItem>
          </Card>
      </View>
    );
  }
}

export default Current;
