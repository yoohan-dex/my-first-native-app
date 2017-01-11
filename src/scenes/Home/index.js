import React, { Component } from 'react';
import { ScrollView } from 'react-native';
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
} from 'native-base';

import Current from '../../modules/Current';
import myTheme from '../../theme/base-theme';

class Home extends Component {
  render() {
    return (
      <Container theme={myTheme}>
        <Header>
          <Title>当前车单</Title>
        </Header>
        <ScrollView>
          <Current />
        </ScrollView>
        <Footer>
          <FooterTab>
            <Button active>
              <Badge>2</Badge>
                当前
                <Icon name="ios-timer" />
            </Button>
            <Button>
                订单
                <Icon name="ios-list-box" />
            </Button>
            <Button>
                我
                <Icon name="ios-contact-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Home;
