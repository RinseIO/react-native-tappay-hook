import * as fp from '../fp';

import { setInitPromise } from '../cacheStatus';

jest.mock('react-native');

describe('fp test(throw)', () => {
  const systemOS = 'jest';
  beforeEach(() => {
    require('react-native')._setInitInstanceSuccess(false);
    setInitPromise(null);
    require('react-native')._setSystemOS(systemOS);
    require('react-native')._setGooglePlayIsReady(false);
    require('react-native')._setApplePlayIsReady(false);
    require('react-native')._setLinePlayIsReady(false);
    require('react-native')._setSamsungPayIsReady(false);
    require('react-native')._setJkoPayIsReady(false);
    require('react-native')._setEasyWalletIsReady(false);
    require('react-native')._setPiWalletIsReady(false);
    require('react-native')._setPlusPayIsReady(false);
    require('react-native')._setAtomeIsReady(false);
  });

  test('tappayInitialization() test', () => {
    expect(
      fp.tappayInitialization(
        128088,
        'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
        false
      ) instanceof Promise
    ).toBe(true);
  });

  test('getDeviceId() test', async () => {
    expect(await fp.getDeviceId()).toBe('mockDeviceId');
  });

  test('setDirectPayTPDCard() test', async () => {
    expect(
      await fp.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      cardNumber: '3549134477691421',
      dueMonth: '07',
      dueYear: '25',
      CCV: '465',
      isCardNumberValid: false,
      isExpiryDateValid: false,
      isCCVValid: false,
      cardType: 'Unknown',
      isValid: false
    });
  });

  test('getDirectPayPrime() test', async () => {
    expect(await fp.getDirectPayPrime()).toMatchObject({
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
    });
  });

  test('googlePayInit() test', async () => {
    await expect(fp.googlePayInit('TEST MERCHANT NAME')).rejects.toThrow();
  });

  test('getGooglePayPrime() test', async () => {
    await expect(fp.getGooglePayPrime('1', 'TWD')).rejects.toThrow();
  });

  test('getGooglePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await fp.tappayInitialization(
      128088,
      'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
      false
    );
    await expect(fp.getGooglePayPrime('1')).rejects.toThrow();
  });

  test('isApplePayAvailable() test', async () => {
    await expect(fp.isApplePayAvailable()).rejects.toThrow();
  });

  test('applePayInit() test', async () => {
    await expect(
      fp.applePayInit('TEST MERCHANT NAME', 'TEST MERCHANT ID', 'TW', 'TWD')
    ).rejects.toThrow();
  });

  test('getApplePayPrime() test', async () => {
    expect(await fp.getApplePayPrime('1')).toBeUndefined();
  });

  test('getApplePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('ios');
    await fp.tappayInitialization(
      128088,
      'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
      false
    );
    await expect(fp.getApplePayPrime('1')).rejects.toThrow();
  });

  test('linePayHandleURL() test', async () => {
    await expect(fp.linePayHandleURL('url')).rejects.toThrow();
  });

  test('isLinePayAvailable() test', async () => {
    await expect(fp.isLinePayAvailable()).rejects.toThrow();
  });

  test('linePayInit() test', async () => {
    await expect(
      fp.linePayInit('linepayexample://tech.cherri')
    ).rejects.toThrow('Tappay has not been initialized!');
  });

  test('getLinePayPrime() test', async () => {
    await expect(fp.getLinePayPrime()).rejects.toThrow();
  });

  test('linePayRedirectWithUrl() test', async () => {
    await expect(fp.linePayRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('samsungPayInit() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(
      fp.samsungPayInit(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).rejects.toThrow();
  });

  test('getSamsungPayPrime() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(fp.getSamsungPayPrime('1', '0', '0', '1')).rejects.toThrow();
  });

  test('getSamsungPayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await fp.tappayInitialization(
      128088,
      'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
      false
    );
    await expect(fp.getSamsungPayPrime('1', '0', '0', '1')).rejects.toThrow();
  });

  test('isJkoPayAvailable() test', async () => {
    await expect(fp.isJkoPayAvailable()).rejects.toThrow();
  });

  test('jkoPayInit() test', async () => {
    await expect(
      fp.jkoPayInit('jkoexample://jko.uri:8888/test')
    ).rejects.toThrow();
  });

  test('getJkoPayPrime() test', async () => {
    await expect(fp.getJkoPayPrime()).rejects.toThrow();
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    await expect(fp.jkoPayRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    await expect(fp.jkoPayHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isEasyWalletAvailable() test', async () => {
    await expect(fp.isEasyWalletAvailable()).rejects.toThrow();
  });

  test('easyWalletInit() test', async () => {
    await expect(fp.easyWalletInit('https://google.com.tw')).rejects.toThrow();
  });

  test('getEasyWalletPrime() test', async () => {
    await expect(fp.getEasyWalletPrime()).rejects.toThrow();
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    await expect(fp.easyWalletRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('easyWalletHandleUniversalLink() test', async () => {
    await expect(fp.easyWalletHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isPiWalletAvailable() test', async () => {
    await expect(fp.isPiWalletAvailable()).rejects.toThrow();
  });

  test('piWalletInit() test', async () => {
    await expect(fp.piWalletInit('https://google.com.tw')).rejects.toThrow();
  });

  test('getPiWalletPrime() test', async () => {
    await expect(fp.getPiWalletPrime()).rejects.toThrow();
  });

  test('piWalletRedirectWithUrl() test', async () => {
    await expect(fp.piWalletRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('piWalletHandleUniversalLink() test', async () => {
    await expect(fp.piWalletHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isPlusPayAvailable() test', async () => {
    await expect(fp.isPlusPayAvailable()).rejects.toThrow();
  });

  test('plusPayInit() test', async () => {
    await expect(
      fp.plusPayInit('tpdirectexamplepluspay://tech.cherri/myaccount/detail')
    ).rejects.toThrow();
  });

  test('getPlusPayPrime() test', async () => {
    await expect(fp.getPlusPayPrime()).rejects.toThrow();
  });

  test('plusPayRedirectWithUrl() test', async () => {
    await expect(fp.plusPayRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('plusPayhandleUniversalLink() test', async () => {
    await expect(fp.plusPayhandleUniversalLink('url')).rejects.toThrow();
  });

  test('isAtomeAvailable() test', async () => {
    await expect(fp.isAtomeAvailable()).rejects.toThrow();
  });

  test('atomeInit() test', async () => {
    await expect(fp.atomeInit('https://google.com.tw')).rejects.toThrow();
  });

  test('getAtomePrime() test', async () => {
    await expect(fp.getAtomePrime()).rejects.toThrow();
  });

  test('atomeRedirectWithUrl() test', async () => {
    await expect(fp.atomeRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('atomehandleUniversalLink() test', async () => {
    await expect(fp.atomehandleUniversalLink('url')).rejects.toThrow();
  });
});

describe('fp test(android)', () => {
  const systemOS = 'android';
  beforeEach(() => {
    require('react-native')._setSystemOS(systemOS);
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setGooglePlayIsReady(true);
    require('react-native')._setApplePlayIsReady(false);
    require('react-native')._setLinePlayIsReady(true);
    require('react-native')._setSamsungPayIsReady(true);
    require('react-native')._setJkoPayIsReady(true);
    require('react-native')._setEasyWalletIsReady(true);
    require('react-native')._setPiWalletIsReady(true);
    require('react-native')._setPlusPayIsReady(true);
    require('react-native')._setAtomeIsReady(true);
    require('react-native')._setIsCardNumberValid(true);
    require('react-native')._setIsExpiryDateValid(true);
    require('react-native')._setIsCCVValid(true);
    require('react-native')._setCardType('Unknown');
  });

  test('tappayInitialization() test', () => {
    expect(
      fp.tappayInitialization(
        128088,
        'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
        false
      ) instanceof Promise
    ).toBe(true);
  });

  test('rerun tappayInitialization() test', () => {
    expect(
      fp.tappayInitialization(
        128088,
        'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
        false
      ) instanceof Promise
    ).toBe(true);
  });

  test('getDeviceId() test', async () => {
    expect(await fp.getDeviceId()).toBe('mockDeviceId');
  });

  test('setDirectPayTPDCard() test', async () => {
    require('react-native')._setCardType('JCB');
    expect(
      await fp.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      cardNumber: '3549134477691421',
      dueMonth: '07',
      dueYear: '25',
      CCV: '465',
      isCardNumberValid: true,
      isExpiryDateValid: true,
      isCCVValid: true,
      cardType: 'JCB',
      isValid: true
    });
  });

  test('getDirectPayPrime() test', async () => {
    expect(await fp.getDirectPayPrime()).toMatchObject({
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
    });
  });

  test('googlePayInit() test', async () => {
    expect(await fp.googlePayInit('TEST MERCHANT NAME')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      msg: 'mockMsg'
    });
  });

  test('getGooglePayPrime() test', async () => {
    expect(await fp.getGooglePayPrime('1', 'TWD')).toMatchObject({
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
    });
  });

  test('isApplePayAvailable() test', async () => {
    expect(await fp.isApplePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: false
    });
  });

  test('applePayInit() test', async () => {
    expect(
      await fp.applePayInit(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: false
    });
  });

  test('getApplePayPrime() test', async () => {
    // expect(await fp.getApplePayPrime('1')).toThrow();
    expect(await fp.getApplePayPrime('1')).toBeUndefined();
  });

  test('linePayHandleURL() test', async () => {
    expect(await fp.linePayHandleURL('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      openUri: 'url',
      success: false
    });
  });

  test('isLinePayAvailable() test', async () => {
    expect(await fp.isLinePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('linePayInit() test', async () => {
    expect(await fp.linePayInit('linepayexample://tech.cherri')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      linePayCallbackUri: 'linepayexample://tech.cherri'
    });
  });

  test('getLinePayPrime() test', async () => {
    expect(await fp.getLinePayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('linePayRedirectWithUrl() test', async () => {
    expect(await fp.linePayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl',
      status: 'mockStatus',
      nrecTradeId: 'mockNrecTradeId',
      nbankTransactionId: 'mockNbankTransactionId',
      norderNumber: 'mockNorderNumber'
    });
  });

  test('samsungPayInit() test', async () => {
    expect(
      await fp.samsungPayInit(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('getSamsungPayPrime() test', async () => {
    expect(await fp.getSamsungPayPrime('1', '0', '0', '1')).toMatchObject({
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
    });
  });

  test('isJkoPayAvailable() test', async () => {
    expect(await fp.isJkoPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('jkoPayInit() test', async () => {
    expect(await fp.jkoPayInit('jkoexample://jko.uri:8888/test')).toMatchObject(
      {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: true,
        jkoPayUniversalLinks: 'jkoexample://jko.uri:8888/test'
      }
    );
  });

  test('getJkoPayPrime() test', async () => {
    expect(await fp.getJkoPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    expect(await fp.jkoPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    expect(await fp.jkoPayHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isEasyWalletAvailable() test', async () => {
    expect(await fp.isEasyWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('easyWalletInit() test', async () => {
    expect(await fp.easyWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      easyWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getEasyWalletPrime() test', async () => {
    expect(await fp.getEasyWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    expect(await fp.easyWalletRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl',
      status: 'mockStatus',
      nrecTradeId: 'mockNrecTradeId',
      nbankTransactionId: 'mockNbankTransactionId',
      norderNumber: 'mockNorderNumber'
    });
  });

  test('easyWalletHandleUniversalLink() test', async () => {
    expect(await fp.easyWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isPiWalletAvailable() test', async () => {
    expect(await fp.isPiWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('piWalletInit() test', async () => {
    expect(await fp.piWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      piWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getPiWalletPrime() test', async () => {
    expect(await fp.getPiWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('piWalletRedirectWithUrl() test', async () => {
    expect(await fp.piWalletRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('piWalletHandleUniversalLink() test', async () => {
    expect(await fp.piWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isPlusPayAvailable() test', async () => {
    expect(await fp.isPlusPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('plusPayInit() test', async () => {
    expect(
      await fp.plusPayInit(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      plusPayUniversalLinks:
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
    });
  });

  test('getPlusPayPrime() test', async () => {
    expect(await fp.getPlusPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('plusPayRedirectWithUrl() test', async () => {
    expect(await fp.plusPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('plusPayhandleUniversalLink() test', async () => {
    expect(await fp.plusPayhandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isAtomeAvailable() test', async () => {
    expect(await fp.isAtomeAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('atomeInit() test', async () => {
    expect(await fp.atomeInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      atomeUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getAtomePrime() test', async () => {
    expect(await fp.getAtomePrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('atomeRedirectWithUrl() test', async () => {
    expect(await fp.atomeRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('atomehandleUniversalLink() test', async () => {
    expect(await fp.atomehandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });
});

describe('fp test(ios)', () => {
  const systemOS = 'ios';
  beforeEach(() => {
    require('react-native')._setSystemOS(systemOS);
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setGooglePlayIsReady(false);
    require('react-native')._setApplePlayIsReady(true);
    require('react-native')._setLinePlayIsReady(true);
    require('react-native')._setSamsungPayIsReady(false);
    require('react-native')._setJkoPayIsReady(true);
    require('react-native')._setEasyWalletIsReady(true);
    require('react-native')._setPiWalletIsReady(true);
    require('react-native')._setPlusPayIsReady(true);
    require('react-native')._setAtomeIsReady(true);
    require('react-native')._setIsCardNumberValid(true);
    require('react-native')._setIsExpiryDateValid(true);
    require('react-native')._setIsCCVValid(true);
    require('react-native')._setCardType('Unknown');
  });

  test('tappayInitialization() test', () => {
    expect(
      fp.tappayInitialization(
        128088,
        'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
        false
      ) instanceof Promise
    ).toBe(true);
  });

  test('rerun tappayInitialization() test', () => {
    expect(
      fp.tappayInitialization(
        128088,
        'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
        false
      ) instanceof Promise
    ).toBe(true);
  });

  test('getDeviceId() test', async () => {
    expect(await fp.getDeviceId()).toBe('mockDeviceId');
  });

  test('setDirectPayTPDCard() test', async () => {
    require('react-native')._setCardType('JCB');
    expect(
      await fp.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      cardNumber: '3549134477691421',
      dueMonth: '07',
      dueYear: '25',
      CCV: '465',
      isCardNumberValid: true,
      isExpiryDateValid: true,
      isCCVValid: true,
      cardType: 'JCB',
      isValid: true
    });
  });

  test('getDirectPayPrime() test', async () => {
    expect(await fp.getDirectPayPrime()).toMatchObject({
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
    });
  });

  test('googlePayInit() test', async () => {
    expect(await fp.googlePayInit('TEST MERCHANT NAME')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: false,
      msg: 'mockMsg'
    });
  });

  test('getGooglePayPrime() test', async () => {
    expect(await fp.getGooglePayPrime('1', 'TWD')).toBeUndefined();
  });

  test('isApplePayAvailable() test', async () => {
    expect(await fp.isApplePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('applePayInit() test', async () => {
    expect(
      await fp.applePayInit(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('getApplePayPrime() test', async () => {
    expect(await fp.getApplePayPrime('1')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime',
      expiryMillis: 'mockExpiryMillis',
      merchantReferenceInfo: 'mockMerchantReferenceInfo',
      cart: 'mockCart',
      consumer: 'mockConsumer',
      paymentMethod: 'mockPaymentMethod'
    });
  });

  test('linePayHandleURL() test', async () => {
    expect(await fp.linePayHandleURL('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      openUri: 'url',
      success: false
    });
  });

  test('isLinePayAvailable() test', async () => {
    expect(await fp.isLinePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('linePayInit() test', async () => {
    expect(await fp.linePayInit('linepayexample://tech.cherri')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      linePayCallbackUri: 'linepayexample://tech.cherri'
    });
  });

  test('getLinePayPrime() test', async () => {
    expect(await fp.getLinePayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('linePayRedirectWithUrl() test', async () => {
    expect(await fp.linePayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl',
      status: 'mockStatus',
      nrecTradeId: 'mockNrecTradeId',
      nbankTransactionId: 'mockNbankTransactionId',
      norderNumber: 'mockNorderNumber'
    });
  });

  test('samsungPayInit() test', async () => {
    expect(
      await fp.samsungPayInit(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: false
    });
  });

  test('getSamsungPayPrime() test', async () => {
    expect(await fp.getSamsungPayPrime('1', '0', '0', '1')).toBeUndefined();
  });

  test('isJkoPayAvailable() test', async () => {
    expect(await fp.isJkoPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('jkoPayInit() test', async () => {
    expect(await fp.jkoPayInit('jkoexample://jko.uri:8888/test')).toMatchObject(
      {
        systemOS,
        tappaySDKVersion: 'mock',
        isReadyToPay: true,
        jkoPayUniversalLinks: 'jkoexample://jko.uri:8888/test'
      }
    );
  });

  test('getJkoPayPrime() test', async () => {
    expect(await fp.getJkoPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    expect(await fp.jkoPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    expect(await fp.jkoPayHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isEasyWalletAvailable() test', async () => {
    expect(await fp.isEasyWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('easyWalletInit() test', async () => {
    expect(await fp.easyWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      easyWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getEasyWalletPrime() test', async () => {
    expect(await fp.getEasyWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    expect(await fp.easyWalletRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl',
      status: 'mockStatus',
      nrecTradeId: 'mockNrecTradeId',
      nbankTransactionId: 'mockNbankTransactionId',
      norderNumber: 'mockNorderNumber'
    });
  });

  test('easyWalletHandleUniversalLink() test', async () => {
    expect(await fp.easyWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isPiWalletAvailable() test', async () => {
    expect(await fp.isPiWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('piWalletInit() test', async () => {
    expect(await fp.piWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      piWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getPiWalletPrime() test', async () => {
    expect(await fp.getPiWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('piWalletRedirectWithUrl() test', async () => {
    expect(await fp.piWalletRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('piWalletHandleUniversalLink() test', async () => {
    expect(await fp.piWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isPlusPayAvailable() test', async () => {
    expect(await fp.isPlusPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('plusPayInit() test', async () => {
    expect(
      await fp.plusPayInit(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      plusPayUniversalLinks:
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
    });
  });

  test('getPlusPayPrime() test', async () => {
    expect(await fp.getPlusPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('plusPayRedirectWithUrl() test', async () => {
    expect(await fp.plusPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('plusPayhandleUniversalLink() test', async () => {
    expect(await fp.plusPayhandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isAtomeAvailable() test', async () => {
    expect(await fp.isAtomeAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('atomeInit() test', async () => {
    expect(await fp.atomeInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      atomeUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getAtomePrime() test', async () => {
    expect(await fp.getAtomePrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('atomeRedirectWithUrl() test', async () => {
    expect(await fp.atomeRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('atomehandleUniversalLink() test', async () => {
    expect(await fp.atomehandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });
});
