import React from 'react';
import { TextStyle } from 'react-native';
import ItemText, { ItemDoubleText } from '../../gear/ItemText';

type Props = {
  children: string,
}

type P = {
  leftText: string,
  rightText: string,
  uri: string,
  isComment: Boolean,
}
const height = 40;

const startItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={children} style={s && s} height={h && h} icon="room" color="#F16B6F" />;
const endItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={children} style={s && s} height={h && h} icon="room" color="#79BD9A" />;
const timeItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={`${children} 出发`} style={s && s} height={h && h} icon="schedule" color="#F17F42" />;
const payItem = (h = height, s: TextStyle) => ({ children }: Props) => <ItemText text={`收入 ${children} 元`} style={s && s} height={h && h} icon="payment" color="#519D9E" />;
const callItem = (h = height, s: TextStyle) => ({ leftText, rightText, uri }: P) => <ItemDoubleText leftText={leftText} uri={uri} rightText={rightText} style={s && s} height={h && h} icon="call" color="#8EC0E4" />;
const commentItem = (h = height, s: TextStyle) => ({ leftText, rightText, uri, isComment }: P) => <ItemDoubleText leftText={leftText} uri={uri} rightText={rightText} style={s && s} height={h && h} color={isComment ? '#F16B6F' : '#444'} />;

export default (h, s) => ({
  StartItem: startItem(h, s),
  EndItem: endItem(h, s),
  TimeItem: timeItem(h, s),
  PayItem: payItem(h, s),
  CallItem: callItem(h, s),
  CommentItem: commentItem(h, s),
});

const StartItem = startItem();
const EndItem = endItem();
const TimeItem = timeItem();
const PayItem = payItem();
const CallItem = callItem();
const CommentItem = commentItem();

export {
  StartItem,
  EndItem,
  TimeItem,
  PayItem,
  CallItem,
  CommentItem,
};
