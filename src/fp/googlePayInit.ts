import { NativeModules } from 'react-native';

import { getInitPromise, setGooglePlayIsReady } from '../cacheStatus';

export async function googlePayInit(merchantName: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayGooglePayInit(
    merchantName
  );
  setGooglePlayIsReady(result.isReadyToPay);
  return result;
}

export default googlePayInit;
