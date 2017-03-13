import React, { Component } from 'react';
import { Card } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

import { Normal, Cancelled } from '../ListRow';
import {
  getItemDetail,
} from '../../actions/carList';

const {
  pushRoute,
} = actions;

type Props = {
  dataArray: Array,
  pushRoute: Function,
  navigation: Object,
  getItemDetail: (id: number) => void,
  issue: Boolean,
}

class CurrentContainer extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }
  props: Props

  handlePress(id) {
    return () => {
      this.props.getItemDetail(id);
      this.props.pushRoute({ key: 'item-detail', id }, this.props.navigation.key);
    };
  }

  renderRow(data, section, row) {
    if (!this.props.issue) {
      return (
        <Normal
          key={row}
          start={data.start}
          time={data.time}
          end={data.end}
          state={data.state}
          handlePress={this.handlePress(data.id)}
          dead={data.dead}
        />
      );
    }
    return (
      <Cancelled
        key={row}
        start={data.start}
        time={data.time}
        end={data.end}
        issue={data.issue}
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
    getItemDetail: id => dispatch(getItemDetail(id)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindActions)(CurrentContainer);
