import { NativeModules } from 'react-native';

import { getLinePlayIsReady } from '../cacheStatus';

export async function getLinePayPrime() {
  if (getLinePlayIsReady() !== true) {
    throw new Error('TappayLinePay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetLinePayPrime();
  return result;
}

export default getLinePayPrime;