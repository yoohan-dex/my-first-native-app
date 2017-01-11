import React from 'react';
import { View, ScrollView } from 'react-native';
import { Field } from 'redux-form';
import { Button } from 'native-base';

import renderField from '../../components/RenderField';
import PhotoPickerGroup from '../../components/PhotoPickerGroup';
import Picker from '../../components/Picker';

const items = [
  { label: '清华大学', value: '清华大学' },
  { label: '海洋大学', value: '海洋大学' },
  { label: '三本浙大', value: '三本浙大' },
  { label: '伯克利大学', value: '伯克利大学' },
];

type Props = {
  fetchCar: (uri: Object) => void,
  fetchLicence: (uri: Object) => void,
  fetchCertification: (uri: Object) => void,
  licence: Object,
  car: Object,
  certification: Object,
  nextStep: Function,
  preStep: Function,
};


const VehicleMessage = (props: Props) => {
  const {
    fetchCar,
    fetchCertification,
    fetchLicence,
    car,
    certification,
    licence,
    nextStep,
    preStep,
  } = props;
  return (
    <View>
      <Picker items={items} />
      <Field
        name="carNumber"
        type="numeric"
        component={renderField}
        label="车牌号 例如：京P9999"
      />
      <Field
        name="carBrand"
        type="default"
        component={renderField}
        label="汽车品牌 例如：奥迪-Q3"
      />
      <PhotoPickerGroup
        source={car}
        defaultText="汽车照片"
        title="上传汽车照片"
        fetch={fetchCar}
      />
      <PhotoPickerGroup
        source={certification}
        defaultText="驾驶证"
        title="上传驾驶证照片"
        fetch={fetchCertification}
      />
      <PhotoPickerGroup
        source={licence}
        defaultText="行驶证"
        title="上传行驶证照片"
        fetch={fetchLicence}
      />
      <View style={{ marginVertical: 20 }}>
        <Button
          style={{ marginBottom: 10 }}
          block
          rounded
          success
          onPress={nextStep}
        >
          确定提交
        </Button>
        <Button
          block
          rounded
          success
          onPress={preStep}
        >
          上一步
        </Button>
      </View>
    </View>
  );
};

export default VehicleMessage;
