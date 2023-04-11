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
  getAtomeIsReady,
  setAtomeIsReady
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
      setStatusDeviceId('');
      try {
        await NativeModules.TappayHook.TappayInitInstance(appId, appKey, prod);
        setProd(prod);
        return await getDeviceId();
      } catch (error: any) {
        console.log({ ...error });
        setInitPromise(null);
      }
      return '';
    })()
  );

  return getInitPromise();
}

export async function getDeviceId() {
  const deviceId = getStatusDeviceId();
  if (deviceId !== '') {
    return deviceId;
  }
  const _deviceId = await NativeModules.TappayHook.TappayGetDeviceId();
  setStatusDeviceId(_deviceId);
  return getStatusDeviceId();
}

export async function setDirectPayTPDCard(
  cardNumber: string,
  dueMonth: string,
  dueYear: string,
  CCV: string
) {
  const validationResult = await NativeModules.TappayHook.TappaySetTPDCard(
    cardNumber,
    dueMonth,
    dueYear,
    CCV
  );
  const { isCardNumberValid, isExpiryDateValid, isCCVValid } = validationResult;

  return {
    ...validationResult,
    isValid: isCardNumberValid && isExpiryDateValid && isCCVValid
  };
}

export async function getDirectPayPrime(geoLocation: string = 'UNKNOWN') {
  const result = await NativeModules.TappayHook.TappayGetDirectPayPrime(
    geoLocation
  );
  return result;
}

export async function googlePayInit(merchantName: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayGooglePayInit(
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
  const result = await NativeModules.TappayHook.TappayGetGooglePayPrime(
    totalPrice,
    currencyCode
  );
  return result;
}

export async function isApplePayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  return await NativeModules.TappayHook.TappayIsApplePayAvailable();
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

  const result = await NativeModules.TappayHook.TappayAapplePayInit(
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
  const result = await NativeModules.TappayHook.TappayGetApplePayPrime(amount);
  return result;
}

export async function linePayHandleURL(openUri: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  return await NativeModules.TappayHook.TappayLinePayHandleURL(openUri);
}

export async function isLinePayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsLinePayAvailable();
  return result;
}

export async function linePayInit(linePayCallbackUri: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }

  const result = await NativeModules.TappayHook.TappayLinePayInit(
    linePayCallbackUri
  );
  setLinePlayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getLinePayPrime() {
  if (getLinePlayIsReady() !== true) {
    throw new Error('TappayLinePay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetLinePayPrime();
  return result;
}

export async function linePayRedirectWithUrl(paymentUrl: string) {
  if (getLinePlayIsReady() !== true) {
    throw new Error('TappayLinePay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayLinePayRedirectWithUrl(
    paymentUrl
  );
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
  const result = await NativeModules.TappayHook.TappaySamsungPayInit(
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
  const result = await NativeModules.TappayHook.TappayGetSamsungPayPrime(
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
  const result = await NativeModules.TappayHook.TappayIsJkoPayAvailable();
  return result;
}

export async function jkoPayInit(jkoPayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayJkoPayInit(
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
  const result = await NativeModules.TappayHook.TappayGetJkoPayPrime();
  return result;
}

export async function jkoPayRedirectWithUrl(paymentUrl: string) {
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayJkoPayRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export async function jkoPayHandleUniversalLink(url: string) {
  if (getJkoPayIsReady() !== true) {
    throw new Error('TappayJkoPay is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayJkoPayHandleUniversalLink(url);
  return result;
}

export async function isEasyWalletAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsEasyWalletAvailable();
  return result;
}

export async function easyWalletInit(easyWalletUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayEasyWalletInit(
    easyWalletUniversalLinks
  );
  setEasyWalletIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getEasyWalletPrime() {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetEasyWalletPrime();
  return result;
}

export async function easyWalletRedirectWithUrl(paymentUrl: string) {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayEasyWalletRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export async function easyWalletHandleUniversalLink(url: string) {
  if (getEasyWalletIsReady() !== true) {
    throw new Error('TappayEasyWallet is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayEasyWalletHandleUniversalLink(
      url
    );
  return result;
}

export async function isPiWalletAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsPiWalletAvailable();
  return result;
}

export async function piWalletInit(piWalletUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayPiWalletInit(
    piWalletUniversalLinks
  );
  setPiWalletIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getPiWalletPrime() {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetPiWalletPrime();
  return result;
}

export async function piWalletRedirectWithUrl(paymentUrl: string) {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayPiWalletRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export async function piWalletHandleUniversalLink(url: string) {
  if (getPiWalletIsReady() !== true) {
    throw new Error('TappayPiWallet is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayPiWalletHandleUniversalLink(url);
  return result;
}

export async function isPlusPayAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsPlusPayAvailable();
  return result;
}

export async function plusPayInit(plusPayUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayPlusPayInit(
    plusPayUniversalLinks
  );
  setPlusPayIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getPlusPayPrime() {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetPlusPayPrime();
  return result;
}

export async function plusPayRedirectWithUrl(paymentUrl: string) {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayPlusPayRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export async function plusPayhandleUniversalLink(url: string) {
  if (getPlusPayIsReady() !== true) {
    throw new Error('TappayPlusPay is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayPlusPayHandleUniversalLink(url);
  return result;
}

export async function isAtomeAvailable() {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayIsAtomeAvailable();
  return result;
}

export async function atomeInit(atomeUniversalLinks: string) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const result = await NativeModules.TappayHook.TappayPlusPayInit(
    atomeUniversalLinks
  );
  setAtomeIsReady(result.isReadyToPay);
  return { ...result, msg: result.msg || '' };
}

export async function getAtomePrime() {
  if (getAtomeIsReady() !== true) {
    throw new Error('TappayAtome is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayGetAtomePrime();
  return result;
}

export async function atomeRedirectWithUrl(paymentUrl: string) {
  if (getAtomeIsReady() !== true) {
    throw new Error('TappayAtome is not ready!');
  }
  const result = await NativeModules.TappayHook.TappayAtomeRedirectWithUrl(
    paymentUrl
  );
  return result;
}

export async function atomehandleUniversalLink(url: string) {
  if (getAtomeIsReady() !== true) {
    throw new Error('TappayAtome is not ready!');
  }
  const result =
    await NativeModules.TappayHook.TappayAtomeHandleUniversalLink(url);
  return result;
}