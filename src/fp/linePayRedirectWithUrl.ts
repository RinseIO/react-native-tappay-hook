import { NativeModules } from 'react-native';

import { getLinePlayIsReady } from '../cacheStatus';

export async function linePayRedirectWithUrl(paymentUrl: string) {
  if (getLinePlayIsReady() !== true) {
    throw new Error('TappayLinePay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayLinePayRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export default linePayRedirectWithUrl;