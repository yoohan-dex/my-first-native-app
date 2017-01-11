import React from 'react';
import {
  InputGroup,
  Input,
  Icon,
  View,
} from 'native-base';

import InputField from '../../gear/InputField';
import s from './styles';

type Props = {
  input: Object,
  label: string,
  type: string,
  meta: Object,
}

const RenderField = ({ input, label, type, meta: { touched, error } }: Props) => (
  <View
    style={s.inputGroup}
    iconRight
  >
    <InputField
      {...input}
      keyboardType={type}
      tintColor={error && touched ? '#EE7785' : '#6E7783'}
      highlightColor={error && touched ? '#EE7785' : '#77AAAD'}
      placeholder={label}
    />
  </View>
  );

export default RenderField;
