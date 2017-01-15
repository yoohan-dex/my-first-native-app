import React, { Component } from 'react';
import { Card } from 'native-base';

import { Current } from '../ListRow';

class CurrentContainer extends Component {

  renderRow(data, section, row, highlight) {
    return (
      <Current
        key={row}
        start={data.start}
        time={data.time}
        end={data.end}
        handlePress={() => ''}
      />
    );
  }
  render() {
    return (
      <Card
        renderRow={this.renderRow}
      />
    );
  }
}

export default CurrentContainer;
