import { NativeModules } from 'react-native';

import { getAtomeIsReady } from '../cacheStatus';

export async function getAtomePrime() {
  if (getAtomeIsReady() !== true) {
    throw new Error('TappayAtome is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetAtomePrime();
  return result;
}

export default getAtomePrime;