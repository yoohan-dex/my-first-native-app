import push from 'jpush-react-native';
import { Platform } from 'react-native';

export default (alias: any, tag: [] = ['0'], callback: Function) => {
  if (Platform.OS === 'android') {
    try {
      push.setAlias(alias, () => {
        push.setTags(tag, () => callback && callback());
      });
    } catch (e) {
      // ...
    }
  }
};
