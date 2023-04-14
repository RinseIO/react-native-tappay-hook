import { Platform, NativeModules } from 'react-native';

import {
  getAppId,
  setAppId,
  getAppKey,
  setAppKey,
  getProd,
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
} from '../cacheStatus';

export class tappay {
  public get appId() {
    return getAppId();
  }
  private set appId(newAppId: number) {
    setAppId(newAppId);
  }
  public get appKey() {
    return getAppKey();
  }
  private set appKey(newAppKey: string) {
    setAppKey(newAppKey);
  }
  public get prod() {
    return getProd();
  }
  private set prod(newProd: boolean) {
    setProd(newProd);
  }

  public get initPromise() {
    return getInitPromise();
  }
  private set initPromise(newInitPromise: any) {
    setInitPromise(newInitPromise);
  }

  public get deviceId() {
    return getStatusDeviceId();
  }
  private set deviceId(newDeviceId: string) {
    setStatusDeviceId(newDeviceId);
  }

  public get googlePlayIsReady() {
    return getGooglePlayIsReady() || false;
  }
  private set googlePlayIsReady(newGooglePlayIsReady: boolean) {
    setGooglePlayIsReady(newGooglePlayIsReady);
  }

  public get applePlayIsReady() {
    return getApplePlayIsReady() || false;
  }
  private set applePlayIsReady(newApplePlayIsReady: boolean) {
    setApplePlayIsReady(newApplePlayIsReady);
  }

  public get linePlayIsReady() {
    return getLinePlayIsReady() || false;
  }
  private set linePlayIsReady(newLinePlayIsReady: boolean) {
    setLinePlayIsReady(newLinePlayIsReady);
  }

  public get samsungPayIsReady() {
    return getSamsungPayIsReady() || false;
  }
  private set samsungPayIsReady(newSamsungPayIsReady: boolean) {
    setSamsungPayIsReady(newSamsungPayIsReady);
  }

  public get easyWalletIsReady() {
    return getEasyWalletIsReady() || false;
  }
  private set easyWalletIsReady(newEasyWalletIsReady: boolean) {
    setEasyWalletIsReady(newEasyWalletIsReady);
  }

  public get jkoPayIsReady() {
    return getJkoPayIsReady() || false;
  }
  private set jkoPayIsReady(newJkoPayIsReady: boolean) {
    setJkoPayIsReady(newJkoPayIsReady);
  }

  public get piWalletIsReady() {
    return getPiWalletIsReady() || false;
  }
  private set piWalletIsReady(newPiWalletIsReady: boolean) {
    setPiWalletIsReady(newPiWalletIsReady);
  }

  public get plusPayIsReady() {
    return getPlusPayIsReady() || false;
  }
  private set plusPayIsReady(newPlusPayIsReady: boolean) {
    setPlusPayIsReady(newPlusPayIsReady);
  }

  public get atomeIsReady() {
    return getAtomeIsReady() || false;
  }
  private set atomeIsReady(newAtomeIsReady: boolean) {
    setAtomeIsReady(newAtomeIsReady);
  }

  public init(appId: number, appKey: string, prod: boolean) {
    if (appId === this.appId && appKey === this.appKey && prod === this.prod) {
      return this.initPromise;
    }
    this.initPromise = (async () => {
      this.deviceId = '';
      try {
        await NativeModules.TappayHook.TappayInitInstance(appId, appKey, prod);
        this.appId = appId;
        this.appKey = appKey;
        this.prod = prod;
        this.googlePlayIsReady = false;
        this.applePlayIsReady = false;
        this.linePlayIsReady = false;
        this.samsungPayIsReady = false;
        this.jkoPayIsReady = false;
        this.easyWalletIsReady = false;
        this.piWalletIsReady = false;
        this.plusPayIsReady = false;
        this.atomeIsReady = false;
        return await this.getDeviceId();
      } catch (error: any) {
        console.error(error);
        console.log({ ...error });
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }

  public async getDeviceId() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    if (this.deviceId !== '') {
      return this.deviceId;
    }
    const deviceId = await NativeModules.TappayHook.TappayGetDeviceId();
    this.deviceId = deviceId;
    return deviceId;
  }

  public async setDirectPayTPDCard(
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const validationResult = await NativeModules.TappayHook.TappaySetTPDCard(
      cardNumber,
      dueMonth,
      dueYear,
      CCV
    );

    const { isCardNumberValid, isExpiryDateValid, isCCVValid } =
      validationResult;

    return {
      ...validationResult,
      isValid: isCardNumberValid && isExpiryDateValid && isCCVValid
    };
  }

  public async getDirectPayPrime(geoLocation: string = 'UNKNOWN') {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayGetDirectPayPrime(
      geoLocation
    );
    return result;
  }

  public async googlePayInit(merchantName: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayGooglePayInit(
      merchantName
    );
    this.googlePlayIsReady = result.isReadyToPay;
    return result;
  }

  public async getGooglePayPrime(
    totalPrice: string,
    currencyCode: string = 'TWD'
  ) {
    if (Platform.OS !== 'android') {
      return;
    }
    if (this.googlePlayIsReady !== true) {
      throw new Error('TappayGooglePay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetGooglePayPrime(
      totalPrice,
      currencyCode
    );
    return result;
  }

  public async isApplePayAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    return await NativeModules.TappayHook.TappayIsApplePayAvailable();
  }

  public async applePayInit(
    merchantName: string,
    merchantId: string,
    countryCode: string,
    currencyCode: string
  ) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }

    const result = await NativeModules.TappayHook.TappayAapplePayInit(
      merchantName,
      merchantId,
      countryCode,
      currencyCode
    );
    this.applePlayIsReady = result.isReadyToPay;
    return result;
  }

  public async getApplePayPrime(amount: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    if (Platform.OS !== 'ios') {
      return;
    }
    if (this.applePlayIsReady !== true) {
      throw new Error('TappayApplePay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetApplePayPrime(
      amount
    );
    return result;
  }

  public async linePayHandleURL(openUri: string) {
    if (getInitPromise() === null) {
      throw new Error('Tappay has not been initialized!');
    }

    return await NativeModules.TappayHook.TappayLinePayHandleURL(openUri);
  }

  public async isLinePayAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayIsLinePayAvailable();
    return result;
  }

  public async linePayInit(linePayCallbackUri: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }

    const result = await NativeModules.TappayHook.TappayLinePayInit(
      linePayCallbackUri
    );
    this.linePlayIsReady = result.isReadyToPay;
    return result;
  }

  public async getLinePayPrime() {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetLinePayPrime();
    return result;
  }

  public async linePayRedirectWithUrl(paymentUrl: string) {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayLinePayRedirectWithUrl(
      paymentUrl
    );
    return result;
  }

  public async samsungPayInit(
    merchantName: string,
    merchantId: string,
    currencyCode: string,
    serviceId: string
  ) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappaySamsungPayInit(
      merchantName,
      merchantId,
      currencyCode,
      serviceId
    );
    this.samsungPayIsReady = result.isReadyToPay;
    return result;
  }

  public async getSamsungPayPrime(
    itemTotalAmount: string,
    shippingPrice: string,
    tax: string,
    totalAmount: string
  ) {
    if (Platform.OS !== 'android') {
      return;
    }
    if (this.samsungPayIsReady !== true) {
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

  public async isJkoPayAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayIsJkoPayAvailable();
    return result;
  }

  public async jkoPayInit(jkoPayUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayJkoPayInit(
      jkoPayUniversalLinks
    );
    this.jkoPayIsReady = result.isReadyToPay;
    return result;
  }

  public async getJkoPayPrime() {
    if (this.jkoPayIsReady !== true) {
      throw new Error('TappayJkoPay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetJkoPayPrime();
    return result;
  }

  public async jkoPayRedirectWithUrl(paymentUrl: string) {
    if (this.jkoPayIsReady !== true) {
      throw new Error('TappayJkoPay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayJkoPayRedirectWithUrl(
      paymentUrl
    );
    return result;
  }

  public async jkoPayHandleUniversalLink(url: string) {
    if (this.jkoPayIsReady !== true) {
      throw new Error('TappayJkoPay is not ready!');
    }
    const result =
      await NativeModules.TappayHook.TappayJkoPayHandleUniversalLink(url);
    return result;
  }

  public async isEasyWalletAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayIsEasyWalletAvailable();
    return result;
  }

  public async easyWalletInit(easyWalletUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayEasyWalletInit(
      easyWalletUniversalLinks
    );
    this.easyWalletIsReady = result.isReadyToPay;
    return result;
  }

  public async getEasyWalletPrime() {
    if (this.easyWalletIsReady !== true) {
      throw new Error('TappayEasyWallet is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetEasyWalletPrime();
    return result;
  }

  public async easyWalletRedirectWithUrl(paymentUrl: string) {
    if (this.easyWalletIsReady !== true) {
      throw new Error('TappayEasyWallet is not ready!');
    }
    const result =
      await NativeModules.TappayHook.TappayEasyWalletRedirectWithUrl(
        paymentUrl
      );
    return result;
  }

  public async easyWalletHandleUniversalLink(url: string) {
    if (this.easyWalletIsReady !== true) {
      throw new Error('TappayEasyWallet is not ready!');
    }
    const result =
      await NativeModules.TappayHook.TappayEasyWalletHandleUniversalLink(url);
    return result;
  }

  public async isPiWalletAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayIsPiWalletAvailable();
    return result;
  }

  public async piWalletInit(piWalletUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayPiWalletInit(
      piWalletUniversalLinks
    );
    this.piWalletIsReady = result.isReadyToPay;
    return result;
  }

  public async getPiWalletPrime() {
    if (this.piWalletIsReady !== true) {
      throw new Error('TappayPiWallet is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetPiWalletPrime();
    return result;
  }

  public async piWalletRedirectWithUrl(paymentUrl: string) {
    if (this.piWalletIsReady !== true) {
      throw new Error('TappayPiWallet is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayPiWalletRedirectWithUrl(
      paymentUrl
    );
    return result;
  }

  public async piWalletHandleUniversalLink(url: string) {
    if (this.piWalletIsReady !== true) {
      throw new Error('TappayPiWallet is not ready!');
    }
    const result =
      await NativeModules.TappayHook.TappayPiWalletHandleUniversalLink(url);
    return result;
  }

  public async isPlusPayAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayIsPlusPayAvailable();
    return result;
  }

  public async plusPayInit(plusPayUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayPlusPayInit(
      plusPayUniversalLinks
    );
    this.plusPayIsReady = result.isReadyToPay;
    return result;
  }

  public async getPlusPayPrime() {
    if (this.plusPayIsReady !== true) {
      throw new Error('TappayPlusPay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetPlusPayPrime();
    return result;
  }

  public async plusPayRedirectWithUrl(paymentUrl: string) {
    if (this.plusPayIsReady !== true) {
      throw new Error('TappayPlusPay is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayPlusPayRedirectWithUrl(
      paymentUrl
    );
    return result;
  }

  public async plusPayhandleUniversalLink(url: string) {
    if (this.plusPayIsReady !== true) {
      throw new Error('TappayPlusPay is not ready!');
    }
    const result =
      await NativeModules.TappayHook.TappayPlusPayHandleUniversalLink(url);
    return result;
  }

  public async isAtomeAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayIsAtomeAvailable();
    return result;
  }

  public async atomeInit(atomeUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.TappayHook.TappayAtomeInit(
      atomeUniversalLinks
    );
    this.atomeIsReady = result.isReadyToPay;
    return result;
  }

  public async getAtomePrime() {
    if (this.atomeIsReady !== true) {
      throw new Error('TappayAtome is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayGetAtomePrime();
    return result;
  }

  public async atomeRedirectWithUrl(paymentUrl: string) {
    if (this.atomeIsReady !== true) {
      throw new Error('TappayAtome is not ready!');
    }
    const result = await NativeModules.TappayHook.TappayAtomeRedirectWithUrl(
      paymentUrl
    );
    return result;
  }

  public async atomehandleUniversalLink(url: string) {
    if (this.atomeIsReady !== true) {
      throw new Error('TappayAtome is not ready!');
    }
    const result =
      await NativeModules.TappayHook.TappayAtomeHandleUniversalLink(url);
    return result;
  }

  public async directPayTest() {
    try {
      if (this.prod === true) {
        return;
      }
      const validationResult = await this.setDirectPayTPDCard(
        '4679270817026199',
        '08',
        '25',
        '081'
      );
      console.log(validationResult);

      console.log(this.deviceId);
      const result = await this.getDirectPayPrime();
      console.log(result);
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async googlePayTest(merchantName: string) {
    try {
      if (this.prod === true) {
        return;
      }
      const { isReadyToPay } = await this.googlePayInit(merchantName);
      if (isReadyToPay === true) {
        const result = await this.getGooglePayPrime('1', 'TWD');
        console.log({ result });
      }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async applePayTest(
    merchantName: string,
    merchantId: string,
    countryCode: string,
    currencyCode: string
  ) {
    try {
      if (this.prod === true) {
        return;
      }
      const { isReadyToPay } = await this.applePayInit(
        merchantName,
        merchantId,
        countryCode,
        currencyCode
      );
      if (isReadyToPay === true) {
        const result = await this.getApplePayPrime('1');
        console.log(result);
      }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async linePayTest(linePayCallbackUri: string) {
    try {
      if (this.prod === true) {
        return;
      }
      const { isReadyToPay } = await this.linePayInit(linePayCallbackUri);
      if (isReadyToPay === true) {
        const result = await this.getLinePayPrime();
        console.log({ result });
      }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async samsungPayTest(
    merchantName: string,
    merchantId: string,
    currencyCode: string,
    serviceId: string
  ) {
    try {
      if (this.prod === true) {
        return;
      }
      const { isReadyToPay } = await this.samsungPayInit(
        merchantName,
        merchantId,
        currencyCode,
        serviceId
      );
      if (isReadyToPay === true) {
        const result = await this.getSamsungPayPrime('1', '0', '0', '1');
        console.log({ result });
      }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async jkoPayTest(jkoPayUniversalLinks: string) {
    try {
      if (this.prod === true) {
        return;
      }
      const { isReadyToPay } = await this.jkoPayInit(jkoPayUniversalLinks);
      if (isReadyToPay === true) {
        const result = await this.getJkoPayPrime();
        console.log({ result });
      }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async easyWalletTest(easyWalletUniversalLinks: string) {
    try {
      if (this.prod === true) {
        return;
      }
      const { isReadyToPay } = await this.easyWalletInit(
        easyWalletUniversalLinks
      );
      if (isReadyToPay === true) {
        const result = await this.getEasyWalletPrime();
        console.log({ result });
      }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async piWalletTest(piWalletUniversalLinks: string) {
    try {
      if (this.prod === true) {
        return;
      }
      // Sandbox模式底下，isReadyToPay皆為false，故不測試最後是否能取得Prime
      await this.piWalletInit(piWalletUniversalLinks);
      // const { isReadyToPay } = await this.piWalletInit(piWalletUniversalLinks);
      // if (isReadyToPay === true) {
      //   const result = await this.getPiWalletPrime();
      //   console.log({ result });
      // }
    } catch (error: any) {
      console.log({ ...error });
    }
  }

  public async plusPayTest(plusPayUniversalLinks: string) {
    try {
      if (this.prod === true) {
        return;
      }
      // Sandbox模式底下，isReadyToPay皆為false，故不測試最後是否能取得Prime
      await this.plusPayInit(plusPayUniversalLinks);
      // const { isReadyToPay } = await this.plusPayInit(plusPayUniversalLinks);
      // if (isReadyToPay === true) {
      //   const result = await this.getPlusPayPrime();
      //   console.log({ result });
      // }
    } catch (error: any) {
      console.log({ ...error });
    }
  }
}

export const Tappay = new tappay();

export default Tappay;
