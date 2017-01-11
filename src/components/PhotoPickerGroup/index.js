// @flow
import React from 'react';
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


type Props = {
  title: string,
  fetch: (source: Object) => void,
  source: Object,
  defaultText: string,
}
const PhotoPickerGroup = (props: Props) => {
  const { title, fetch, source, defaultText } = props;
  const switchAction = (index) => {
    if (index === 1) {
      launchGallery(fetch);
    } else if (index === 2) {
      launchCamera(fetch);
    }
  };
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
          <Icon name="ios-arrow-forward" />
        </Button>
        <ActionSheet
          ref={o => (actionSheet = o)}
          title="选择照片"
          options={buttons}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={switchAction}
        />
      </View>
      <View style={s.imageView}>
        <Image
          style={s.image}
          source={source || defaultPhoto}
        >
          {source ? undefined : <Text style={s.imageText}>{defaultText}</Text>}
        </Image>
      </View>
    </View>
  );
};

export default PhotoPickerGroup;
