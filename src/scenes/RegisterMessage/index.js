import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Button,
} from 'native-base';
import { View as NativeView, ScrollView, Alert } from 'react-native';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  uploadImage,
  getAreaList,
  uploadCar,
  uploadPersonalCard,
  setArea,
} from '../../actions/register';
import {
  PersonCard,
  CarInfo,
} from '../../actions/types';
import { logout } from '../../actions/login';

import PersonCardMessage from '../../modules/PersonCardMessage';
import VehicleMessage from '../../modules/VehicleMessage';
import SuccessMessage from '../../modules/SuccessMessage';

import StepIndicator from '../../components/StepIndicator';

import mytheme from '../../theme/base-theme';
import s from './styles';

type Type = 'carImage' | 'idcardImage' | 'idcardOppositeImage' | 'drivinglicenceImage' | 'vehiclelicenceImage';

type PersonData = {
  values?: PersonCard,
}

type CarData = {
  values?: CarInfo,
}

type Props = {
  state: Object,
  uploadImage: Function<Type>,
  getAreaList: Function,
  data: Object<PersonCard|CarData>,
  uploadCar: Function<Object<CarInfo>>,
  uploadPerson: Function<Object<PersonCard>>,
  setArea: (id: String) => void,
  logout: () => void,
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
    this._render = this._render.bind(this);
    this.transfer = this.transfer.bind(this);
  }

  componentDidMount() {
    this.props.getAreaList();
  }

  // state: State
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

  props: Props
  scrollView: ScrollView

  uploadPerson(callback) {
    const data: PersonData = this.props.data;
    const { syncErrors } = data;
    if (data.values && !syncErrors.realName && !syncErrors.personCard) {
      const { personCard, realName } = data.values;
      if (realName && personCard) {
        this.props.uploadPerson({ name: realName, id: personCard });
        callback();
      }
    } else if (syncErrors.realName || syncErrors.personCard) {
      const errors = Object.keys(syncErrors).filter(v => v === 'realName' || v === 'personCard').map(v => syncErrors[v]);
      Alert.alert(errors[0]);
    }
  }

  uploadCar(callback) {
    const data: CarData = this.props.data;
    const { selectedArea } = this.props.state;
    const { syncErrors } = data;
    if (data.values && !syncErrors) {
      const { carNumber: id, carBrand: brand } = data.values;
      if (id && brand && selectedArea) {
        this.props.uploadCar({ id, brand, selectedArea });
        callback();
      }
    } else if (syncErrors) {
      const errors = Object.keys(syncErrors).map(v => syncErrors[v]);
      Alert.alert(errors[0]);
    }
  }

  scrollToTopImmiately() {
    this.ScrollView.scrollTo({ y: 0, animated: false });
  }
  scrollToTop() {
    this.ScrollView.scrollTo({ y: 0 });
  }

  transfer() {
    this.setState({
      step: this.state.step + 1,
    }, this.scrollToTop);
  }

  nextStep() {
    if (this.state.step === 0) {
      this.uploadPerson(this.transfer);
    } else if (this.state.step === 1) {
      this.uploadCar(this.transfer);
    }
  }

  preStep() {
    this.setState({
      step: this.state.step - 1,
    }, this.scrollToTopImmiately);
  }

  _render() {
    const { pending, areaList } = this.props.state;
    switch (this.state.step) {
      case 0:
        return (
          <PersonCardMessage
            nextStep={this.nextStep}
            fetchBack={this.setBackImage}
            fetchFront={this.setFrontImage}
            backImage={this.state.backImage}
            frontImage={this.state.frontImage}
            uploadImage={this.props.uploadImage}
            pending={pending}
          />
        );
      case 1:
        return (
          <VehicleMessage
            nextStep={this.nextStep}
            preStep={this.preStep}
            fetchCar={this.setCar}
            fetchCertification={this.setCertification}
            fetchLicence={this.setLicence}
            car={this.state.car}
            certification={this.state.certification}
            licence={this.state.licence}
            uploadImage={this.props.uploadImage}
            pending={pending}
            areaList={areaList}
            onAreaChange={this.props.setArea}
          />
        );
      default:
        return <SuccessMessage />;
    }
  }

  render() {
    return (
      <Container theme={mytheme}>
        <Header>
          <Title>
            上传审核资料
          </Title>
          <Button
            transparent
            onPress={() => this.props.logout()}
          >
            重新登录
          </Button>
        </Header>
        <ScrollView
          ref={ref => (this.ScrollView = ref)}
          style={{ backgroundColor: '#F0F0F0', flex: 1, width: null, height: null }}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps
        >
          <StepIndicator active={this.state.step} />
          <NativeView style={s.formGroup}>
            {
              this._render()
            }

          </NativeView>
        </ScrollView>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // popRoute: key => dispatch(popRoute(key)),
    // registerAction: form => dispatch(mobileRegister(form)),
    getAreaList: () => dispatch(getAreaList()),
    uploadImage: (type: Type) => (uri: string) => dispatch(uploadImage(type, uri)),
    uploadPerson: (form: Object<PersonCard>) => dispatch(uploadPersonalCard(form)),
    uploadCar: (form: Object<CarInfo>) => dispatch(uploadCar(form)),
    setArea: (id: number) => dispatch(setArea(id)),
    logout: () => dispatch(logout()),
    // removeError: () => dispatch(removeError()),
    // replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  data: state.form.registerMessage,
  state: state.register,
  global: state.global,
});

const validate = (values) => {
  const errors = {};
  const { realName, personCard, carNumber, carBrand } = values;
  if (!realName) {
    errors.realName = '真实姓名不能为空';
  } else if (!personCard) {
    errors.personCard = '身份证号码不能为空';
  } else if (personCard.length !== 15 && personCard.length !== 18) {
    errors.personCard = '请填入正确的身份证号码';
  } else if (!carBrand) {
    errors.carBrand = '汽车型号不能为空';
  } else if (!carNumber) {
    errors.carNumber = '车牌不能为空';
  }
  return errors;
};

const component = reduxForm({
  form: 'registerMessage',
  validate,
})(RegisterMessage);

export default connect(mapStateToProps, bindActions)(component);
