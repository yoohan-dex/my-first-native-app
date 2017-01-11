import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  View,
  Text,
  Input,
  InputGroup,
} from 'native-base';
import { View as NativeView, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import ActionSheet from 'react-native-actionsheet';

import PersonCardMessage from '../../modules/PersonCardMessage';
import VehicleMessage from '../../modules/VehicleMessage';

import renderField from '../../components/RenderField';
import StepIndicator from '../../components/StepIndicator';
import PhotoPickerGroup from '../../components/PhotoPickerGroup';
import imagePicker from '../../utils/imagePicker';

import mytheme from '../../theme/base-theme';
import s from './styles';

type State = {
    step: number,
    frontImage: Object,
    backImage: Object,
    certification: Object,
    licence: Object,
    car: Object,
  }

class RegisterMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      backImage: '',
      frontImage: '',
      certification: '',
      licence: '',
      car: '',
    };

    this.nextStep = this.nextStep.bind(this);
    this.preStep = this.preStep.bind(this);
    this.setBackImage = this.setBackImage.bind(this);
    this.setFrontImage = this.setFrontImage.bind(this);
    this.setCar = this.setCar.bind(this);
    this.setCertification = this.setCertification.bind(this);
    this.setLicence = this.setLicence.bind(this);
  }

  state: State

  setFrontImage(uri) {
    this.setState({
      frontImage: uri,
    });
  }

  setBackImage(uri) {
    this.setState({
      backImage: uri,
    });
  }
  setCar(uri) {
    this.setState({
      car: uri,
    });
  }
  setCertification(uri) {
    this.setState({
      certification: uri,
    });
  }
  setLicence(uri) {
    this.setState({
      licence: uri,
    });
  }

  scrollView: ScrollView

  scrollToTopImmiately() {
    this.ScrollView.scrollTo({ y: 0, animated: false });
  }
  scrollToTop() {
    this.ScrollView.scrollTo({ y: 0 });
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1,
    }, this.scrollToTop);
  }

  preStep() {
    this.setState({
      step: this.state.step - 1,
    }, this.scrollToTopImmiately);
  }

  render() {
    console.log('front', this.state.frontImage);
    return (
      <Container theme={mytheme}>
        <Header>

          <Title>
            上传审核资料
          </Title>
        </Header>
        <ScrollView
          ref={ref => (this.ScrollView = ref)}
          style={{ backgroundColor: '#F0F0F0', flex: 1, width: null, height: null }}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps
        >
          <StepIndicator active={this.state.step} />
          <NativeView style={s.formGroup}>
            {this.state.step === 0
              ? <PersonCardMessage
                nextStep={this.nextStep}
                fetchBack={this.setBackImage}
                fetchFront={this.setFrontImage}
                backImage={this.state.backImage}
                frontImage={this.state.frontImage}
              />
              : <VehicleMessage
                getImageFromUser={() => this.getImageFromUser()}
                nextStep={this.nextStep}
                preStep={this.preStep}
                fetchCar={this.setCar}
                fetchCertification={this.setCertification}
                fetchLicence={this.setLicence}
                car={this.state.car}
                certification={this.state.certification}
                licence={this.state.licence}
              />
            }
          </NativeView>
        </ScrollView>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const { realName, personCard } = values;
  if (!realName) {
    errors.realName = 'Required';
  } else if (!personCard) {
    errors.personCard = 'Required';
  } else if (personCard.length !== 15 && personCard.length !== 18) {
    errors.personCard = 'Must be 15 characters or less';
  }
  return errors;
};

export default reduxForm({
  form: 'RegisterMessage',
  validate,
})(RegisterMessage);
// <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <Button onPress={this.show.bind(this)}>SHOW</Button>

//             <ActionSheet 
//               ref={(o) => this.ActionSheet = o}
//               title="确认要退出登录吗？"
//               options={buttons}
//               cancelButtonIndex={CANCEL_INDEX}
//               destructiveButtonIndex={DESTRUCTIVE_INDEX}
//             />
//           </View>