import { NativeModules } from 'react-native';

import { getPiWalletIsReady } from '../cacheStatus';

import defaultAppActive from './defaultAppActive';

export function piWalletRedirectWithUrl(
  paymentUrl: string,
  handleAppActive: Function = defaultAppActive
) {
  return new Promise((resolve, reject) => {
    if (getPiWalletIsReady() !== true) {
      throw new Error('TappayPiWallet is not ready!');
    }

    let result = null;
    NativeModules.TappayHook.TappayPiWalletRedirectWithUrl(paymentUrl)
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

export default piWalletRedirectWithUrl;
