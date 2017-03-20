import React, { Component } from 'react';
import {
  View,
} from 'native-base';

import HomeRow, { RowProps } from '../../components/HomeRow';

type Rows = Array<RowProps>
type Props = {
  rows: Rows,
  robItem: (id: String) => void,
  robbing: Boolean,
  state: 'default' | 'success' | 'failed',
  robItemClean: () => void,
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
    this.watchState = this.watchState.bind(this);
  }

  state: State

  componentDidUpdate(preProps) {
    if (this.props.rows !== preProps.rows) {
      this.setState((s, p) => ({
        buttonState: p.rows.map(() => 'add'),
      }));
    }
    this.watchState();
  }
  onPress(index, id) {
    return () => {
      if (!this.state.adding) {
        this.changeState(index, 'adding');
        this.setState({
          index,
          adding: !this.state.adding,
        }, () => {
          this.props.robItem(id);
        });
      }
    };
  }

  watchState() {
    const { adding, index } = this.state;
    if (adding && (index || index === 0) && !this.props.robbing && this.props.state === 'success') {
      this.setState({
        index: '',
        adding: !adding,
      }, () => this.changeState(index, 'success'));
      this.props.robItemClean();
    } else if (adding && (index || index === 0) && !this.props.robbing && this.props.state === 'failed') {
      this.setState({
        index: '',
        adding: !adding,
      }, () => this.changeState(index, 'reject'));
      this.props.robItemClean();
    }
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
  render() {
    return (
      <View>
        {this.props.rows.map((v, i) => (
          <HomeRow
            key={i}
            start={v.start}
            end={v.end}
            time={v.time}
            money={v.money}
            buttonState={this.state.buttonState[i]}
            add={this.onPress(i, v.id)}
            adding={this.state.adding}
          />
        ))}
      </View>
    );
  }
}

export default Current;
