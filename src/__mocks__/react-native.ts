const ReactNative: any = jest.createMockFromModule('react-native');

const LOG = false;

let initInstanceSuccess: boolean = true;
let isCardNumberValid: boolean = false;
let isExpiryDateValid: boolean = false;
let isCCVValid: boolean = false;
let cardType: string = 'Unknown';
let systemOS: string = 'ios';

let linePayError: boolean = false;
let linePayCancel: boolean = false;
let samsungPayError: boolean = false;
let samsungPayCanceled: boolean = false;
let jkoPayError: boolean = false;
let easyWalletError: boolean = false;
let piWalletError: boolean = false;
let plusPayError: boolean = false;
let atomePayError: boolean = false;

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

ReactNative._setSystemOS = function (_systemOS: string) {
  systemOS = _systemOS;
  ReactNative.Platform.OS = _systemOS;
};

ReactNative._setLinePayError = function (_linePayError: boolean) {
  linePayError = _linePayError;
};
ReactNative._setLinePayCancel = function (_linePayCancel: boolean) {
  linePayCancel = _linePayCancel;
};
ReactNative._setSamsungPayError = function (_samsungPayError: boolean) {
  samsungPayError = _samsungPayError;
};
ReactNative._setSamsungPayCancel = function (_samsungPayCanceled: boolean) {
  samsungPayCanceled = _samsungPayCanceled;
};
ReactNative._setJkoPayError = function (_jkoPayError: boolean) {
  jkoPayError = _jkoPayError;
};
ReactNative._setEasyWalletError = function (_easyWalletError: boolean) {
  easyWalletError = _easyWalletError;
};
ReactNative._setPiWalletError = function (_piWalletError: boolean) {
  piWalletError = _piWalletError;
};
ReactNative._setPlusPayError = function (_plusPayError: boolean) {
  plusPayError = _plusPayError;
};
ReactNative._setAtomePayError = function (_atomePayError: boolean) {
  atomePayError = _atomePayError;
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
      if (LOG) {
        console.log('TappayInitInstance', {
          appId,
          appKey,
          prod,
          initInstanceSuccess
        });
      }
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
      if (LOG) {
        console.log('TappaySetTPDCard', { cardNumber, dueMonth, dueYear, CCV });
      }
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
      if (LOG) {
        console.log('TappayGetDirectPayPrime', { geoLocation });
      }
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
      if (LOG) {
        console.log('TappayGooglePayInit', { merchantName });
      }
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: googlePlayIsReady,
        msg: 'mockMsg'
      };
    },
    async TappayGetGooglePayPrime(totalPrice: string, currencyCode: string) {
      if (LOG) {
        console.log('TappayGetGooglePayPrime', { totalPrice, currencyCode });
      }
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
      if (LOG) {
        console.log('TappayAapplePayInit', {
          merchantName,
          merchantId,
          countryCode,
          currencyCode
        });
      }
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: applePlayIsReady
      };
    },
    async TappayGetApplePayPrime(amount: string) {
      if (LOG) {
        console.log('TappayGetApplePayPrime', { amount });
      }
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
      if (LOG) {
        console.log('TappayLinePayHandleURL', { openUri });
      }
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
      if (LOG) {
        console.log('TappayLinePayInit', { linePayCallbackUri });
      }
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
      if (LOG) {
        console.log('TappayLinePayRedirectWithUrl', { paymentUrl });
      }
      if (linePayError) {
        throw new Error('mockError');
      }
      return {
        systemOS,
        tappaySDKVersion: 'mock',
        paymentUrl,
        status: linePayCancel === true ? 924 : 'mockStatus',
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
      if (LOG) {
        console.log('TappaySamsungPayInit', {
          merchantName,
          merchantId,
          currencyCode,
          serviceId
        });
      }
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
      if (LOG) {
        console.log('TappayGetSamsungPayPrime', {
          itemTotalAmount,
          shippingPrice,
          tax,
          totalAmount
        });
      }
      if (samsungPayError === true) {
        throw new Error('mockError');
      }
      if (samsungPayCanceled === true) {
        const error: any = new Error('canceled');
        error.userInfo = { status: 88011 };
        throw error;
      }
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
      if (LOG) {
        console.log('TappayJkoPayRedirectWithUrl', { paymentUrl });
      }
      if (jkoPayError === true) {
        throw new Error('mockError');
      }
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
      if (LOG) {
        console.log('TappayJkoPayHandleUniversalLink', { url });
      }
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
      if (LOG) {
        console.log('TappayEasyWalletInit', { easyWalletUniversalLinks });
      }
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
      if (LOG) {
        console.log('TappayEasyWalletRedirectWithUrl', { paymentUrl });
      }
      if (easyWalletError === true) {
        throw new Error('mockError');
      }
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
      if (LOG) {
        console.log('TappayEasyWalletHandleUniversalLink', { url });
      }
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
      if (LOG) {
        console.log('TappayPiWalletInit', { piWalletUniversalLinks });
      }
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
      if (LOG) {
        console.log('TappayPiWalletRedirectWithUrl', { paymentUrl });
      }
      if (piWalletError === true) {
        throw new Error('mockError');
      }
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
      if (LOG) {
        console.log('TappayPiWalletHandleUniversalLink', { url });
      }
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
      if (LOG) {
        console.log('TappayPlusPayInit', { plusPayUniversalLinks });
      }
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
      if (LOG) {
        console.log('TappayPlusPayRedirectWithUrl', { paymentUrl });
      }
      if (plusPayError) {
        throw new Error('mockError');
      }
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
      if (LOG) {
        console.log('TappayPlusPayHandleUniversalLink', { url });
      }
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
      if (LOG) {
        console.log('TappayAtomeInit', { atomeUniversalLinks });
      }
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
      if (LOG) {
        console.log('TappayAtomeRedirectWithUrl', { paymentUrl });
      }
      if (atomePayError === true) {
        throw new Error('mockError');
      }
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
      if (LOG) {
        console.log('TappayAtomeHandleUniversalLink', { url });
      }
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

ReactNative.AppState = {
  currentState: 'background',
  addEventListener: (_: any, onChange: Function) => {
    ReactNative._AppStateChange = onChange;
    return { remove: () => onChange };
  }
};
ReactNative._AppStateChange = () => {};

module.exports = ReactNative;

export default ReactNative;
