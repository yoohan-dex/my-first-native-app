// @flow
import React, { Component } from 'react';
import {
  Button,
  View,
} from 'native-base';

import { StyleSheet, TextInput } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

// import myTheme from '../../theme/base-theme';
import { MKTextField } from 'react-native-material-kit';
// import InputField from '../../gear/InputField';

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

// type Props = {
//   onPress: Function,
//   inputGroupStyle: Object|Array<Object>,
//   timing: number,
//   available: boolean,
// }

type Props = {
  input: Object,
  label: string,
  type: string,
  meta: Object,
  button: Function,
}

class ForSms extends Component {
  constructor() {
    super();
    this.state = {
      available: true,
      timing: 0,
    };

    this.handlePress = this.handlePress.bind(this);
  }

  componentWillUnmount() {
    BackgroundTimer.clearInterval(this.timer);
  }
  handlePress() {
    this.props.button();
    this.setState({ available: false, timing: 60 });
    this.timer = BackgroundTimer.setInterval(() => this.setState(pre => ({
      timing: pre.timing - 1,
    }), () => {
      if (this.state.timing <= 0) {
        BackgroundTimer.clearInterval(this.timer);
        this.setState({ available: true });
      }
    }), 1000);
  }
  props: Props
  render() {
    const { input, label, type, meta: { touched, error } } = this.props;
    const { available, timing } = this.state;
    return (
      <View style={styles.inputGroup}>
        <InputField
          {...input}
          renderToHardwareTextureAndroid
          keyboardType={type}
          placeholder={label}
          tintColor={error && touched ? '#EE7785' : '#6E7783'}
          highlightColor={error && touched ? '#EE7785' : '#77AAAD'}
        />
        <Button
          transparent
          style={{ width: 90, height: 36, alignSelf: 'flex-end' }}
          onPress={this.handlePress}
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
  }
}

/* const ButtonForSms = (props: Props) => {
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
};*/


export default ForSms;
