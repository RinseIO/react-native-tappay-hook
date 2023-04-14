import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isPlusPayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsPlusPayAvailable();
  return result;
}

export default isPlusPayAvailable;
