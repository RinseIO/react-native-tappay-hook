import { NativeModules } from 'react-native';

import { getEasyWalletIsReady } from '../cacheStatus';

export async function getEasyWalletPrime() {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetEasyWalletPrime();
  return result;
}

export default getEasyWalletPrime;