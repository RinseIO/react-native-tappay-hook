import { NativeModules } from 'react-native';

import { getInitPromise, setLinePlayIsReady } from '../cacheStatus';

export async function linePayInit(linePayCallbackUri: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await NativeModules.TappayHook.TappayLinePayInit(
    linePayCallbackUri
  );
  setLinePlayIsReady(result.isReadyToPay);
  return result;
}

export default linePayInit;