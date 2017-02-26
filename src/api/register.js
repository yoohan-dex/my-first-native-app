import request, { postDriver, upload, post, get } from '../utils/request';
import { Form } from '../actions/types';

export function register(form: Form) {
  return postDriver('driver_register', {
    phone_num: form.phone,
    sms_code: form.validCode,
    password: form.password,
  });
}

export function getDriverInfo() {
  return request('driver')('getDriverInfo');
}

type Type = 'carImage' | 'idcardImage' | 'idcardOppositeImage' | 'drivinglicenceImage' | 'vehiclelicenceImage';

export function uploadImage(type: Type, { uri }: string) {
  const formData = new FormData(); // eslint-disable-line no-undef
  const file = { uri, type: 'multipart/form-data', name: 'image.png' };
  formData.append('multipartFile', file);
  formData.append('fileInfoType', type);
  return upload('file/fileUploadByDriver', formData);
}

export function uploadCarInfo(brand: string, id: string, area: string) {
  return postDriver('updateCarInfo', {
    car_brand: brand,
    car_model: brand,
    plate_number: id,
    marketAreaId: area,
  });
}

export function uploadPersonalCard(name: string, id: string) {
  return postDriver('updateCredentialInfo', {
    driver_name: name,
    id_cardNum: id,
  });
}

export function getServiceAreaList() {
  return post('marketArea')('getMarketAreaVosList', { locked: false });
}
