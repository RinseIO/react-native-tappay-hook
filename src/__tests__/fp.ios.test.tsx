import * as TappayFP from '../fp';

import { setAppId, setAppKey } from '../cacheStatus';

jest.mock('react-native');

describe('TappayFP test(ios)', () => {
  const systemOS = 'ios';
  beforeEach(() => {
    require('react-native')._setSystemOS(systemOS);
    require('react-native')._setInitInstanceSuccess(true);
    setAppId(-1);
    setAppKey('');
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
      TappayFP.tappayInitialization(128088, 'app_key', false) instanceof Promise
    ).toBe(true);
  });

  test('rerun tappayInitialization() test', async () => {
    await TappayFP.tappayInitialization(128088, 'app_key', false);
    expect(
      TappayFP.tappayInitialization(128088, 'app_key', false) instanceof Promise
    ).toBe(true);
  });

  test('getDeviceId() test', async () => {
    expect(await TappayFP.getDeviceId()).toBe('mockDeviceId');
  });

  test('setDirectPayTPDCard() test', async () => {
    require('react-native')._setCardType('JCB');
    expect(
      await TappayFP.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
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
    expect(await TappayFP.getDirectPayPrime()).toMatchObject({
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
    expect(await TappayFP.googlePayInit('TEST MERCHANT NAME')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: false,
      msg: 'mockMsg'
    });
  });

  test('getGooglePayPrime() test', async () => {
    expect(await TappayFP.getGooglePayPrime('1', 'TWD')).toBeUndefined();
  });

  test('isApplePayAvailable() test', async () => {
    expect(await TappayFP.isApplePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('applePayInit() test', async () => {
    expect(
      await TappayFP.applePayInit(
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
    expect(await TappayFP.getApplePayPrime('1')).toMatchObject({
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
    expect(await TappayFP.linePayHandleURL('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      openUri: 'url',
      success: false
    });
  });

  test('isLinePayAvailable() test', async () => {
    expect(await TappayFP.isLinePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('linePayInit() test', async () => {
    expect(
      await TappayFP.linePayInit('linepayexample://tech.cherri')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      linePayCallbackUri: 'linepayexample://tech.cherri'
    });
  });

  test('getLinePayPrime() test', async () => {
    expect(await TappayFP.getLinePayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('linePayRedirectWithUrl() test', async () => {
    expect(await TappayFP.linePayRedirectWithUrl('paymentUrl')).toMatchObject({
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
      await TappayFP.samsungPayInit(
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
    expect(
      await TappayFP.getSamsungPayPrime('1', '0', '0', '1')
    ).toBeUndefined();
  });

  test('isJkoPayAvailable() test', async () => {
    expect(await TappayFP.isJkoPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('jkoPayInit() test', async () => {
    expect(
      await TappayFP.jkoPayInit('jkoexample://jko.uri:8888/test')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      jkoPayUniversalLinks: 'jkoexample://jko.uri:8888/test'
    });
  });

  test('getJkoPayPrime() test', async () => {
    expect(await TappayFP.getJkoPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    expect(await TappayFP.jkoPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    expect(await TappayFP.jkoPayHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isEasyWalletAvailable() test', async () => {
    expect(await TappayFP.isEasyWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('easyWalletInit() test', async () => {
    expect(
      await TappayFP.easyWalletInit('https://google.com.tw')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      easyWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getEasyWalletPrime() test', async () => {
    expect(await TappayFP.getEasyWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    expect(
      await TappayFP.easyWalletRedirectWithUrl('paymentUrl')
    ).toMatchObject({
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
    expect(await TappayFP.easyWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isPiWalletAvailable() test', async () => {
    expect(await TappayFP.isPiWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('piWalletInit() test', async () => {
    expect(await TappayFP.piWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      piWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getPiWalletPrime() test', async () => {
    expect(await TappayFP.getPiWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('piWalletRedirectWithUrl() test', async () => {
    expect(await TappayFP.piWalletRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('piWalletHandleUniversalLink() test', async () => {
    expect(await TappayFP.piWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isPlusPayAvailable() test', async () => {
    expect(await TappayFP.isPlusPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('plusPayInit() test', async () => {
    expect(
      await TappayFP.plusPayInit(
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
    expect(await TappayFP.getPlusPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('plusPayRedirectWithUrl() test', async () => {
    expect(await TappayFP.plusPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('plusPayhandleUniversalLink() test', async () => {
    expect(await TappayFP.plusPayhandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isAtomeAvailable() test', async () => {
    expect(await TappayFP.isAtomeAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('atomeInit() test', async () => {
    expect(await TappayFP.atomeInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      atomeUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getAtomePrime() test', async () => {
    expect(await TappayFP.getAtomePrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('atomeRedirectWithUrl() test', async () => {
    expect(await TappayFP.atomeRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('atomehandleUniversalLink() test', async () => {
    expect(await TappayFP.atomehandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });
});
