import ImagePicker from 'react-native-image-picker';

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
  ImagePicker.launchCamera(options, res => callback({
    uri: `data:image/jpeg;base64,${res.data}`, isStatic: true,
  }));
};

const launchGallery = (callback) => {
  ImagePicker.launchImageLibrary(options, res => callback({
    uri: `data:image/jpeg;base64,${res.data}`, isStatic: true,
  }));
};

export {
  launchCamera,
  launchGallery,
};
