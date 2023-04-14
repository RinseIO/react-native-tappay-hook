import { NativeModules } from 'react-native';

import { getPlusPayIsReady } from '../cacheStatus';

export async function getPlusPayPrime() {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetPlusPayPrime();
  return result;
}

export default getPlusPayPrime;
