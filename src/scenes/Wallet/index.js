import React, { Component, PropTypes } from 'react';
import {
  View,
  Container,
  Header,
  Button,
  Title,
  Text,
  Icon,
  Card,
  CardItem,
  Right,
} from 'native-base';

import myTheme from '../../theme/base-theme';

class Wallet extends Component {
  render() {
    return (
      <Container theme={myTheme}>
        <Header>
          <Button
            transparent
            onPress={() => this.popRoute()}
          >
            <Icon name="keyboard-arrow-left" />
          </Button>
          <Title>我的钱包</Title>
        </Header>
        <View>
          <Card>
            <CardItem>
              <Icon active name="cart" />
              <Text>Shopping</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
        </View>
      </Container>
    );
  }
}

Wallet.propTypes = {

};

export default Wallet;
