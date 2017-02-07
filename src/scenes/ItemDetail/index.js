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
  Button,
  Icon,
} from 'native-base';
import myTheme from '../../theme/base-theme';

import ItemMessage from '../../modules/ItemMessage';
import Passenger from '../../modules/Passenger';
import ItemAction from '../../modules/ItemAction';

class ItemDetail extends Component {
  render() {
    return (
      <Container theme={myTheme}>
        <Header>
          <Button
            transparent
            onPress={() => this.popRoute()}
          >
            <Icon name="arrow-back" />
          </Button>
          <Title>订单详情</Title>
        </Header>
        <View style={{ flex: 1, width: null, height: null, backgroundColor: 'white' }}>
          <ItemMessage />
          <Passenger />
          <ItemAction />
        </View>
      </Container>
    );
  }
}

export default ItemDetail;
