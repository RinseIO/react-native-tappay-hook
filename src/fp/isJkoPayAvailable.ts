import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isJkoPayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsJkoPayAvailable();
  return result;
}

export default isJkoPayAvailable;
