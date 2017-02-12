import { AlertIOS, AlertAndroid, Platform, AlertButton, AlertOptions } from 'react-native';

export default (title, message, button: AlertButton, options: AlertOptions) => {
  if (Platform.OS === 'ios') {
    AlertIOS.alert(title, message, button);
  } else {
    AlertAndroid.alert(title, message, button, options);
  }
};
