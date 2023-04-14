import { NativeModules } from 'react-native';

import { getJkoPayIsReady } from '../cacheStatus';

export async function getJkoPayPrime() {
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetJkoPayPrime();
  return result;
}

export default getJkoPayPrime;
