import { NativeModules } from 'react-native';

import { getLinePlayIsReady } from '../cacheStatus';

import defaultAppActive from './defaultAppActive';

export function linePayRedirectWithUrl(
  paymentUrl: string,
  handleAppActive: Function = defaultAppActive
) {
  return new Promise((resolve, reject) => {
    if (getLinePlayIsReady() !== true) {
      throw new Error('TappayLinePay is not ready!');
    }

    let result = null;
    NativeModules.TappayHook.TappayLinePayRedirectWithUrl(paymentUrl)
      .then((_result: any) => {
        result = _result;
        const status = _result.status;
        if (status === 924 || status === '924') {
          reject(new Error('canceled'));
        }

        resolve(_result);
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

export default linePayRedirectWithUrl;
