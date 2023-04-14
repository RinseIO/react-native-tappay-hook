import { NativeModules } from 'react-native';

import { getInitPromise, setEasyWalletIsReady } from '../cacheStatus';

export async function easyWalletInit(easyWalletUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayEasyWalletInit(
    easyWalletUniversalLinks
  );
  setEasyWalletIsReady(result.isReadyToPay);
  return result;
}

export default easyWalletInit;
