import { NativeModules } from 'react-native';

import { getInitPromise, setApplePlayIsReady } from '../cacheStatus';

export async function applePayInit(
  merchantName: string,
  merchantId: string,
  countryCode: string,
  currencyCode: string
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await NativeModules.TappayHook.TappayAapplePayInit(
    merchantName,
    merchantId,
    countryCode,
    currencyCode
  );
  setApplePlayIsReady(result.isReadyToPay);
  return result;
}

export default applePayInit;