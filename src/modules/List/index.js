import React, { Component } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { TabViewAnimated, TabBarTop, TabBar } from 'react-native-tab-view';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    backgroundColor: '#52616a',
    height: 56,
  },
  tablabel: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 8,
  },
  indicator: {
    backgroundColor: '#77AAAD',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
  },
});


class List extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: '当前' },
        { key: '2', title: '过去' },
        { key: '3', title: '取消' },
      ],
    };
    this.getLabelText = ({ route }) => route.title;
    this.renderLabel = this.renderLabel.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }


  handleChangeTab(index) {
    this.setState({ index });
  }

  renderLabel(scene) {
    const label = this.getLabelText(scene);
    if (typeof label !== 'string') {
      return null;
    }
    return <Text style={styles.tablabel}>{label}</Text>;
  }

  renderIndicator(props) {
    const { width, position } = props;
    const translateX = Animated.multiply(position, width);
    return (
      <Animated.View
        style={[styles.indicator, { width, transform: [{ translateX }] }]}
      />
    );
  }

  renderHeader(props) {
    return (
      <TabBar
        {...props}
        tabStyle={styles.tab}
        activeOpacity={0.9}
        renderLabel={this.renderLabel}
        renderIndicator={this.renderIndicator}
      />
    );
  }


  renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <View style={[styles.page, { backgroundColor: 'white' }]} />;
      case '2':
        return <View style={[styles.page, { backgroundColor: '#673ab7' }]} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}

export default List;
