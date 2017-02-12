import React, { Component, PropTypes } from 'react';
import {
  View,
  Container,
  Header,
  Button,
  Title,
  Text,
  Icon,
  H1,
  Card,
  CardItem,
  Grid,
  Col,
} from 'native-base';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import myTheme from '../../theme/base-theme';

const {
  popRoute,
} = actions;

class Wallet extends Component {
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
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
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Icon active name="credit-card" style={{ fontSize: 20, lineHeight: 19}} />
              <Text>收入</Text>
            </CardItem>
            <CardItem cardBody>
              <View style={{ flex: 0 }}>
                <H1 style={{ textAlign: 'right' }}>
                  1024元
                </H1>
              </View>
              
            </CardItem>
          </Card>
          <Grid>
            <Col size={75} />
            <Col size={25} style={{ padding: 5 }}>
              <Button block>提现</Button>
            </Col>
          </Grid>
          
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Wallet);
