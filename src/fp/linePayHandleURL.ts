import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function linePayHandleURL(openUri: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  return await NativeModules.TappayHook.TappayLinePayHandleURL(openUri);
}

export default linePayHandleURL;