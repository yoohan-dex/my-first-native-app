import React, { Component } from 'react';
import {
  List,
  ListItem,
  View,
  Text,
  Icon,
} from 'native-base';
import { ScrollView } from 'react-native';
import Communications from 'react-native-communications';

import { CallItem } from '../../components/ItemClass';


class Passenger extends Component {
  render() {
    return (
      <View>
        <ListItem itemDivider style={{ backgroundColor: 'white' }}>
          <Text style={{ color: '#888' }}>联系乘客</Text>
        </ListItem>
        <ScrollView style={{ flex: 1 }}>
          <List>
            <ListItem button onPress={() => Communications.phonecall('13824829707', true)}>
              <CallItem
                leftText="Amy"
                rightText="1388284828"
              />
            </ListItem>
            <ListItem button>
              <CallItem
                leftText="Amy"
                rightText="1388284828"
              />
            </ListItem>
            <ListItem button>
              <CallItem
                leftText="Amy"
                rightText="1388284828"
              />
            </ListItem>
            <ListItem button>
              <CallItem
                leftText="Amy"
                rightText="1388284828"
              />
            </ListItem>
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default Passenger;
