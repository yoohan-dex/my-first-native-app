import React from 'react';
import {
  View,
  Text,
  Icon,
} from 'native-base';

import s from './styles';


type ItemTextProps = {
  text: string,
  icon: string,
  color: string,
}
const ItemText = ({ text, icon, color }: ItemTextProps) =>
  <View style={s.textWrap}>
    <Icon
      name={icon}
      style={[s.icon, { color }]}
    />
    <Text style={s.text}>{text}</Text>
  </View>;

export default ItemText;
