import { Platform, NativeModules } from 'react-native';

import { getInitPromise, getApplePlayIsReady } from '../cacheStatus';

export async function getApplePayPrime(amount: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  if (Platform.OS !== 'ios') {
    return;
  }
  if (getApplePlayIsReady() !== true) {
    throw new Error('TappayApplePay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetApplePayPrime(amount);
  return result;
}

export default getApplePayPrime;