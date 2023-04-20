import { NativeModules } from 'react-native';

import { getEasyWalletIsReady } from '../cacheStatus';

import defaultAppActive from './defaultAppActive';

export function easyWalletRedirectWithUrl(
  paymentUrl: string,
  handleAppActive: Function = defaultAppActive
) {
  return new Promise((resolve, reject) => {
    if (getEasyWalletIsReady() !== true) {
      throw new Error('TappayEasyWallet is not ready!');
    }

    let result = null;
    NativeModules.TappayHook.TappayEasyWalletRedirectWithUrl(paymentUrl)
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

export default easyWalletRedirectWithUrl;
