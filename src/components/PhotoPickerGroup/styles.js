
const React = require('react-native');

const { StyleSheet } = React;


module.exports = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 240,
    width: null,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    padding: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#52616a',
    lineHeight: 15,
  },
  titleButton: {
  },
  titleButtonText: {
    color: '#52616a',
    fontWeight: 'bold',
  },
  imageView: {
    height: 200,
    width: null,
  },
  image: {
    flex: 1,
    width: null,
    height: 200,
    justifyContent: 'center',
  },
  imageText: {
    alignSelf: 'center',
    color: '#eee',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});
