import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isPiWalletAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsPiWalletAvailable();
  return result;
}

export default isPiWalletAvailable;
