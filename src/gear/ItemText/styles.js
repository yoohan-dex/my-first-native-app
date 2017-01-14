import { Platform } from 'react-native';

const React = require('react-native');

const { StyleSheet } = React;



module.exports = StyleSheet.create({
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  text: {
    color: '#1E2022',
    lineHeight: 20,
  },
});
