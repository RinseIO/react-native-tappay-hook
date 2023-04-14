import { NativeModules } from 'react-native';

import { getJkoPayIsReady } from '../cacheStatus';

export async function jkoPayHandleUniversalLink(url: string) {
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayJkoPayHandleUniversalLink(
    url
  );
  return result;
}

export default jkoPayHandleUniversalLink;