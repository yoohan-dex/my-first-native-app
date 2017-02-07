import React, { Component } from 'react';
import {
  Content,
  List,
  ListItem,
  Text,
  Icon,
  View,
} from 'native-base';

import ItemText from '../../gear/ItemText';

class Me extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <List>
          <ListItem button>
            <ItemText text="我的钱包" icon="payment" color="#519D9E" />
          </ListItem>
          <ListItem>
            <ItemText text="我的信用" icon="bubble-chart" color="#D1B6E1" />
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

export default Me;
