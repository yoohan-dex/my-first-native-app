import config from '../config';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function checkResult(response) {
  if (response.serviceResult) {
    return response.resultParm;
  }
  const error = new Error(response.resultInfo);
  error.response = response;
  throw error;
}
export default (type = 'driver') => function request(url, options) {
  return fetch(`${config.host}/${type}/${url}`, options) // eslint-disable-line no-undef
    .then(checkStatus)
    .then(parseJSON)
    .then(checkResult)
    .then(data => ({ data }));
};

export function get(url, options) {
  return fetch(`${config.host}/${url}`, options) // eslint-disable-line no-undef
    .then(checkStatus)
    .then(parseJSON)
    .then(checkResult)
    .then(data => ({ data }));
}
const serializeJSON = data => Object.keys(data).map(keyName => `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`).join('&');

export const post = type => (url, parm) =>
  fetch(`${config.host}/${type}/${url}`, { // eslint-disable-line no-undef
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: serializeJSON(parm),
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(checkResult)
  .then(data => ({ data }));

export function upload(url, formData) {
  return fetch(`${config.host}/${url}`, { // eslint-disable-line no-undef
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(checkResult)
  .then(data => ({ data }));
}

export function postDriver(url, parm) {
  return fetch(`${config.host}/driver/${url}`, { // eslint-disable-line no-undef
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: serializeJSON(parm),
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(checkResult)
  .then(data => ({ data }));
  // .catch(err => ({ err }));
}

// export default function (endpoint, option) {
//   return fetch(`${host}/${endpoint}`, option) // eslint-disable-line no-undef
//       .then(response => response.json())
//       .catch(error => error);
// }
