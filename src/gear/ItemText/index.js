import React from 'react';
import {
  View,
  Text,
  Icon,
  Thumbnail,
} from 'native-base';
import { TextStyle } from 'react-native';

import s from './styles';


type ItemTextProps = {
  text: string,
  icon: string,
  color: string,
  style: TextStyle,
  height: number,
}

type ItemDoubleTextProps = {
  leftText: string,
  rightText: string,
  icon: string,
  color: string,
  style: TextStyle,
  height: number,
  uri: string,
}
const ItemText = ({ text, icon, color, style, height }: ItemTextProps) =>
  <View style={[s.textWrap, height && { height }]}>
    <Icon
      name={icon}
      style={[s.icon, { color }]}
    />
    <Text style={[s.text, style && style]}>{text}</Text>
  </View>;

const ItemDoubleText =
  ({ leftText, rightText, icon, color, style, height, uri }: ItemDoubleTextProps) =>
    <View style={[s.textWrap, height && { height }, { justifyContent: 'space-between', height: 30 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Thumbnail
          source={uri}
          defaultSource={require('../../images/fingerprint.png')}
          small
          style={{ marginRight: 8 }}
        />
        <Text style={[s.text, style && style]}>{leftText}</Text>
      </View>
      <View style={[s.textWrap]}>
        <Icon
          name={icon}
          style={[s.icon, { color }]}
        />
        <Text style={[s.text, style && style]}>{rightText}</Text>
      </View>
    </View>;

export default ItemText;
export { ItemDoubleText };
