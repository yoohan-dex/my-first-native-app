import React from 'react';
import { View, ScrollView } from 'react-native';
import { Field } from 'redux-form';
import { Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import renderField from '../../components/RenderField';
import PhotoPickerGroup from '../../components/PhotoPickerGroup';
import Picker from '../../components/Picker';

type Type = 'carImage' | 'idcardImage' | 'idcardOppositeImage' | 'drivinglicenceImage' | 'vehiclelicenceImage';

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
  uploadImage: Function<Type>,
  pending: boolean,
  areaList: Array,
  onAreaChange: (value: number) => void,
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
    uploadImage,
    pending,
    areaList,
    onAreaChange,
  } = props;
  return (
    <View>
      <Spinner
        visible={pending}
        textContent={'正在上传...'}
        textStyle={{ color: '#FFF' }}
      />
      <Picker items={areaList || items} onChange={onAreaChange} />
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
        uploadImage={uploadImage('carImage')}
      />
      <PhotoPickerGroup
        source={certification}
        defaultText="驾驶证"
        title="上传驾驶证照片"
        fetch={fetchCertification}
        uploadImage={uploadImage('drivinglicenceImage')}
      />
      <PhotoPickerGroup
        source={licence}
        defaultText="行驶证"
        title="上传行驶证照片"
        fetch={fetchLicence}
        uploadImage={uploadImage('vehiclelicenceImage')}
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
