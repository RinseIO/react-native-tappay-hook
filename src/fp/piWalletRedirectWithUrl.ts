import { NativeModules } from 'react-native';

import { getPiWalletIsReady } from '../cacheStatus';

export async function piWalletRedirectWithUrl(paymentUrl: string) {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayPiWalletRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export default piWalletRedirectWithUrl;
