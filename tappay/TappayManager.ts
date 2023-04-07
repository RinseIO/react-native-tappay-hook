import { Platform, NativeModules } from 'react-native';

export class tappay {
  public prod: boolean = false;
  public initPromise: any = null;
  public deviceId: string = '';
  public googlePlayIsReady: boolean = false;
  public applePlayIsReady: boolean = false;
  public linePlayIsReady: boolean = false;
  public samsungPayIsReady: boolean = false;
  public jkoPayIsReady: boolean = false;
  public easyWalletIsReady: boolean = false;
  public piWalletIsReady: boolean = false;

  public init(appId: number, appKey: string, prod: boolean) {
    this.initPromise = (async () => {
      try {
        await NativeModules.RNToolsManager.TappayInitInstance(
          appId,
          appKey,
          prod
        );
        this.prod = prod;
        return await this.getDeviceId();
      } catch (error: any) {
        console.log({ ...error });
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }

  public async getDeviceId() {
    if (this.deviceId !== '') {
      return this.deviceId;
    }
    const deviceId = await NativeModules.RNToolsManager.TappayGetDeviceId();
    this.deviceId = deviceId;
    return deviceId;
  }

  public async setDirectPayTPDCard(
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) {
    const validationResult =
      await NativeModules.RNToolsManager.TappaySetTPDCard(
        cardNumber,
        dueMonth,
        dueYear,
        CCV
      );

    return validationResult;
  }

  public async getDirectPayPrime(geoLocation: string = 'UNKNOWN') {
    const result = await NativeModules.RNToolsManager.TappayGetDirectPayPrime(
      geoLocation
    );
    return result;
  }

  public async googlePayInit(merchantName: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.RNToolsManager.TappayGooglePayInit(
      merchantName
    );
    this.googlePlayIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
  }

  public async getGooglePayPrime(totalPrice: string, currencyCode: string) {
    if (Platform.OS !== 'android') {
      return;
    }
    if (this.googlePlayIsReady !== true) {
      throw new Error('TappayGooglePay is not ready!');
    }
    const result = await NativeModules.RNToolsManager.TappayGetGooglePayPrime(
      totalPrice,
      currencyCode
    );
    return result;
  }

  public async isApplePayAvailable() {
    return await NativeModules.RNToolsManager.TappayIsApplePayAvailable();
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

    const result = await NativeModules.RNToolsManager.TappayAapplePayInit(
      merchantName,
      merchantId,
      countryCode,
      currencyCode
    );
    this.applePlayIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
  }

  public async getApplePayPrime(amount: string) {
    if (Platform.OS !== 'ios') {
      return;
    }
    if (this.applePlayIsReady !== true) {
      throw new Error('TappayApplePay is not ready!');
    }
    const result = await NativeModules.RNToolsManager.TappayGetApplePayPrime(
      amount
    );
    return result;
  }

  public async linePayHandleURL(openUri: string) {
    return await NativeModules.RNToolsManager.TappayLinePayHandleURL(openUri);
  }

  public async isLinePayAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const { isReadyToPay } =
      await NativeModules.RNToolsManager.TappayIsLinePayAvailable();
    return isReadyToPay;
  }

  public async linePayInit(linePayCallbackUri: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }

    const result = await NativeModules.RNToolsManager.TappayLinePayInit(
      linePayCallbackUri
    );
    this.linePlayIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
  }

  public async linePayRedirectWithUrl(paymentUrl: string) {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay is not ready!');
    }
    const result =
      await NativeModules.RNToolsManager.TappayLinePayRedirectWithUrl(
        paymentUrl
      );
    return result;
  }

  public async getLinePayPrime() {
    if (this.linePlayIsReady !== true) {
      throw new Error('TappayLinePay is not ready!');
    }
    const result = await NativeModules.RNToolsManager.TappayGetLinePayPrime();
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
    const result = await NativeModules.RNToolsManager.TappaySamsungPayInit(
      merchantName,
      merchantId,
      currencyCode,
      serviceId
    );
    this.samsungPayIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
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
    const result = await NativeModules.RNToolsManager.TappayGetSamsungPayPrime(
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
    const { isReadyToPay } =
      await NativeModules.RNToolsManager.TappayIsJkoPayAvailable();
    return isReadyToPay;
  }

  public async jkoPayInit(jkoPayUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.RNToolsManager.TappayJkoPayInit(
      jkoPayUniversalLinks
    );
    this.jkoPayIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
  }

  public async getJkoPayPrime() {
    if (Platform.OS !== 'android') {
      return;
    }
    if (this.jkoPayIsReady !== true) {
      throw new Error('TappayJkoPay is not ready!');
    }
    const result = await NativeModules.RNToolsManager.TappayGetJkoPayPrime();
    return result;
  }

  public async jkoPayRedirectWithUrl(paymentUrl: string) {
    if (this.jkoPayIsReady !== true) {
      throw new Error('TappayJkoPay is not ready!');
    }
    const result =
      await NativeModules.RNToolsManager.TappayJkoPayRedirectWithUrl(
        paymentUrl
      );
    return result;
  }

  public async isEasyWalletAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const { isReadyToPay } =
      await NativeModules.RNToolsManager.TappayIsEasyWalletAvailable();
    return isReadyToPay;
  }

  public async easyWalletInit(easyWalletUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.RNToolsManager.TappayEasyWalletInit(
      easyWalletUniversalLinks
    );
    this.easyWalletIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
  }

  public async getEasyWalletPrime() {
    if (this.easyWalletIsReady !== true) {
      throw new Error('TappayEasyWallet is not ready!');
    }
    const result =
      await NativeModules.RNToolsManager.TappayGetEasyWalletPrime();
    return result;
  }

  public async easyWalletRedirectWithUrl(paymentUrl: string) {
    if (this.easyWalletIsReady !== true) {
      throw new Error('TappayEasyWallet is not ready!');
    }
    const result =
      await NativeModules.RNToolsManager.TappayEasyWalletRedirectWithUrl(
        paymentUrl
      );
    return result;
  }

  public async isPiWalletAvailable() {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const { isReadyToPay } =
      await NativeModules.RNToolsManager.TappayIsPiWalletAvailable();
    return isReadyToPay;
  }

  public async piWalletInit(piWalletUniversalLinks: string) {
    if (this.initPromise === null) {
      throw new Error('Tappay has not been initialized!');
    }
    const result = await NativeModules.RNToolsManager.TappayPiWalletInit(
      piWalletUniversalLinks
    );
    this.piWalletIsReady = result.isReadyToPay;
    return { ...result, msg: result.msg || '' };
  }

  public async getPiWalletPrime() {
    if (this.piWalletIsReady !== true) {
      throw new Error('TappayPiWallet is not ready!');
    }
    const result = await NativeModules.RNToolsManager.TappayGetPiWalletPrime();
    return result;
  }

  public async piWalletRedirectWithUrl(paymentUrl: string) {
    if (this.piWalletIsReady !== true) {
      throw new Error('TappayPiWallet is not ready!');
    }
    const result =
      await NativeModules.RNToolsManager.TappayPiWalletRedirectWithUrl(
        paymentUrl
      );
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

  public async samsungTest(
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
}

export const Tappay = new tappay();

export default Tappay;
