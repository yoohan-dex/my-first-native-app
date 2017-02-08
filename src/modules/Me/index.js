import React, { Component, PropTypes } from 'react';
import {
  Content,
  List,
  ListItem,
  Text,
  Icon,
  View,
} from 'native-base';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import ItemText from '../../gear/ItemText';

const {
  pushRoute,
} = actions;


class Me extends Component {

  static propTypes = {
    pushRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
    }),
  }

  constructor() {
    super();

    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.pushRoute({ key: 'wallet' }, this.props.navigation.key);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <List>
          <ListItem
            button
            onPress={this.handlePress}
          >
            <ItemText text="我的钱包" icon="payment" color="#519D9E" />
          </ListItem>
          <ListItem>
            <ItemText text="关于大圣" icon="bubble-chart" color="#D1B6E1" />
          </ListItem>
          <ListItem itemDivider style={{ height: 20 }}>
            <Text />
          </ListItem>
          <ListItem>
            <ItemText text="退出登录" icon="power-settings-new" color="red" />
          </ListItem>
        </List>
      </View>
    );
  }
}


function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Me);
