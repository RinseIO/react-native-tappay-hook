import { NativeModules } from 'react-native';

import { getPlusPayIsReady } from '../cacheStatus';

import defaultAppActive from './defaultAppActive';

export function plusPayRedirectWithUrl(
  paymentUrl: string,
  handleAppActive: Function = defaultAppActive
) {
  return new Promise((resolve, reject) => {
    if (getPlusPayIsReady() !== true) {
      throw new Error('TappayPlusPay is not ready!');
    }

    let result = null;
    NativeModules.TappayHook.TappayPlusPayRedirectWithUrl(paymentUrl)
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

export default plusPayRedirectWithUrl;
