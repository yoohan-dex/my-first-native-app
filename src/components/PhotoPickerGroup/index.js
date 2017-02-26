// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Icon,
} from 'native-base';
import {
  Image,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { launchCamera, launchGallery } from '../../utils/imagePicker';

import s from './styles';
import defaultPhoto from './defaultPhoto.png';

const buttons = ['取消', '从相册中选取', '拍照'];
const CANCEL_INDEX = 0;
const CHOOSE_FROM_GALLARY = 1;
const TAKE_PHOTO = 2;


type Props = {
  title: string,
  fetch: (source: Object) => void,
  source: Object,
  defaultText: string,
  uploadImage: Function<string>,
}
class PhotoPickerGroup extends Component {

  constructor() {
    super();

    this.state = {
      source: '',
    };

    this.switchAction = this.switchAction.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { source } = nextProps;
    if (source.uri !== this.state.source.uri) {
      this.setState({
        source,
      }, () => {
        if (source.uri) {
          this.props.uploadImage(source);
        }
      });
    }
  }

  switchAction(index) {
    const { fetch } = this.props;
    if (index === CHOOSE_FROM_GALLARY) {
      launchGallery(fetch);
    } else if (index === TAKE_PHOTO) {
      launchCamera(fetch);
    }
  }

  props: Props

  render() {
    const { title, source, defaultText } = this.props;
    let actionSheet;
    const show = () => actionSheet.show();
    return (
      <View style={s.container}>
        <View style={s.title}>
          <Text style={s.titleText}>{title}</Text>
          <Button
            iconRight
            transparent
            style={s.titleButton}
            textStyle={s.titleButtonText}
            onPress={show}
          >
            选择照片
            <Icon name="keyboard-arrow-right" />
          </Button>
          <ActionSheet
            ref={o => (actionSheet = o)}
            title="选择照片"
            options={buttons}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this.switchAction}
          />
        </View>
        <View style={s.imageView}>
          <Image
            style={s.image}
            source={source.uri ? source : defaultPhoto}
          >
            {source.uri ? undefined : <Text style={s.imageText}>{defaultText}</Text>}
          </Image>
        </View>
      </View>
    );
  }
}


export default PhotoPickerGroup;
