import { NativeModules } from 'react-native';

import { getJkoPayIsReady } from '../cacheStatus';

import defaultAppActive from './defaultAppActive';

export function jkoPayRedirectWithUrl(
  paymentUrl: string,
  handleAppActive: Function = defaultAppActive
) {
  return new Promise((resolve, reject) => {
    if (getJkoPayIsReady() !== true) {
      throw new Error('TappayJkoPay is not ready!');
    }

    let result = null;
    NativeModules.TappayHook.TappayJkoPayRedirectWithUrl(paymentUrl)
      .then((_result: any) => {
        resolve(_result);
        result = _result;
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      })
      .catch((error: any) => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
        reject(error);
      });
    const unsubscribe = handleAppActive(reject, result);
  });
}

export default jkoPayRedirectWithUrl;
