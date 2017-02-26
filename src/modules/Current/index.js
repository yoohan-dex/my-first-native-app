import React, { Component } from 'react';
import {
  View,
} from 'native-base';

import HomeRow, { RowProps } from '../../components/HomeRow';


type Rows = Array<RowProps>
type Props = {
  rows: Rows,
  robItem: (id: string) => void,
  robbing: boolean,
  state: 'default' | 'success' | 'failed',
}

type State = {
  buttonState: Array,
}

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: props.rows.map(() => 'add'),
      adding: false,
      index: '',
    };

    this.changeState = this.changeState.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  state: State

  componentDidUpdate() {
    const { adding, index } = this.state;
    if (adding && index && !this.props.robbing && this.props.state === 'success') {
      this.setState({
        index: '',
        adding: false,
      }, () => setTimeout(() => this.changeState(index, 'success'), 500));
    } else if (adding && index && !this.props.robbing && this.props.state === 'failed') {
      this.setState({
        index: '',
        adding: false,
      }, () => this.changeState(index, 'reject'));
    }
  }

  onPress(index) {
    return () => {
      this.changeState(index, 'adding');
      this.setState({
        index,
      }, () => {
        this.props.robItem(index);
      });
    };
  }

  changeState(index, type: 'adding'| 'success' | 'reject') {
    this.setState((prev) => {
      const current = prev.buttonState;
      current[index] = type;
      return {
        buttonState: current,
      };
    });
  }
  props: Props
  renderRow() {
    const { rows } = this.props;
    return rows.map((v, i) => (
      <HomeRow
        key={i}
        start={v.start}
        end={v.end}
        time={v.time}
        money={v.money}
        buttonState={this.state.buttonState[i]}
        add={this.onPress(v.id)}
        adding={this.state.adding}
      />
    ));
  }

  render() {
    return (
      <View>
        {this.renderRow()}
      </View>
    );
  }
}

export default Current;
