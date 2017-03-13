import React, { Component } from 'react';
import {
  List,
  ListItem,
  View,
  Text,
  Icon,
  Thumbnail,
} from 'native-base';
import { ScrollView, Image } from 'react-native';
import Communications from 'react-native-communications';

import { CallItem } from '../../components/ItemClass';


type Props = {
  passengers: [],
}

class Passenger extends Component {
  props: Props

  renderItem(passenger, i) {
    const { portrait, phone, name, id } = passenger;
    const uri = {
      uri: 'https'.concat(portrait.slice(4)),
    };
    return (
      <ListItem key={i} button onPress={() => Communications.phonecall(phone.toString(), true)}>
        <CallItem
          uri={uri}
          leftText={name}
          rightText={phone}
        />
      </ListItem>
    );
  }
  render() {
    const { passengers } = this.props;
    return (
      <View>
        <ListItem itemDivider style={{ backgroundColor: 'white' }}>
          <Text style={{ color: '#888' }}>联系乘客({passengers && passengers.length})</Text>
        </ListItem>
        <ScrollView style={{ flex: 1 }}>
          <List>
            {passengers && passengers.map(this.renderItem)}
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default Passenger;
