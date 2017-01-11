import { MKTextField } from 'react-native-material-kit';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
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

export default InputField;
