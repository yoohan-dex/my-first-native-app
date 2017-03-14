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
} from 'native-base';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import myTheme from '../../theme/base-theme';

import { bindWechat, fetchBalance, withdraw } from '../../actions/action';

type Props = {
  user: { bind: boolean, total: Number, withdrawMoney: Number },
  popRoute: () => void,
  bindWechat: () => void,
  fetchBalance: () => void,
  withdraw: () => void,
  navigation: {
    key: String,
  }
}

const {
  popRoute,
} = actions;

class Wallet extends Component {

  componentDidMount() {
    this.props.fetchBalance();
  }

  props: Props
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
              <Icon active name="credit-card" style={{ fontSize: 20, lineHeight: 19 }} />
              <Text>钱包</Text>
            </CardItem>
            <CardItem cardBody>
              <View style={{ flex: 0 }}>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>
                    可提现余额：
                  </Text>
                  <Text>
                    {this.props.user.total || 0}元
                  </Text>
                </View>
                {this.props.user.withdrawMoney ?
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ color: '#444' }}>
                      审核中金额：
                    </Text>
                    <Text style={{ color: '#444' }}>
                      {this.props.user.withdrawMoney}元
                    </Text>
                  </View> :
                  undefined
                }
              </View>
              
            </CardItem>
          </Card>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>
            {
              this.props.user.bind ?
                <Button style={{ backgroundColor: '#09BB07' }} onPress={this.props.withdraw}>提现到微信钱包</Button> :
                <Button style={{ backgroundColor: '#09BB07' }} onPress={this.props.bindWechat}>绑定微信钱包</Button>
              }
          </View>
          {this.props.user.bind ? undefined :
          <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ color: '#444' }}>提现之前需要绑定微信钱包</Text>
          </View>
            }
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    bindWechat: () => dispatch(bindWechat()),
    fetchBalance: () => dispatch(fetchBalance()),
    withdraw: () => dispatch(withdraw()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  user: state.user,
});

export default connect(mapStateToProps, bindActions)(Wallet);
