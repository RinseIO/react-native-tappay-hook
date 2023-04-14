import { NativeModules } from 'react-native';

import { getInitPromise, setPiWalletIsReady } from '../cacheStatus';

export async function piWalletInit(piWalletUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayPiWalletInit(
    piWalletUniversalLinks
  );
  setPiWalletIsReady(result.isReadyToPay);
  return result;
}

export default piWalletInit;
