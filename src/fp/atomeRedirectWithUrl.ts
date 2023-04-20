import { NativeModules } from 'react-native';

import { getAtomeIsReady } from '../cacheStatus';

import defaultAppActive from './defaultAppActive';

export function atomeRedirectWithUrl(
  paymentUrl: string,
  handleAppActive: Function = defaultAppActive
) {
  return new Promise((resolve, reject) => {
    if (getAtomeIsReady() !== true) {
      throw new Error('TappayAtome is not ready!');
    }

    let result = null;
    NativeModules.TappayHook.TappayAtomeRedirectWithUrl(paymentUrl)
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

export default atomeRedirectWithUrl;
