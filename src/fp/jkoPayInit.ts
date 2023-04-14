import { NativeModules } from 'react-native';

import { getInitPromise, setJkoPayIsReady } from '../cacheStatus';

export async function jkoPayInit(jkoPayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayJkoPayInit(
    jkoPayUniversalLinks
  );
  setJkoPayIsReady(result.isReadyToPay);
  return result;
}

export default jkoPayInit;
