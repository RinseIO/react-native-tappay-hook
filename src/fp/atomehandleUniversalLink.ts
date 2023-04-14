import { NativeModules } from 'react-native';

import { getAtomeIsReady } from '../cacheStatus';

export async function atomehandleUniversalLink(url: string) {
  if (getAtomeIsReady() !== true) {
    throw new Error('TappayAtome is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayAtomeHandleUniversalLink(
    url
  );
  return result;
}

export default atomehandleUniversalLink;