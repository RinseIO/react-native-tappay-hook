import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isEasyWalletAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsEasyWalletAvailable();

  return result;
}

export default isEasyWalletAvailable;
