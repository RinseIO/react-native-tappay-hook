import { Tappay } from '../oop';

import { setAppId, setAppKey, getProd, setProd } from '../cacheStatus';

jest.mock('react-native');

describe('oop test(android)', () => {
  const systemOS = 'android';
  beforeEach(() => {
    require('react-native')._setSystemOS(systemOS);
    require('react-native')._setInitInstanceSuccess(true);
    setAppId(-1);
    setAppKey('');
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

  test('init() test', () => {
    expect(Tappay.init(128088, 'app_key', false) instanceof Promise).toBe(true);
  });

  test('rerun init() test', async () => {
    await Tappay.init(128088, 'app_key', false);
    expect(Tappay.init(128088, 'app_key', false) instanceof Promise).toBe(true);
  });

  test('getDeviceId() test', async () => {
    expect(await Tappay.getDeviceId()).toBe('mockDeviceId');
  });

  test('setDirectPayTPDCard() test', async () => {
    require('react-native')._setCardType('JCB');
    expect(
      await Tappay.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
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
    expect(await Tappay.getDirectPayPrime()).toMatchObject({
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
    expect(await Tappay.googlePayInit('TEST MERCHANT NAME')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      msg: 'mockMsg'
    });
  });

  test('getGooglePayPrime() test', async () => {
    expect(await Tappay.getGooglePayPrime('1', 'TWD')).toMatchObject({
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
    expect(await Tappay.isApplePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: false
    });
  });

  test('applePayInit() test', async () => {
    expect(
      await Tappay.applePayInit(
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
    // expect(await Tappay.getApplePayPrime('1')).toThrow();
    expect(await Tappay.getApplePayPrime('1')).toBeUndefined();
  });

  test('linePayHandleURL() test', async () => {
    expect(await Tappay.linePayHandleURL('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      openUri: 'url',
      success: false
    });
  });

  test('isLinePayAvailable() test', async () => {
    expect(await Tappay.isLinePayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('linePayInit() test', async () => {
    expect(
      await Tappay.linePayInit('linepayexample://tech.cherri')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      linePayCallbackUri: 'linepayexample://tech.cherri'
    });
  });

  test('getLinePayPrime() test', async () => {
    expect(await Tappay.getLinePayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('linePayRedirectWithUrl() test', async () => {
    expect(await Tappay.linePayRedirectWithUrl('paymentUrl')).toMatchObject({
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
      await Tappay.samsungPayInit(
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
    expect(await Tappay.getSamsungPayPrime('1', '0', '0', '1')).toMatchObject({
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
    expect(await Tappay.isJkoPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('jkoPayInit() test', async () => {
    expect(
      await Tappay.jkoPayInit('jkoexample://jko.uri:8888/test')
    ).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      jkoPayUniversalLinks: 'jkoexample://jko.uri:8888/test'
    });
  });

  test('getJkoPayPrime() test', async () => {
    expect(await Tappay.getJkoPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    expect(await Tappay.jkoPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    expect(await Tappay.jkoPayHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isEasyWalletAvailable() test', async () => {
    expect(await Tappay.isEasyWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('easyWalletInit() test', async () => {
    expect(await Tappay.easyWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      easyWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getEasyWalletPrime() test', async () => {
    expect(await Tappay.getEasyWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    expect(await Tappay.easyWalletRedirectWithUrl('paymentUrl')).toMatchObject({
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
    expect(await Tappay.easyWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url',
      success: false
    });
  });

  test('isPiWalletAvailable() test', async () => {
    expect(await Tappay.isPiWalletAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('piWalletInit() test', async () => {
    expect(await Tappay.piWalletInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      piWalletUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getPiWalletPrime() test', async () => {
    expect(await Tappay.getPiWalletPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('piWalletRedirectWithUrl() test', async () => {
    expect(await Tappay.piWalletRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('piWalletHandleUniversalLink() test', async () => {
    expect(await Tappay.piWalletHandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isPlusPayAvailable() test', async () => {
    expect(await Tappay.isPlusPayAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('plusPayInit() test', async () => {
    expect(
      await Tappay.plusPayInit(
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
    expect(await Tappay.getPlusPayPrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('plusPayRedirectWithUrl() test', async () => {
    expect(await Tappay.plusPayRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('plusPayhandleUniversalLink() test', async () => {
    expect(await Tappay.plusPayhandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('isAtomeAvailable() test', async () => {
    expect(await Tappay.isAtomeAvailable()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true
    });
  });

  test('atomeInit() test', async () => {
    expect(await Tappay.atomeInit('https://google.com.tw')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      isReadyToPay: true,
      atomeUniversalLinks: 'https://google.com.tw'
    });
  });

  test('getAtomePrime() test', async () => {
    expect(await Tappay.getAtomePrime()).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      prime: 'mockPrime'
    });
  });

  test('atomeRedirectWithUrl() test', async () => {
    expect(await Tappay.atomeRedirectWithUrl('paymentUrl')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      paymentUrl: 'paymentUrl'
    });
  });

  test('atomehandleUniversalLink() test', async () => {
    expect(await Tappay.atomehandleUniversalLink('url')).toMatchObject({
      systemOS,
      tappaySDKVersion: 'mock',
      url: 'url'
    });
  });

  test('directPayTest', async () => {
    expect(await Tappay.directPayTest()).toBeUndefined();
  });

  test('googlePayTest', async () => {
    expect(await Tappay.googlePayTest('TEST MERCHANT NAME')).toBeUndefined();
  });

  test('googlePayTest not ready', async () => {
    require('react-native')._setGooglePlayIsReady(false);
    expect(await Tappay.googlePayTest('TEST MERCHANT NAME')).toBeUndefined();
  });

  test('applePayTest', async () => {
    const prod = getProd();
    setProd(true);
    expect(
      await Tappay.applePayTest(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    ).toBeUndefined();
    setProd(prod);
  });

  test('linePayTest', async () => {
    expect(
      await Tappay.linePayTest('linepayexample://tech.cherri')
    ).toBeUndefined();
  });

  test('samsungPayTest', async () => {
    expect(
      await Tappay.samsungPayTest(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).toBeUndefined();
  });

  test('jkoPayTest', async () => {
    expect(
      await Tappay.jkoPayTest('jkoexample://jko.uri:8888/test')
    ).toBeUndefined();
  });

  test('easyWalletTest', async () => {
    expect(
      await Tappay.easyWalletTest('https://google.com.tw')
    ).toBeUndefined();
  });

  test('piWalletTest', async () => {
    expect(await Tappay.piWalletTest('https://google.com.tw')).toBeUndefined();
  });

  test('plusPayTest', async () => {
    expect(
      await Tappay.plusPayTest(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).toBeUndefined();
  });

  test('linePayTest not ready', async () => {
    require('react-native')._setLinePlayIsReady(false);
    expect(
      await Tappay.linePayTest('linepayexample://tech.cherri')
    ).toBeUndefined();
  });

  test('samsungPayTest not ready', async () => {
    require('react-native')._setSamsungPayIsReady(false);
    expect(
      await Tappay.samsungPayTest(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).toBeUndefined();
  });

  test('jkoPayTest not ready', async () => {
    require('react-native')._setJkoPayIsReady(false);
    expect(
      await Tappay.jkoPayTest('jkoexample://jko.uri:8888/test')
    ).toBeUndefined();
  });

  test('easyWalletTest not ready', async () => {
    require('react-native')._setEasyWalletIsReady(false);
    expect(
      await Tappay.easyWalletTest('https://google.com.tw')
    ).toBeUndefined();
  });

  test('piWalletTest not ready', async () => {
    require('react-native')._setPiWalletIsReady(false);
    expect(await Tappay.piWalletTest('https://google.com.tw')).toBeUndefined();
  });

  test('plusPayTest not ready', async () => {
    require('react-native')._setPlusPayIsReady(false);
    expect(
      await Tappay.plusPayTest(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).toBeUndefined();
  });
});
