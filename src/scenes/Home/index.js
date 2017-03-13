import React, { Component } from 'react';
import { ScrollView, Platform } from 'react-native';
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
} from '../../actions/carList';
import { State } from '../../reducers/carList';

import Current from '../../modules/Current';
import List from '../../modules/List';
import Me from '../../modules/Me';

import myTheme from '../../theme/base-theme';

import { changeHomeState } from '../../actions/home';

type Props = {
  getWaiting: () => void,
  robItem: (id: number) => void,
  carList: State,
  home: { tab: string },
  getUnfulfilled: () => void,
  getCancelled: () => void,
  getFulfilled: () => void,
  changeHomeState: (tab: 'home' | 'list' | 'account') => void,
  app: { login: boolean },
  user: Object,
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.robItem = this.robItem.bind(this);
    this.getList = this.getList.bind(this);
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

  getList: () => void
  getList() {
    this.props.getUnfulfilled();
    this.props.getFulfilled();
    this.props.getCancelled();
  }

  robItem(id) {
    this.props.robItem(id);
  }

  props: Props
  renderContent() {
    const { list, robbing, state, unfulfilled, message, fulfilled, cancelled } = this.props.carList;
    const { user } = this.props;
    switch (this.props.home.tab) {
      case 'home':
        return list ?
          <Current
            rows={list}
            state={state}
            robbing={robbing}
            robItem={this.robItem}
          /> :
          <Text style={{ textAlign: 'center', color: '#444', marginTop: 30 }}>{JSON.stringify(user)}</Text>;
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
    const { tab } = this.props.home;
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
              <Badge>2</Badge>
                抢单
                <Icon name="home" />
            </Button>
            <Button
              active={tab === 'list'}
              onPress={() => setState('list')}
            >
                订单
                <Icon name="list" />
            </Button>
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
  };
}

function mapStateToProps(state) {
  return {
    carList: state.carList,
    home: state.home,
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps, bindActions)(Home);
