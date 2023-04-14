import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isLinePayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsLinePayAvailable();
  return result;
}

export default isLinePayAvailable;