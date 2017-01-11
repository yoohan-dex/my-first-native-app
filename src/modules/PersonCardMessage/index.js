import React from 'react';
import { View, TouchableNativeFeedback, Text, ScrollView } from 'react-native';
import { Field } from 'redux-form';
import { Button, Picker } from 'native-base';

import renderField from '../../components/RenderField';
import PhotoPickerGroup from '../../components/PhotoPickerGroup';

type Props = {
  fetchFront: (uri: Object) => void,
  fetchBack: (uri: Object) => void,
  frontImage: Object,
  backImage: Object,
  nextStep: Function,
};


const PersonCardMessage = (props: Props) => {
  const {
    fetchFront,
    fetchBack,
    frontImage,
    backImage,
    nextStep,
  } = props;
  return (
    <View>
      <Field
        name="realName"
        type="default"
        component={renderField}
        label="真实姓名"
      />
      <Field
        name="personCard"
        type="numeric"
        component={renderField}
        label="身份证号码"
      />
      <PhotoPickerGroup
        source={frontImage}
        defaultText="正面身份证照"
        title="上传正面身份证"
        fetch={fetchFront}
      />
      <PhotoPickerGroup
        source={backImage}
        defaultText="反面身份证照"
        title="上传反面身份证"
        fetch={fetchBack}
      />
      <View style={{ marginVertical: 20 }}>
        <Button
          block
          rounded
          success
          onPress={nextStep}
        >
          确定提交
        </Button>
      </View>
    </View>
  );
};

export default PersonCardMessage;
