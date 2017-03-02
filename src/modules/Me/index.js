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
import { logout } from '../../actions/login';

const {
  pushRoute,
} = actions;


type Props = {
  pushRoute: (route: { key: string }, props: string) => void,
  navigation: { key: string },
  logout: () => void,
}

class Me extends Component {

  constructor() {
    super();

    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.pushRoute({ key: 'wallet' }, this.props.navigation.key);
  }

  props: Props
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
          <ListItem
            button
            onPress={this.props.logout}
          >
            <ItemText
              text="退出登录"
              icon="power-settings-new"
              color="red"
            />
          </ListItem>
        </List>
      </View>
    );
  }
}


function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Me);
