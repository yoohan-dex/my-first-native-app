import React, { Component } from 'react';

import { Text, TextStyle } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';


type Props = {
  dead: number,
  style: TextStyle,
  text: (sec: number, min: number, hour: number) => string,
}

class Countdown extends Component {
  static defaultProps = {
    dead: new Date().getTime(),
    text: ({ sec, min, hour }) => `${hour} : ${min} : ${sec}`,
  }
  constructor(props) {
    super(props);

    this.addZero = time => time < 10 ? `0${time}` : time;
    const now = new Date().getTime();
    const second = (props.dead - now) / 1000;
    this.state = {
      second: second > 0 ? second : 0,
    };
  }


  componentDidMount() {
    this.timer = BackgroundTimer.setInterval(() => this.setState(pre => ({
      second: pre.second > 0 ? pre.second - 1 : 0,
    }), () => {
      if (this.state.second === 0) {
        BackgroundTimer.clearInterval(this.timer);
      }
    }), 1000);
  }

  componentWillUnmount() {
    BackgroundTimer.clearInterval(this.timer);
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
