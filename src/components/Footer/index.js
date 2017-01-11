import React, { Component } from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Badge,
} from 'native-base';

class CustomFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Badge>2</Badge>
            <Icon name="ios-timer" />
          </Button>
          <Button>
            <Icon name="ios-list-box" />
          </Button>
          <Button>
            <Icon name="ios-people" />
          </Button>
          <Button>
            <Icon name="ios-person" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default CustomFooter;
