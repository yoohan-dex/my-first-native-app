import React, { Component, PropTypes } from 'react';
import {
  Container,
  View,
  Header,
  Title,
  Button,
  Icon,
} from 'native-base';
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
  }

  componentDidMount() {
    console.log(this.props);
  }

  getCurrentPosition(callback) { // eslint-disable-line
    navigator.geolocation.getCurrentPosition((position) => { // eslint-disable-line
      const { latitude, longitude } = position.coords;
      callback(latitude, longitude);
    }, err =>
      alert(JSON.stringify(err)), { // eslint-disable-line
        enableHighAccuracy: true,
        timeout: 20000,
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
    this.props.cancelItem(this.props.detail.id);
  }
  confirmReceive() {
    this.getCurrentPosition((latitude, longitude) =>
      this.props.receivePassenger(this.props.detail.id, latitude, longitude),
    );
  }

  confirmArrival() {
    this.getCurrentPosition((latitude, longitude) =>
      this.props.arrivalConfirm(this.props.detail.id, latitude, longitude),
    );
  }

  props: Props
  render() {
    const { id, start, end, time, money, state, dead, passengers, comments } = this.props.detail;
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
            /> : undefined }
          {passengers ?
            <Passenger passengers={passengers} /> :
            undefined }
          {comments ?
            <Comments comments={comments} />
          : undefined }
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
