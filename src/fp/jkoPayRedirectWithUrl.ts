import { NativeModules } from 'react-native';

import { getJkoPayIsReady } from '../cacheStatus';

export async function jkoPayRedirectWithUrl(paymentUrl: string) {
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayJkoPayRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export default jkoPayRedirectWithUrl;