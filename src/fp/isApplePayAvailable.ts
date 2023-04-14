import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isApplePayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  return await NativeModules.TappayHook.TappayIsApplePayAvailable();
}

export default isApplePayAvailable;