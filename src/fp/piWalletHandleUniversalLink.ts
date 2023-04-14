import { NativeModules } from 'react-native';

import { getPiWalletIsReady } from '../cacheStatus';

export async function piWalletHandleUniversalLink(url: string) {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayPiWalletHandleUniversalLink(url);
  return result;
}

export default piWalletHandleUniversalLink;
