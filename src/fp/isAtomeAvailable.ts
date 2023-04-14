import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function isAtomeAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsAtomeAvailable();
  return result;
}

export default isAtomeAvailable;