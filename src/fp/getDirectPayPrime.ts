import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function getDirectPayPrime(geoLocation: string = 'UNKNOWN') {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayGetDirectPayPrime(
    geoLocation
  );
  return result;
}

export default getDirectPayPrime;
