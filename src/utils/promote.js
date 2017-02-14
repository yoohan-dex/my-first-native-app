import {
  AlertIOS,
  AlertAndroid,
  AlertButton,
  AlertOptions,
  Platform,
} from 'react-native';

export default (title, message, button: AlertButton, options: AlertOptions) => {
  if (Platform.OS === 'ios') {
    AlertIOS.prompt(title, message, button);
  } else {
    AlertAndroid.prompt(title, message, button, options);
  }
};
