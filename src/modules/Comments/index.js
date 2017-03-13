import React, { Component } from 'react';
import {
  List,
  Card,
  CardItem,
  ListItem,
  View,
  Text,
  Icon,
} from 'native-base';
import { ScrollView, Image } from 'react-native';
import api from '../../api';

import { CommentItem } from '../../components/ItemClass';


type Props = {
  comments: [],
}

const ScoreItem = ({ name, score }) =>
  <View style={{ flexDirection: 'row' }}>
    <Icon name={name} style={{ color: '#d4addf' }} />
    <Text style={{ lineHeight: 22, color: '#444', marginHorizontal: 5 }}>{score}</Text>
  </View>;

class Comments extends Component {

  constructor() {
    super();

    this.state = {
      installed: '???',
      error: '',
      otherMessage: '',
    };

    this.renderItem = this.renderItem.bind(this);
  }

  props: Props
  renderItem(comments, i) {
    const { portrait, content, score, name, id } = comments;
    const uri = {
      uri: 'https'.concat(portrait.slice(4)),
    };
    return (
      <Card key={i}>
        <CardItem header>
          <CommentItem
            uri={uri}
            leftText={name}
          />
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center' }}>{this.state.error ? this.state.error : this.state.installed}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <ScoreItem name="alarm-on" score={5} />
            <ScoreItem name="directions-car" score={3} />
            <ScoreItem name="insert-emoticon" score={5} />
          </View>
          <Text style={{ textAlign: 'center' }}>{this.state.otherMessage}</Text>
        </CardItem>
      </Card>
    );
  }
  render() {
    const { comments } = this.props;
    return (
      <View>
        <ListItem itemDivider style={{ backgroundColor: 'white' }}>
          <Text style={{ color: '#888' }}>乘客评价</Text>
        </ListItem>
        <ScrollView style={{ flex: 1 }}>
          {comments && comments.map(this.renderItem)}
        </ScrollView>
      </View>
    );
  }
}

export default Comments;
