import { Platform } from 'react-native';

export default {
  host: `${Platform.OS === 'ios' ? 'https' : 'http'}://www.dashengpinche.com/dashengpinche`,
};
