// @flow
import React, { Component, PropTypes } from 'react';
import {
  Button,
  InputGroup,
  Input,
  Icon,
  View,
} from 'native-base';

import { StyleSheet, TextInput } from 'react-native';
// import myTheme from '../../theme/base-theme';
import { MKTextField } from 'react-native-material-kit';

const styles = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});


const InputField:TextInput = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({ flex: 1 })
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

type Props = {
  onPress: Function,
  inputGroupStyle: Object|Array<Object>,
  timing: number,
  available: boolean,
}


const ButtonForSms = (props: Props) => {
  const { inputGroupStyle, onPress, timing, available } = props;
  return (
    <View style={[inputGroupStyle, styles.inputGroup]}>
      <InputField
        renderToHardwareTextureAndroid
        keyboardType="numeric"
        placeholder="手机号码"
        tintColor="#6E7783"
        highlightColor="#77AAAD"
      />
      <Button
        transparent
        style={{ width: 90, height: 36, alignSelf: 'flex-end' }}
        onPress={onPress}
        disabled={!available}
        textStyle={{
          fontWeight: 'bold',
          color: available ? '#52616a' : '#888',
        }}
      >
        {
          available ? '验证码' : `等待${timing}秒`
        }
      </Button>
    </View>
  );
};


export default ButtonForSms;
