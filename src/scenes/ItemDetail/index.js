import React, { Component, PropTypes } from 'react';
import {
  Container,
  View,
  Header,
  Title,
  Button,
  Icon,
} from 'native-base';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import myTheme from '../../theme/base-theme';

import ItemMessage from '../../modules/ItemMessage';
import Passenger from '../../modules/Passenger';
import Comments from '../../modules/Comments';
import ItemAction from '../../modules/ItemAction';

import { removeItemDetial } from '../../actions/carList';
import {
  receive,
  arrival,
  cancel,
} from '../../actions/action';
import { changeHomeState } from '../../actions/home';
import * as c from '../../constants/orderState';

const {
  popRoute,
} = actions;

type Props = {
  popRoute: () => void,
  navigation: { key: String },
  detail: {
    id: Number,
    start: String,
    end: String,
    time: String,
    money: Number,
    state: String,
    dead: Number,
    passengers: [],
    comments: [],
    dispute: Object,
  },
  action: { pending: Boolean },
  removeDetail: () => void,
  receivePassenger: (id: Number, latitude: Number, longitude: Number) => void,
  arrivalConfirm: (id: Number, latitude: Number, longitude: Number) => void,
  cancelItem: (id: Number) => void,
  changeHomeState: (tab: 'home' | 'list' | 'account') => void,
}

class ItemDetail extends Component {

  constructor() {
    super();

    this.confirmReceive = this.confirmReceive.bind(this);
    this.confirmArrival = this.confirmArrival.bind(this);
    this.back = this.back.bind(this);
    this.cancel = this.cancel.bind(this);
    this.passengerModule = this.passengerModule.bind(this);
  }

  getCurrentPosition(callback) { // eslint-disable-line
    navigator.geolocation.getCurrentPosition((position) => { // eslint-disable-line
      const { latitude, longitude } = position.coords;
      callback(latitude, longitude);
    }, err => Alert.alert('GPS有问题，查看是否打开GPS定位'), { // eslint-disable-line
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 1000,
    });
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
    setTimeout(() => this.props.removeDetail(), 500);
  }

  back() {
    this.popRoute();
    this.props.changeHomeState('home');
  }
  cancel() {
    Alert.alert('确定取消订单吗？', '取消订单会给乘客带来困扰，并且系统将会扣出您的信用分', [{
      text: '我不取消了', onPress: () => console.log('nothing'), style: 'cancel',
    }, {
      text: '确定取消', onPress: () => this.props.cancelItem(this.props.detail.id), style: 'destructive',
    }]);
  }
  confirmReceive() {
    Alert.alert('确定接收到所有乘客了吗？', '', [{
      text: '点错了', onPress: () => console.log('nothing'), style: 'cancel',
    }, {
      text: '确定接到',
      onPress: () => this.getCurrentPosition((latitude, longitude) =>
        this.props.receivePassenger(this.props.detail.id, latitude, longitude)),
      style: 'default',
    }]);
  }

  confirmArrival() {
    Alert.alert('确定已经送达了吗？', '', [{
      text: '点错了', onPress: () => console.log('nothing'), style: 'cancel',
    }, {
      text: '确定接到',
      onPress: () => this.getCurrentPosition((latitude, longitude) =>
        this.props.arrivalConfirm(this.props.detail.id, latitude, longitude)),
      style: 'default',
    }]);
  }

  passengerModule() {
    const { state, passengers, comments } = this.props.detail;
    switch (state) {
      case c.ONGOING:
      case c.CONFIRM_ARRIVAL:
      case c.CONFIRM_RECEIVE:
        return <Passenger passengers={passengers} />;
      case c.ORDER_FULFILLED:
      case c.ORDER_ISSUE_OVER:
        return <Comments comments={comments} />;
      default:
        return <View />;
    }
  }

  props: Props
  render() {
    const { id, start, end, time, money, state, dead, dispute } = this.props.detail;
    const { pending } = this.props.action;
    return (
      <Container theme={myTheme}>
        <Header>
          <Button
            transparent
            onPress={() => this.popRoute()}
          >
            <Icon name="arrow-back" />
          </Button>
          <Title>订单详情</Title>
        </Header>
        <View style={{ flex: 1, width: null, height: null, backgroundColor: 'white' }}>
          <Spinner
            visible={!this.props.detail || pending}
          />
          {this.props.detail ?
            <ItemMessage
              id={id}
              start={start}
              end={end}
              time={time}
              money={money}
              state={state}
              dead={dead}
              dispute={dispute}
            /> : undefined }
          {this.passengerModule()}
          <ItemAction
            state={state}
            receive={this.confirmReceive}
            arrival={this.confirmArrival}
            back={this.back}
            cancel={this.cancel}
          />
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    removeDetail: () => dispatch(removeItemDetial()),
    receivePassenger: (id, latitude, longitude) => dispatch(receive(id, longitude, latitude)),
    arrivalConfirm: (id, latitude, longitude) => dispatch(arrival(id, longitude, latitude)),
    cancelItem: id => dispatch(cancel(id)),
    changeHomeState: tab => dispatch(changeHomeState(tab)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  detail: state.carList.detail,
  action: state.action,
});


export default connect(mapStateToProps, bindActions)(ItemDetail);
