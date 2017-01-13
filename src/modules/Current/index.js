import React, { Component } from 'react';
import {
  Card,
  CardItem,
  View,
  Text,
  Button,
  Icon,
  Grid,
  Col,
  Row,
  Thumbnail,
} from 'native-base';

import s from './styles';

import HomeRow, { RowProps } from '../../components/HomeRow';

type Rows = Array<RowProps>
type Props = {
  rows: Rows,
}

type State = {
  buttonState: Array,
}

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: props.rows.map(() => 'add'),
    };

    this.add = this.add.bind(this);
  }

  state: State

  add(index) {
    return () => this.setState((prev) => {
      const current = prev.buttonState;
      current[index] = 'adding';
      return {
        buttonState: current,
      };
    }, () => setTimeout(() => {
      this.setState((prev) => {
        const current = prev.buttonState;
        current[index] = 'success';
        return {
          buttonState: current,
        };
      });
    }, 1000));
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
        add={this.add(i)}
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
