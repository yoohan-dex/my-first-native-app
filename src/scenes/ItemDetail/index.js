import React, { Component, PropTypes } from 'react';
import {
  Container,
  View,
  Header,
  Title,
  Button,
  Icon,
} from 'native-base';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import myTheme from '../../theme/base-theme';

import ItemMessage from '../../modules/ItemMessage';
import Passenger from '../../modules/Passenger';
import ItemAction from '../../modules/ItemAction';

const {
  popRoute,
} = actions;

class ItemDetail extends Component {

  static propTypes = {
    popRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
    }),
  }

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

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindActions)(ItemDetail);
