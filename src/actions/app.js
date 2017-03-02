import { Action } from './types';

export const APP_ONLOAD = 'APP_ONLOAD';

export function appOnload(): Action {
  return ({
    type: APP_ONLOAD,
  });
}
