import React, { Component } from 'react';
import {
  Container,
  View,
  Card,
  CardItem,
  Grid,
  Col,
  Text,
  Row,
  Header,
  Title,
} from 'native-base';
import myTheme from '../../theme/base-theme';

import ItemMessage from '../../modules/ItemMessage';
import Passenger from '../../modules/Passenger';

class ItemDetail extends Component {
  render() {
    return (
      <Container theme={myTheme}>
        <Header>
          <Title>订单详情</Title>
        </Header>
        <View style={{ flex: 1, width: null, height: null, backgroundColor: 'white' }}>
          <ItemMessage />
          <Passenger />
        </View>
      </Container>
    );
  }
}

export default ItemDetail;
