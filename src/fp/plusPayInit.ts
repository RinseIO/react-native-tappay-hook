import { NativeModules } from 'react-native';

import { getInitPromise, setPlusPayIsReady } from '../cacheStatus';

export async function plusPayInit(plusPayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayPlusPayInit(
    plusPayUniversalLinks
  );
  setPlusPayIsReady(result.isReadyToPay);
  return result;
}

export default plusPayInit;
