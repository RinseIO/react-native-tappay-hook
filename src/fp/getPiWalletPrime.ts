import { NativeModules } from 'react-native';

import { getPiWalletIsReady } from '../cacheStatus';

export async function getPiWalletPrime() {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetPiWalletPrime();
  return result;
}

export default getPiWalletPrime;
