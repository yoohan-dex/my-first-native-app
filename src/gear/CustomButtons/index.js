import React from 'react';
import { MKButton, MKColor } from 'react-native-material-kit';
import { Text, TouchableNativeFeedback } from 'react-native';
import { Icon, View } from 'native-base';


const CustomButton = () =>
  <TouchableNativeFeedback
    
  >

    <View
      
      pointerEvents="none"
      style={{ margin: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
    >
      <Icon name="weixin" style={{color: 'white'}}/>
      <Text style={{fontWeight: 'bold', marginHorizontal: 5, color: 'white'}}>微信快捷登陆</Text>
    </View>
  </TouchableNativeFeedback>;
export default CustomButton;
