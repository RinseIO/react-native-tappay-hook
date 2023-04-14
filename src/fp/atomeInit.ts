import { NativeModules } from 'react-native';

import { getInitPromise, setAtomeIsReady } from '../cacheStatus';

export async function atomeInit(atomeUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayAtomeInit(
    atomeUniversalLinks
  );
  setAtomeIsReady(result.isReadyToPay);
  return result;
}

export default atomeInit;