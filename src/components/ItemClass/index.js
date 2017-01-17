import React from 'react';
import { TextStyle } from 'react-native';
import ItemText, { ItemDoubleText } from '../../gear/ItemText';

type Props = {
  children: string,
}

type P = {
  leftText: string,
  rightText: string,
}
const height = 40;

const startItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={children} style={s && s} height={h && h} icon="room" color="#F16B6F" />;
const endItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={children} style={s && s} height={h && h} icon="room" color="#79BD9A" />;
const timeItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={`${children} 出发`} style={s && s} height={h && h} icon="schedule" color="#F17F42" />;
const payItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={`收入 ${children} 元`} style={s && s} height={h && h} icon="payment" color="#519D9E" />;
const callItem = (h = height, s: TextStyle) => ({ leftText, rightText }: P) => <ItemDoubleText leftText={leftText} rightText={rightText} style={s && s} height={h && h} icon="call" color="#8EC0E4" />;

export default (h, s) => ({
  StartItem: startItem(h, s),
  EndItem: endItem(h, s),
  TimeItem: timeItem(h, s),
  PayItem: payItem(h, s),
  CallItem: callItem(h, s),
});

const StartItem = startItem();
const EndItem = endItem();
const TimeItem = timeItem();
const PayItem = payItem();
const CallItem = callItem();

export {
  StartItem,
  EndItem,
  TimeItem,
  PayItem,
  CallItem,
};
