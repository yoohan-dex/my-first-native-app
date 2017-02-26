import React from 'react';
import { View, TouchableNativeFeedback, Text, ScrollView } from 'react-native';
import { Field } from 'redux-form';
import { Button, Picker } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import renderField from '../../components/RenderField';
import PhotoPickerGroup from '../../components/PhotoPickerGroup';

type Type = 'carImage' | 'idcardImage' | 'idcardOppositeImage' | 'drivinglicenceImage' | 'vehiclelicenceImage';

type Props = {
  fetchFront: (uri: Object) => void,
  fetchBack: (uri: Object) => void,
  frontImage: Object,
  backImage: Object,
  nextStep: Function,
  uploadImage: Function<Type>,
  pending: boolean,
};


const PersonCardMessage = (props: Props) => {
  const {
    fetchFront,
    fetchBack,
    frontImage,
    backImage,
    nextStep,
    uploadImage,
    pending,
  } = props;
  return (
    <View>
      <Spinner
        visible={pending}
        textContent={'正在上传...'}
        textStyle={{ color: '#FFF' }}
      />
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
        uploadImage={uploadImage('idcardImage')}
      />
      <PhotoPickerGroup
        source={backImage}
        defaultText="反面身份证照"
        title="上传反面身份证"
        fetch={fetchBack}
        uploadImage={uploadImage('idcardOppositeImage')}
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
