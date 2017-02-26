import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import styles from './styles';
import container from '../../components/ListContainer';

const {
  Current,
} = container;

type Props = {
  unfulfilled: Object[],
  fulfilled: Object[],
  cancelled: Object[],
  getItemDetail: (id: number) => void,
}

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
  props: Props
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
        return this.props.unfulfilled ?
          <Current
            dataArray={this.props.unfulfilled}
            getItemDetail={this.props.getItemDetail}
          /> :
          undefined;
      case '2':
        return this.props.unfulfilled ?
          <Current
            dataArray={this.props.unfulfilled}
            getItemDetail={this.props.getItemDetail}
          /> :
          undefined;
      case '3':
        return this.props.unfulfilled ?
          <Current
            dataArray={this.props.unfulfilled}
            getItemDetail={this.props.getItemDetail}
          /> :
          undefined;
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
