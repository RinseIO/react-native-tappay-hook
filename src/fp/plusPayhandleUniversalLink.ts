import { NativeModules } from 'react-native';

import { getPlusPayIsReady } from '../cacheStatus';

export async function plusPayhandleUniversalLink(url: string) {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayPlusPayHandleUniversalLink(url);
  return result;
}

export default plusPayhandleUniversalLink;