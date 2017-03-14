import React, { Component } from 'react';
import { Animated } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { View, Text } from 'native-base';
import styles from './styles';
import ListContainer from '../../components/ListContainer';

type Props = {
  unfulfilled: Object[],
  fulfilled: Object[],
  cancelled: Object[],
}

const Message = () => (
  <View style={{ marginVertical: 30 }}>
    <Text style={{ textAlign: 'center' }}>没有订单哦</Text>
  </View>
);

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
    const { unfulfilled, fulfilled, cancelled } = this.props;
    switch (route.key) {
      case '1':
        return unfulfilled ?
          <ListContainer
            dataArray={unfulfilled}
          /> :
          <Message />;
      case '2':
        return fulfilled ?
          <ListContainer
            dataArray={fulfilled}
          /> :
          <Message />;
      case '3':
        return cancelled ?
          <ListContainer
            issue
            dataArray={cancelled}
          /> :
          <Message />;
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
