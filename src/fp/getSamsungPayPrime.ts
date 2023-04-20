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
  try {
    const result = await NativeModules.TappayHook.TappayGetSamsungPayPrime(
      itemTotalAmount,
      shippingPrice,
      tax,
      totalAmount
    );
    return result;
  } catch (error: any) {
    const status = error.userInfo?.status;
    if (status === 88011 || status === '88011') {
      error.message = 'canceled';
      throw error;
    }
    throw new Error(error);
  }
}

export default getSamsungPayPrime;
