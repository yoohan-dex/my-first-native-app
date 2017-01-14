import React, { Component } from 'react';

import { Text, TextProperties } from 'react-native';

type Props = {
  dead: number,
  style: TextProperties.style,
  text: Function,
}

class Countdown extends Component {
  static defaultProps = {
    dead: new Date().getTime(),
    text: ({ sec, min, hour }) => `${hour} : ${min} : ${sec}`,
  }
  constructor(props) {
    super(props);

    this.addZero = function (time) {
      return time <= 10 ? time : `0${time}`;
    };
    const now = new Date().getTime();
    const second = (props.dead - now) / 1000;
    this.state = {
      second,
    };
  }


  componentDidMount() {
    this.timer = setInterval(() => this.setState(pre => ({
      second: pre.second - 1,
    }), () => {
      if (this.state.second <= 0) {
        clearInterval(this.timer);
      }
    }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  props: Props

  parseTime() {
    const { second } = this.state;
    const hour = this.addZero(Math.ceil(parseInt(second / 60 / 60, 10)));
    const min = this.addZero(Math.floor(parseInt((second / 60) % 60, 10)));
    const sec = this.addZero(parseInt(second % 60 % 60, 10));
    return {
      hour,
      min,
      sec,
    };
  }
  render() {
    const { style, text } = this.props;
    const time = this.parseTime();
    return (
      <Text style={style}>
        {text(time)}
      </Text>
    );
  }
}

export default Countdown;
