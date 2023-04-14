import { NativeModules } from 'react-native';

import { getPlusPayIsReady } from '../cacheStatus';

export async function plusPayRedirectWithUrl(paymentUrl: string) {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayPlusPayRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export default plusPayRedirectWithUrl;
