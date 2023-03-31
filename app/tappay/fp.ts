import { Platform } from 'react-native';

import Tappay from './TappayManager';

export function tappayInitialization(
  appId: number,
  appKey: string,
  prod: boolean
) {
  if (Tappay.initPromise !== null) {
    return Tappay.initPromise;
  }

  Tappay.initPromise = (async () => {
    await Tappay.init(appId, appKey, prod);
    return await Tappay.getDeviceId();
  })();

  return Tappay.initPromise;
}

export async function getTappayDeviceId() {
  const _deviceId = await Tappay.getDeviceId();
  return _deviceId;
}

export async function handlerDirectPay(geoLocation: string = 'UNKNOWN') {
  const result = await Tappay.handlerDirectPay(geoLocation);
  return result;
}

export async function handlerGooglePay(
  totalPrice: string,
  currencyCode: string = 'TWD'
) {
  if (Platform.OS !== 'android') {
    return;
  }
  const result = await Tappay.handlerGooglePay(totalPrice, currencyCode);
  return result;
}

export async function handlerApplePay(amount: string) {
  if (Platform.OS !== 'ios') {
    return;
  }
  if (Tappay.applePlayIsReady !== true) {
    throw new Error('TappayApplePay has not been initialized!');
  }
  try {
    const result = await Tappay.handlerApplePay(amount);

    return result;
  } catch (error: any) {
    console.log({ ...error });
    throw { ...error };
  }
}

export async function linePayHandleURL(openUri:string) {
  return await Tappay.linePayHandleURL(openUri);
}

export async function isLinePayAvailable() {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }
  return await Tappay.isLinePayAvailable();
}

export async function linePayInit(linePayCallbackUri: string) {
  if (Tappay.initPromise === null) {
    throw new Error('Tappay has not been initialized!');
  }

  try {
    const result = await Tappay.linePayInit(linePayCallbackUri);
    return result;
  } catch (error: any) {
    console.log({ ...error });
    throw error;
  }
}

export async function linePayRedirectWithUrl(paymentUrl: string) {
  if (Tappay.linePlayIsReady !== true) {
    throw new Error('TappayLinePay has not been initialized!');
  }
  try {
    const result = await Tappay.linePayRedirectWithUrl(paymentUrl);
    return result;
  } catch (error: any) {
    console.log({ ...error });
    throw { ...error };
  }
}

export async function getLinePayPrime() {
  if (Tappay.linePlayIsReady !== true) {
    throw new Error('TappayLinePay has not been initialized!');
  }
  try {
    const result = await Tappay.getLinePayPrime();
    return result;
  } catch (error: any) {
    console.log({ ...error });
    throw { ...error };
  }
}