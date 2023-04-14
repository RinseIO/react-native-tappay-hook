import { NativeModules } from 'react-native';

import { getInitPromise, setSamsungPayIsReady } from '../cacheStatus';

export async function samsungPayInit(
  merchantName: string,
  merchantId: string,
  currencyCode: string,
  serviceId: string
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappaySamsungPayInit(
    merchantName,
    merchantId,
    currencyCode,
    serviceId
  );
  setSamsungPayIsReady(result.isReadyToPay);
  return result;
}

export default samsungPayInit;