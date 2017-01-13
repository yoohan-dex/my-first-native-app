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
import myTheme from '../../theme/base-theme';

const rows = [{
  start: '广东海洋大学主校区',
  end: '广东海洋大学霞山校区',
  time: '20: 30',
  money: '48',
}, {
  start: '广东海洋大学主校区',
  end: '逸福国际',
  time: '20: 40',
  money: '40',
}, {
  start: '广东海洋大学主校区',
  end: '广东海洋大学霞山校区',
  time: '20: 30',
  money: '48',
}, {
  start: '广东海洋大学主校区',
  end: '逸福国际',
  time: '20: 40',
  money: '40',
}, {
  start: '广东海洋大学主校区',
  end: '广东海洋大学霞山校区',
  time: '20: 30',
  money: '48',
}, {
  start: '广东海洋大学主校区',
  end: '逸福国际',
  time: '20: 40',
  money: '40',
}];

class Home extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'home',
      home: <Current rows={rows} />,
      list: <List />,
      account: <Text>account</Text>,
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
        return '当前拼车';
      case 'list':
        return '订单';
      case 'account':
        return '我';
      default:
        return '当前拼车';
    }
  }
  render() {
    const list = this.state.activeTab === 'list';
    const android = Platform.OS === 'android';
    return (
      <Container theme={myTheme}>
        {list && android ? undefined : <Header style={{shadowOpacity: 0}}>
          <Title>{this.renderTitle()}</Title>
        </Header> }
        {this.state.activeTab === 'home' || this.state.activeTab === 'account' ? <ScrollView>
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
                当前
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
