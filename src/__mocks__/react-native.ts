const ReactNative: any = jest.createMockFromModule('react-native');

let initInstanceSuccess: boolean = true;
let isCardNumberValid: boolean = false;
let isExpiryDateValid: boolean = false;
let isCCVValid: boolean = false;
let cardType: string = 'Unknown';
let systemOS: string = 'android';

let googlePlayIsReady: boolean = false;
let applePlayIsReady: boolean = false;
let linePlayIsReady: boolean = false;
let samsungPayIsReady: boolean = false;
let jkoPayIsReady: boolean = false;
let easyWalletIsReady: boolean = false;
let piWalletIsReady: boolean = false;
let plusPayIsReady: boolean = false;
let atomeIsReady: boolean = false;
let linePayHandleURL: boolean = false;
let jkoPayHandleUniversalLink: boolean = false;
let easyWalletHandleUniversalLink: boolean = false;
let piWalletHandleUniversalLink: boolean = false;
let plusPayHandleUniversalLink: boolean = false;
let atomeHandleUniversalLink: boolean = false;

ReactNative._reset = function () {
  initInstanceSuccess = true;
  isCardNumberValid = false;
  isExpiryDateValid = false;
  isCCVValid = false;
  cardType = 'Unknown';
  systemOS = 'android';

  googlePlayIsReady = false;
  applePlayIsReady = false;
  linePlayIsReady = false;
  samsungPayIsReady = false;
  jkoPayIsReady = false;
  easyWalletIsReady = false;
  piWalletIsReady = false;
  plusPayIsReady = false;
  atomeIsReady = false;

  linePayHandleURL = false;
  jkoPayHandleUniversalLink = false;
  easyWalletHandleUniversalLink = false;
  plusPayHandleUniversalLink = false;
  piWalletHandleUniversalLink = false;
};
ReactNative._setSystemOS = function (_systemOS: string) {
  systemOS = _systemOS;
  ReactNative.Platform.OS = _systemOS;
};
ReactNative._setLinePayHandleURL = function (_linePayHandleURL: boolean) {
  linePayHandleURL = _linePayHandleURL;
};
ReactNative._setJkoPayHandleUniversalLink = function (
  _jkoPayHandleUniversalLink: boolean
) {
  jkoPayHandleUniversalLink = _jkoPayHandleUniversalLink;
};
ReactNative._setEasyWalletHandleUniversalLink = function (
  _easyWalletHandleUniversalLink: boolean
) {
  easyWalletHandleUniversalLink = _easyWalletHandleUniversalLink;
};
ReactNative._setPlusPayHandleUniversalLink = function (
  _plusPayHandleUniversalLink: boolean
) {
  plusPayHandleUniversalLink = _plusPayHandleUniversalLink;
};
ReactNative._setPiWalletHandleUniversalLink = function (
  _piWalletHandleUniversalLink: boolean
) {
  piWalletHandleUniversalLink = _piWalletHandleUniversalLink;
};
ReactNative._setAtomeHandleUniversalLink = function (
  _atomeHandleUniversalLink: boolean
) {
  atomeHandleUniversalLink = _atomeHandleUniversalLink;
};
ReactNative._setInitInstanceSuccess = function (_initInstanceSuccess: boolean) {
  initInstanceSuccess = _initInstanceSuccess;
};
ReactNative._setIsCardNumberValid = function (_isCardNumberValid: boolean) {
  isCardNumberValid = _isCardNumberValid;
};
ReactNative._setIsExpiryDateValid = function (_isExpiryDateValid: boolean) {
  isExpiryDateValid = _isExpiryDateValid;
};
ReactNative._setIsCCVValid = function (_isCCVValid: boolean) {
  isCCVValid = _isCCVValid;
};
ReactNative._setCardType = function (_cardType: string = 'Unknown') {
  cardType = _cardType;
};
ReactNative._setGooglePlayIsReady = function (newGooglePlayIsReady: boolean) {
  googlePlayIsReady = newGooglePlayIsReady;
};
ReactNative._setApplePlayIsReady = function (newApplePlayIsReady: boolean) {
  applePlayIsReady = newApplePlayIsReady;
};
ReactNative._setLinePlayIsReady = function (newLinePlayIsReady: boolean) {
  linePlayIsReady = newLinePlayIsReady;
};
ReactNative._setSamsungPayIsReady = function (newSamsungPayIsReady: boolean) {
  samsungPayIsReady = newSamsungPayIsReady;
};
ReactNative._setJkoPayIsReady = function (newJkoPayIsReady: boolean) {
  jkoPayIsReady = newJkoPayIsReady;
};
ReactNative._setEasyWalletIsReady = function (newEasyWalletIsReady: boolean) {
  easyWalletIsReady = newEasyWalletIsReady;
};
ReactNative._setPiWalletIsReady = function (newPiWalletIsReady: boolean) {
  piWalletIsReady = newPiWalletIsReady;
};
ReactNative._setPlusPayIsReady = function (newPlusPayIsReady: boolean) {
  plusPayIsReady = newPlusPayIsReady;
};
ReactNative._setAtomeIsReady = function (newAtomeIsReady: boolean) {
  atomeIsReady = newAtomeIsReady;
};

ReactNative.NativeModules = {
  TappayHook: {
    async TappayInitInstance(appId: number, appKey: string, prod: boolean) {
      console.log('TappayInitInstance', {
        appId,
        appKey,
        prod,
        initInstanceSuccess
      });
      if (initInstanceSuccess === false) {
        throw new Error('jest error');
      }
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        success: initInstanceSuccess
      };
    },
    async TappayGetDeviceId() {
      return 'mockDeviceId';
    },
    async TappaySetTPDCard(
      cardNumber: string,
      dueMonth: string,
      dueYear: string,
      CCV: string
    ) {
      console.log('TappaySetTPDCard', { cardNumber, dueMonth, dueYear, CCV });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        cardNumber,
        dueMonth,
        dueYear,
        CCV,
        isCardNumberValid,
        isExpiryDateValid,
        isCCVValid,
        cardType
      };
    },
    async TappayGetDirectPayPrime(geoLocation: string) {
      console.log('TappayGetDirectPayPrime', { geoLocation });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime',
        cardInfo: {
          bincode: 'mockBincode',
          lastFour: 'mockLastFour',
          issuer: 'mockIssuer',
          level: 'mockLevel',
          country: 'mockCountry',
          countryCode: 'mockCountryCode',
          cardType: -1,
          funding: -1,
          issuerZhTw: 'mockIssuerZhTw',
          bankId: 'mockBankId'
        },
        cardIdentifier: 'mockCardIdentifier',
        merchantReferenceInfo: {
          affiliateCodes: ['mockAffiliateCodes']
        }
      };
    },
    async TappayGooglePayInit(merchantName: string) {
      console.log('TappayGooglePayInit', { merchantName });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: googlePlayIsReady,
        msg: 'mockMsg'
      };
    },
    async TappayGetGooglePayPrime(totalPrice: string, currencyCode: string) {
      console.log('TappayGetGooglePayPrime', { totalPrice, currencyCode });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        cardDescription: 'mockCardDescription',
        prime: 'mockPrime',
        cardInfo: {
          bincode: 'mockBincode',
          lastFour: 'mockLastFour',
          issuer: 'mockIssuer',
          level: 'mockLevel',
          country: 'mockCountry',
          countryCode: 'mockCountryCode',
          cardType: -1,
          funding: -1,
          issuerZhTw: 'mockIssuerZhTw',
          bankId: 'mockBankId'
        },
        merchantReferenceInfo: {
          affiliateCodes: ['mockAffiliateCodes']
        }
      };
    },
    async TappayIsApplePayAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: applePlayIsReady
      };
    },
    async TappayAapplePayInit(
      merchantName: string,
      merchantId: string,
      countryCode: string,
      currencyCode: string
    ) {
      console.log('TappayAapplePayInit', {
        merchantName,
        merchantId,
        countryCode,
        currencyCode
      });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: applePlayIsReady
      };
    },
    async TappayGetApplePayPrime(amount: string) {
      console.log('TappayGetApplePayPrime', { amount });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime',
        expiryMillis: 'mockExpiryMillis',
        merchantReferenceInfo: 'mockMerchantReferenceInfo',
        cart: 'mockCart',
        consumer: 'mockConsumer',
        paymentMethod: 'mockPaymentMethod'
      };
    },
    async TappayLinePayHandleURL(openUri: string) {
      console.log('TappayLinePayHandleURL', { openUri });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        openUri,
        success: linePayHandleURL
      };
    },
    async TappayIsLinePayAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: linePlayIsReady
      };
    },
    async TappayLinePayInit(linePayCallbackUri: string) {
      console.log('TappayLinePayInit', { linePayCallbackUri });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: linePlayIsReady,
        linePayCallbackUri
      };
    },
    async TappayGetLinePayPrime() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime'
      };
    },
    async TappayLinePayRedirectWithUrl(paymentUrl: string) {
      console.log('TappayLinePayRedirectWithUrl', { paymentUrl });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: 'mockStatus',
        nrecTradeId: 'mockNrecTradeId',
        nbankTransactionId: 'mockNbankTransactionId',
        norderNumber: 'mockNorderNumber'
      };
    },
    async TappaySamsungPayInit(
      merchantName: string,
      merchantId: string,
      currencyCode: string,
      serviceId: string
    ) {
      console.log('TappaySamsungPayInit', {
        merchantName,
        merchantId,
        currencyCode,
        serviceId
      });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: samsungPayIsReady
      };
    },
    async TappayGetSamsungPayPrime(
      itemTotalAmount: string,
      shippingPrice: string,
      tax: string,
      totalAmount: string
    ) {
      console.log('TappayGetSamsungPayPrime', {
        itemTotalAmount,
        shippingPrice,
        tax,
        totalAmount
      });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime',
        cardInfo: {
          bincode: 'mockBincode',
          lastFour: 'mockLastFour',
          issuer: 'mockIssuer',
          level: 'mockLevel',
          country: 'mockCountry',
          countryCode: 'mockCountryCode',
          cardType: -1,
          funding: -1,
          issuerZhTw: 'mockIssuerZhTw',
          bankId: 'mockBankId'
        },
        merchantReferenceInfo: {
          affiliateCodes: ['mockAffiliateCodes']
        }
      };
    },
    async TappayIsJkoPayAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: jkoPayIsReady
      };
    },
    async TappayJkoPayInit(jkoPayUniversalLinks: string) {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: jkoPayIsReady,
        jkoPayUniversalLinks
      };
    },
    async TappayGetJkoPayPrime() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime'
      };
    },
    async TappayJkoPayRedirectWithUrl(paymentUrl: string) {
      console.log('TappayJkoPayRedirectWithUrl', { paymentUrl });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: 'mockStatus',
        nrecTradeId: 'mockNrecTradeId',
        nbankTransactionId: 'mockNbankTransactionId',
        norderNumber: 'mockNorderNumber'
      };
    },
    async TappayJkoPayHandleUniversalLink(url: string) {
      console.log('TappayJkoPayHandleUniversalLink', { url });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        url,
        success: jkoPayHandleUniversalLink
      };
    },
    async TappayIsEasyWalletAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: easyWalletIsReady
      };
    },
    async TappayEasyWalletInit(easyWalletUniversalLinks: string) {
      console.log('TappayEasyWalletInit', { easyWalletUniversalLinks });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: easyWalletIsReady,
        easyWalletUniversalLinks
      };
    },
    async TappayGetEasyWalletPrime() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime'
      };
    },
    async TappayEasyWalletRedirectWithUrl(paymentUrl: string) {
      console.log('TappayEasyWalletRedirectWithUrl', { paymentUrl });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: 'mockStatus',
        nrecTradeId: 'mockNrecTradeId',
        nbankTransactionId: 'mockNbankTransactionId',
        norderNumber: 'mockNorderNumber'
      };
    },
    async TappayEasyWalletHandleUniversalLink(url: string) {
      console.log('TappayEasyWalletHandleUniversalLink', { url });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        url,
        success: easyWalletHandleUniversalLink
      };
    },
    async TappayIsPiWalletAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: piWalletIsReady
      };
    },
    async TappayPiWalletInit(piWalletUniversalLinks: string) {
      console.log('TappayPiWalletInit', { piWalletUniversalLinks });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: piWalletIsReady,
        piWalletUniversalLinks
      };
    },
    async TappayGetPiWalletPrime() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime'
      };
    },
    async TappayPiWalletRedirectWithUrl(paymentUrl: string) {
      console.log('TappayPiWalletRedirectWithUrl', { paymentUrl });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: 'mockStatus',
        nrecTradeId: 'mockNrecTradeId',
        nbankTransactionId: 'mockNbankTransactionId',
        norderNumber: 'mockNorderNumber'
      };
    },
    async TappayPiWalletHandleUniversalLink(url: string) {
      console.log('TappayPiWalletHandleUniversalLink', { url });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        url,
        success: piWalletHandleUniversalLink
      };
    },
    async TappayIsPlusPayAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: plusPayIsReady
      };
    },
    async TappayPlusPayInit(plusPayUniversalLinks: string) {
      console.log('TappayPlusPayInit', { plusPayUniversalLinks });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: plusPayIsReady,
        plusPayUniversalLinks
      };
    },
    async TappayGetPlusPayPrime() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime'
      };
    },
    async TappayPlusPayRedirectWithUrl(paymentUrl: string) {
      console.log('TappayPlusPayRedirectWithUrl', { paymentUrl });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: 'mockStatus',
        nrecTradeId: 'mockNrecTradeId',
        nbankTransactionId: 'mockNbankTransactionId',
        norderNumber: 'mockNorderNumber'
      };
    },
    async TappayPlusPayHandleUniversalLink(url: string) {
      console.log('TappayPlusPayHandleUniversalLink', { url });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        url,
        success: plusPayHandleUniversalLink
      };
    },
    async TappayIsAtomeAvailable() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: atomeIsReady
      };
    },
    async TappayAtomeInit(atomeUniversalLinks: string) {
      console.log('TappayAtomeInit', { atomeUniversalLinks });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: atomeIsReady,
        atomeUniversalLinks
      };
    },
    async TappayGetAtomePrime() {
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        prime: 'mockPrime'
      };
    },
    async TappayAtomeRedirectWithUrl(paymentUrl: string) {
      console.log('TappayAtomeRedirectWithUrl', { paymentUrl });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: 'mockStatus',
        nrecTradeId: 'mockNrecTradeId',
        nbankTransactionId: 'mockNbankTransactionId',
        norderNumber: 'mockNorderNumber'
      };
    },
    async TappayAtomeHandleUniversalLink(url: string) {
      console.log('TappayAtomeHandleUniversalLink', { url });
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        url,
        success: atomeHandleUniversalLink
      };
    }
  }
};

ReactNative.Platform = {
  OS: systemOS
};

module.exports = ReactNative;
