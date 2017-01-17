import React, { Component } from 'react';
import { Card } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { Current } from '../ListRow';

const {
  pushRoute,
} = actions;

type Props = {
  dataArray: Array,
  pushRoute: Function,
  navigation: Object,
}

class CurrentContainer extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  props: Props

  handlePress(id) {
    this.props.pushRoute({ key: 'item-detail', id }, this.props.navigation.key);
  }

  renderRow(data, section, row) {
    return (
      <Current
        key={row}
        start={data.start}
        time={data.time}
        end={data.end}
        state={data.state}
        handlePress={this.handlePress}
      />
    );
  }
  render() {
    return (
      <Card
        renderRow={this.renderRow}
        dataArray={this.props.dataArray}
      />
    );
  }
}

function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});



export default {
  Current: connect(mapStateToProps, bindActions)(CurrentContainer),
};
