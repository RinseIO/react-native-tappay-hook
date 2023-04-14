import { NativeModules } from 'react-native';

import {
  getInitPromise,
  getStatusDeviceId,
  setStatusDeviceId
} from '../cacheStatus';

export async function getDeviceId() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const deviceId = getStatusDeviceId();
  if (deviceId !== '') {
    return deviceId;
  }
  const _deviceId = await NativeModules.TappayHook.TappayGetDeviceId();
  setStatusDeviceId(_deviceId);
  return getStatusDeviceId();
}

export default getDeviceId;
