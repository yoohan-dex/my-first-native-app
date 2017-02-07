import ImagePicker from 'react-native-image-picker';
import { Platform } from 'react-native';

const options = {
  title: '获取图片看看',
  custonButtons: [
    { name: 'fb', title: '从facebook选择图片呢' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


const launchCamera = (callback) => {
  if (Platform.OS === 'android') {
    ImagePicker.launchCamera(options, res => callback({
      uri: res.uri, isStatic: true,
    }));
  } else {
    ImagePicker.launchCamera(options, res => callback({
      uri: res.uri, isStatic: true,
    }));
  }
};

const launchGallery = (callback) => {
  if (Platform.OS === 'android') {
    ImagePicker.launchImageLibrary(options, res => callback({
      uri: res.uri, isStatic: true,
    }));
  } else {
    ImagePicker.launchImageLibrary(options, res => callback({
      uri: res.uri, isStatic: true,
    }));
  }
};

// const launchCamera64 = (callback) => {
//   ImagePicker.launchCamera(options, res => callback({
//     uri: `data:image/jpeg;base64,${res.data}`, isStatic: true,
//   }));
// };

// const launchGallery64 = (callback) => {
//   ImagePicker.launchImageLibrary(options, res => callback({
//     uri: `data:image/jpeg;base64,${res.data}`, isStatic: true,
//   }));
// };

export {
  launchCamera,
  launchGallery,
};
