import { Platform, NativeModules } from 'react-native';

import {
  setProd,
  getInitPromise,
  setInitPromise,
  getStatusDeviceId,
  setStatusDeviceId,
  getGooglePlayIsReady,
  setGooglePlayIsReady,
  getApplePlayIsReady,
  setApplePlayIsReady,
  getLinePlayIsReady,
  setLinePlayIsReady,
  getSamsungPayIsReady,
  setSamsungPayIsReady,
  getJkoPayIsReady,
  setJkoPayIsReady,
  getEasyWalletIsReady,
  setEasyWalletIsReady,
  getPiWalletIsReady,
  setPiWalletIsReady,
  getPlusPayIsReady,
  setPlusPayIsReady,
  getAtomePayIsReady,
  setAtomePayIsReady
} from './cacheStatus';

export function tappayInitialization(
  appId: number,
  appKey: string,
  prod: boolean
) {
  if (getInitPromise() !== null) {
    return getInitPromise();
  }

  setInitPromise(
    (async () => {
      try {
        await NativeModules.RNToolsManager.TappayInitInstance(
          appId,
          appKey,
          prod
        );
        setProd(prod);
        return await getDeviceId();
      } catch (error: any) {
        console.log({ ...error });
        setInitPromise(null);
      }
    })()
  );

  return getInitPromise();
}

export async function getDeviceId() {
  const deviceId = getStatusDeviceId();
  if (deviceId !== '') {
    return deviceId;
  }
  const _deviceId = await NativeModules.RNToolsManager.TappayGetDeviceId();
  setStatusDeviceId(_deviceId);
  return getStatusDeviceId();
}

export async function setDirectPayTPDCard(
  cardNumber: string,
  dueMonth: string,
  dueYear: string,
  CCV: string
) {
  const validationResult = await NativeModules.RNToolsManager.TappaySetTPDCard(
    cardNumber,
    dueMonth,
    dueYear,
    CCV
  );

  return validationResult;
}

export async function getDirectPayPrime(geoLocation: string = 'UNKNOWN') {
  const result = await NativeModules.RNToolsManager.TappayGetDirectPayPrime(
    geoLocation
  );
  return result;
}

export async function googlePayInit(merchantName: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappayGooglePayInit(
    merchantName
  );
  setGooglePlayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getGooglePayPrime(
  totalPrice: string,
  currencyCode: string = 'TWD'
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  if (Platform.OS !== 'android') {
    return;
  }
  if (getGooglePlayIsReady() !== true) {
    throw new Error('TappayGooglePay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetGooglePayPrime(
    totalPrice,
    currencyCode
  );
  return result;
}

export async function isApplePayAvailable() {
  return await NativeModules.RNToolsManager.TappayIsApplePayAvailable();
}

export async function applePayInit(
  merchantName: string,
  merchantId: string,
  countryCode: string,
  currencyCode: string
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await NativeModules.RNToolsManager.TappayAapplePayInit(
    merchantName,
    merchantId,
    countryCode,
    currencyCode
  );
  setApplePlayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getApplePayPrime(amount: string) {
  if (Platform.OS !== 'ios') {
    return;
  }
  if (getApplePlayIsReady() !== true) {
    throw new Error('TappayApplePay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetApplePayPrime(
    amount
  );
  return result;
}

export async function linePayHandleURL(openUri: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  return await NativeModules.RNToolsManager.TappayLinePayHandleURL(openUri);
}

export async function isLinePayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const { isReadyToPay } =
    await NativeModules.RNToolsManager.TappayIsLinePayAvailable();
  return isReadyToPay;
}

export async function linePayInit(linePayCallbackUri: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await NativeModules.RNToolsManager.TappayLinePayInit(
    linePayCallbackUri
  );
  setLinePlayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function linePayRedirectWithUrl(paymentUrl: string) {
  if (getLinePlayIsReady() !== true) {
    throw new Error('TappayLinePay is not ready!');
  }
  const result =
    await NativeModules.RNToolsManager.TappayLinePayRedirectWithUrl(paymentUrl);
  return result;
}

export async function getLinePayPrime() {
  if (getLinePlayIsReady() !== true) {
    throw new Error('TappayLinePay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetLinePayPrime();
  return result;
}

export async function samsungPayInit(
  merchantName: string,
  merchantId: string,
  currencyCode: string,
  serviceId: string
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappaySamsungPayInit(
    merchantName,
    merchantId,
    currencyCode,
    serviceId
  );
  setSamsungPayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

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
  const result = await NativeModules.RNToolsManager.TappayGetSamsungPayPrime(
    itemTotalAmount,
    shippingPrice,
    tax,
    totalAmount
  );
  return result;
}

export async function isJkoPayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const { isReadyToPay } =
    await NativeModules.RNToolsManager.TappayIsJkoPayAvailable();
  return isReadyToPay;
}

export async function jkoPayInit(jkoPayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappayJkoPayInit(
    jkoPayUniversalLinks
  );
  setJkoPayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getJkoPayPrime() {
  if (Platform.OS !== 'android') {
    return;
  }
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetJkoPayPrime();
  return result;
}

export async function jkoPayRedirectWithUrl(paymentUrl: string) {
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayJkoPayRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export async function isEasyWalletAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const { isReadyToPay } =
    await NativeModules.RNToolsManager.TappayIsEasyWalletAvailable();
  return isReadyToPay;
}

export async function easyWalletInit(easyWalletUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappayEasyWalletInit(
    easyWalletUniversalLinks
  );
  setEasyWalletIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getEasyWalletPrime() {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetEasyWalletPrime();
  return result;
}

export async function easyWalletRedirectWithUrl(paymentUrl: string) {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result =
    await NativeModules.RNToolsManager.TappayEasyWalletRedirectWithUrl(
      paymentUrl
    );
  return result;
}

export async function isPiWalletAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const { isReadyToPay } =
    await NativeModules.RNToolsManager.TappayIsPiWalletAvailable();
  return isReadyToPay;
}

export async function piWalletInit(piWalletUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappayPiWalletInit(
    piWalletUniversalLinks
  );
  setPiWalletIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getPiWalletPrime() {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetPiWalletPrime();
  return result;
}

export async function piWalletRedirectWithUrl(paymentUrl: string) {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result =
    await NativeModules.RNToolsManager.TappayPiWalletRedirectWithUrl(
      paymentUrl
    );
  return result;
}

export async function isPlusPayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const { isReadyToPay } =
    await NativeModules.RNToolsManager.TappayIsPlusPayAvailable();
  return isReadyToPay;
}

export async function plusPayInit(plusPayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappayPlusPayInit(
    plusPayUniversalLinks
  );
  setPlusPayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getPlusPayPrime() {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetPlusPayPrime();
  return result;
}

export async function plusPayRedirectWithUrl(paymentUrl: string) {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result =
    await NativeModules.RNToolsManager.TappayPlusPayRedirectWithUrl(paymentUrl);
  return result;
}

export async function isAtomePayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const { isReadyToPay } =
    await NativeModules.RNToolsManager.TappayIsAtomePayAvailable();
  return isReadyToPay;
}

export async function atomePayInit(atomePayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.RNToolsManager.TappayPlusPayInit(
    atomePayUniversalLinks
  );
  setAtomePayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getAtomePayPrime() {
  if (getAtomePayIsReady() !== true) {
    throw new Error('TappayAtomePay is not ready!');
  }
  const result = await NativeModules.RNToolsManager.TappayGetAtomePayPrime();
  return result;
}

export async function atomePayRedirectWithUrl(paymentUrl: string) {
  if (getAtomePayIsReady() !== true) {
    throw new Error('TappayAtomePay is not ready!');
  }
  const result =
    await NativeModules.RNToolsManager.TappayAtomePayRedirectWithUrl(
      paymentUrl
    );
  return result;
}
