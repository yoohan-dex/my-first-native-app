import React, { Component } from 'react';
import { ScrollView, Platform } from 'react-native';
import {
  Container,
  Content,
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

import Current from '../../modules/Current';
import List from '../../modules/List';
import Me from '../../modules/Me';

import myTheme from '../../theme/base-theme';

import homemock from '../../mock/home';
import listmock from '../../mock/list';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'home',
      home: <Current rows={homemock} />,
      list: <List rows={listmock} />,
      account: <Me />,
    };

    this.renderTitle = this.renderTitle.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    const { home, list, account } = this.state;
    switch (this.state.activeTab) {
      case 'home':
        return home;
      case 'list':
        return list;
      case 'account':
        return account;
      default:
        return home;
    }
  }

  renderTitle() {
    switch (this.state.activeTab) {
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
    const list = this.state.activeTab === 'list';
    const android = Platform.OS === 'android';
    return (
      <Container theme={myTheme}>
        {list && android ? undefined : <Header style={{ shadowOpacity: 0 }}>
          <Title>{this.renderTitle()}</Title>
        </Header> }
        {this.state.activeTab === 'home' || this.state.activeTab === 'account' ? <ScrollView style={{ backgroundColor: '#eee' }}>
          {this.renderContent()}
        </ScrollView> : undefined }
        {this.state.activeTab === 'list'
        ? <View>{this.renderContent()}</View>
        : undefined}
        <Footer>
          <FooterTab>
            <Button
              active={this.state.activeTab === 'home'}
              onPress={() => this.setState({
                activeTab: 'home',
              })}
            >
              <Badge>2</Badge>
                抢单
                <Icon name="home" />
            </Button>
            <Button
              active={this.state.activeTab === 'list'}
              onPress={() => this.setState({
                activeTab: 'list',
              })}
            >
                订单
                <Icon name="list" />
            </Button>
            <Button
              active={this.state.activeTab === 'account'}
              onPress={() => this.setState({
                activeTab: 'account',
              })}
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

export default Home;
