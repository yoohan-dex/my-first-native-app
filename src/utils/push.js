import push from 'jpush-react-native';

export default (alias: any, tag: [] = ['0'], callback: Function) => {
  push.setAlias(alias, () => {
    push.getRegistrationID(id => console.log('getRegistrationID: ', id));
  });
};
