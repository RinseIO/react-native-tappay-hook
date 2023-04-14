import { NativeModules } from 'react-native';

import { getEasyWalletIsReady } from '../cacheStatus';

export async function easyWalletHandleUniversalLink(url: string) {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayEasyWalletHandleUniversalLink(url);
  return result;
}

export default easyWalletHandleUniversalLink;