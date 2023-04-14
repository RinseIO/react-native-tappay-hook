import { Platform, NativeModules } from 'react-native';

import { getInitPromise, getGooglePlayIsReady } from '../cacheStatus';

export async function getGooglePayPrime(
  totalPrice: string,
  currencyCode: string = 'TWD'
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  if (Platform.OS !== 'android') {
    return;
  }
  if (getGooglePlayIsReady() !== true) {
    throw new Error('TappayGooglePay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetGooglePayPrime(
    totalPrice,
    currencyCode
  );
  return result;
}

export default getGooglePayPrime;