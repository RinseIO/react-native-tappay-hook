import { Platform, NativeModules } from 'react-native';

import { getSamsungPayIsReady } from '../cacheStatus';

export async function getSamsungPayPrime(
  itemTotalAmount: string,
  shippingPrice: string,
  tax: string,
  totalAmount: string
) {
  if (Platform.OS !== 'android') {
    return;
  }
  if (getSamsungPayIsReady() !== true) {
    throw new Error('TappaySamsungPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetSamsungPayPrime(
    itemTotalAmount,
    shippingPrice,
    tax,
    totalAmount
  );
  return result;
}

export default getSamsungPayPrime;