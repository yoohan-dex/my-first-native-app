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
import { ScrollView, Image, Platform } from 'react-native';
import api from '../../api';

import { CommentItem } from '../../components/ItemClass';

type CommnetType = {
  name: string,
  id: number,
  portrait: string,
  content: string,
  score: {
    politeness:number,
    accurateness:number,
    neatness:number,
  }
}


type Props = {
  comments: CommnetType[],
}
const ScoreItem = ({ name, score }: { name: string, score: number }) =>
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
  renderItem: (comment: CommnetType, i: Number) => React.CElement
  renderItem(comment: CommnetType, i) {
    const { portrait, content, score, name } = comment;
    const uri = {
      uri: 'https'.concat(portrait.slice(4)),
    };
    return (
      <Card key={i}>
        <CardItem header style={[Platform.OS === 'ios' ? { height: 50 } : {}, { justifyContent: 'space-between' }]}>
          <CommentItem
            uri={uri}
            leftText={name}
          />
          { !content ?
            <View style={[Platform.OS === 'ios' ? { padding: 8 } : {}, { flex: 0 }]}>
              <Text>未评价</Text>
            </View> :
            <View />}
        </CardItem>
        {score.accurateness ?
          <CardItem>
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>{content}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <ScoreItem name="alarm-on" score={score.accurateness} />
              <ScoreItem name="directions-car" score={score.neatness} />
              <ScoreItem name="insert-emoticon" score={score.politeness} />
            </View>
          </CardItem> :
          <View /> }
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
