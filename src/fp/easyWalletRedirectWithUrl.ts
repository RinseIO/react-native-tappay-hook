import { NativeModules } from 'react-native';

import { getEasyWalletIsReady } from '../cacheStatus';

export async function easyWalletRedirectWithUrl(paymentUrl: string) {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayEasyWalletRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export default easyWalletRedirectWithUrl;
