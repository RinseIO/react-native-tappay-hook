import { NativeModules } from 'react-native';

import { getAtomeIsReady } from '../cacheStatus';

export async function atomeRedirectWithUrl(paymentUrl: string) {
  if (getAtomeIsReady() !== true) {
    throw new Error('TappayAtome is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayAtomeRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export default atomeRedirectWithUrl;