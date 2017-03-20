import React, { Component } from 'react';
import { Alert, ScrollView, Platform } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  Header,
  Button,
  Icon,
  Title,
  Footer,
  FooterTab,
  Badge,
  Text,
  View,
} from 'native-base';

import { connect } from 'react-redux';
import {
  getWaiting,
  robItem,
  getUnfulfilled,
  getCancelled,
  getFulfilled,
  robItemClean,
  getItemDetail,
} from '../../actions/carList';
import { State } from '../../reducers/carList';

import Current from '../../modules/Current';
import List from '../../modules/List';
import Me from '../../modules/Me';

import myTheme from '../../theme/base-theme';

import { changeHomeState, decreaseItemBadge } from '../../actions/home';

const { pushRoute } = actions;

type Props = {
  getWaiting: () => void,
  robItem: (id: number) => void,
  carList: State,
  home: { tab: string, activeItems: number },
  getUnfulfilled: () => void,
  getCancelled: () => void,
  getFulfilled: () => void,
  changeHomeState: (tab: 'home' | 'list' | 'account') => void,
  robItemClean: () => void,
  getItemDetail: (id: number) => void,
  app: { login: boolean },
  pushRoute: (route: {key: string}, key: string) => void,
  decreaseItemBadge: (id: number) => void,
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robingItem: '',
    };
    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.robItem = this.robItem.bind(this);
    this.getList = this.getList.bind(this);
    this.afterRobingSuccess = this.afterRobingSuccess.bind(this);
  }
  componentDidMount() {
    if (this.props.app.login) {
      this.props.getWaiting();
      this.props.getUnfulfilled();
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props.app.login) {
      if (nextProps.home.tab === 'home' && this.props.home.tab !== 'home') {
        this.props.getWaiting();
      } else if (nextProps.home.tab === 'list' && this.props.home.tab !== 'list') {
        this.getList();
      }
    }
  }

  componentDidUpdate(preProps) {
    if (preProps.carList.state !== this.props.carList.state && this.props.carList.state === 'success') {
      Alert.alert(
        '抢单成功',
        '去查看订单详情吗',
        [{
          text: '继续抢单', onPress: () => 0, style: 'cancel',
        }, {
          text: '查看详情', onPress: () => this.afterRobingSuccess(), style: 'default',
        }]);
    }
  }


  getList: () => void
  getList() {
    this.props.getUnfulfilled();
    this.props.getFulfilled();
    this.props.getCancelled();
  }
  afterRobingSuccess() {
    this.props.getItemDetail(this.state.robingItem);
    this.props.pushRoute({ key: 'item-detail' }, 'global');
    this.props.decreaseItemBadge(this.state.robingItem);
  }

  robItem(id) {
    this.setState({ robingItem: id });
    this.props.robItem(id);
  }


  props: Props
  renderContent() {
    const { list, robbing, state, unfulfilled, message, fulfilled, cancelled } = this.props.carList;
    switch (this.props.home.tab) {
      case 'home':
        return list ?
          <Current
            rows={list}
            state={state}
            robbing={robbing}
            robItem={this.robItem}
            robItemClean={this.props.robItemClean}
          /> :
          <Text style={{ textAlign: 'center', color: '#444', marginTop: 30 }}>{message}</Text>;
      case 'list':
        return (
          <List
            unfulfilled={unfulfilled}
            fulfilled={fulfilled}
            cancelled={cancelled}
          />
        );
      case 'account':
        return <Me />;
      default:
        return undefined;
    }
  }

  renderTitle() {
    switch (this.props.home.tab) {
      case 'home':
        return '抢单';
      case 'list':
        return '订单';
      case 'account':
        return '我';
      default:
        return '抢单';
    }
  }
  render() {
    const { tab, activeItems } = this.props.home;
    const { changeHomeState: setState } = this.props;
    const list = tab === 'list';
    const android = Platform.OS === 'android';
    return (
      <Container theme={myTheme}>
        {list && android ? undefined : <Header style={{ shadowOpacity: 0 }}>
          <Title>{this.renderTitle()}</Title>
        </Header> }
        {tab === 'home' || tab === 'account' ? <ScrollView style={{ backgroundColor: '#eee' }}>
          {this.renderContent()}
        </ScrollView> : undefined }
        {tab === 'list'
        ? <View>{this.renderContent()}</View>
        : undefined}
        <Footer>
          <FooterTab>
            <Button
              active={tab === 'home'}
              onPress={() => setState('home')}
            >
                抢单
                <Icon name="home" />
            </Button>
            {
              activeItems.length > 0 ? <Button
                active={tab === 'list'}
                onPress={() => setState('list')}
              >
                <Badge>{activeItems.length}</Badge>
                  订单
                  <Icon name="list" />
              </Button> : <Button
                active={tab === 'list'}
                onPress={() => setState('list')}
              >
                订单
                <Icon name="list" />
              </Button>
            }
            <Button
              active={tab === 'account'}
              onPress={() => setState('account')}
            >
                我
                <Icon name="account-box" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    getWaiting: () => dispatch(getWaiting()),
    robItem: index => dispatch(robItem(index)),
    getUnfulfilled: () => dispatch(getUnfulfilled()),
    changeHomeState: tab => dispatch(changeHomeState(tab)),
    getCancelled: () => dispatch(getCancelled()),
    getFulfilled: () => dispatch(getFulfilled()),
    robItemClean: () => dispatch(robItemClean()),
    getItemDetail: id => dispatch(getItemDetail(id)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    decreaseItemBadge: (id: string) => dispatch(decreaseItemBadge(id)),
  };
}

function mapStateToProps(state) {
  return {
    carList: state.carList,
    home: state.home,
    app: state.app,
  };
}

export default connect(mapStateToProps, bindActions)(Home);
