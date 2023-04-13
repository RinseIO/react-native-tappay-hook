import { Tappay, tappay } from '../oop';

import {
  getInitPromise,
  setInitPromise,
  setAppId,
  setAppKey
} from '../cacheStatus';

jest.mock('react-native');

describe('oop test obj', () => {
  test('constructor() test', () => {
    const _Tappay = new tappay();
    expect(_Tappay).toBeInstanceOf(tappay);
  });
  test('get appId test', () => {
    expect(Tappay.appId).toBe(-1);
  });
  test('get appKey test', () => {
    expect(Tappay.appKey).toBe('');
  });
  test('get prod test', () => {
    expect(Tappay.prod).toBe(false);
  });
});

describe('oop test(throw)', () => {
  const systemOS = 'jest';
  beforeEach(() => {
    require('react-native')._setInitInstanceSuccess(false);
    setInitPromise(null);
    setAppId(-1);
    setAppKey('');
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

  test('init() test', () => {
    expect(Tappay.init(128088, 'app_key', false) instanceof Promise).toBe(true);
  });

  test('getDeviceId() test', async () => {
    await expect(Tappay.getDeviceId()).rejects.toThrow();
  });

  test('setDirectPayTPDCard() test', async () => {
    await expect(
      Tappay.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
    ).rejects.toThrow();
  });

  test('getDirectPayPrime() test', async () => {
    await expect(Tappay.getDirectPayPrime()).rejects.toThrow();
  });

  test('googlePayInit() test', async () => {
    await expect(Tappay.googlePayInit('TEST MERCHANT NAME')).rejects.toThrow();
  });

  test('getGooglePayPrime() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(Tappay.getGooglePayPrime('1', 'TWD')).rejects.toThrow();
  });

  test('getGooglePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await Tappay.init(128088, 'app_key', false);
    await expect(Tappay.getGooglePayPrime('1')).rejects.toThrow();
  });

  test('isApplePayAvailable() test', async () => {
    await expect(Tappay.isApplePayAvailable()).rejects.toThrow();
  });

  test('applePayInit() test', async () => {
    await expect(
      Tappay.applePayInit('TEST MERCHANT NAME', 'TEST MERCHANT ID', 'TW', 'TWD')
    ).rejects.toThrow();
  });

  test('getApplePayPrime() test', async () => {
    await expect(Tappay.getApplePayPrime('1')).rejects.toThrow();
  });

  test('getApplePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('ios');
    await Tappay.init(128088, 'app_key', false);
    await expect(Tappay.getApplePayPrime('1')).rejects.toThrow();
  });

  test('linePayHandleURL() test', async () => {
    await expect(Tappay.linePayHandleURL('url')).rejects.toThrow();
  });

  test('isLinePayAvailable() test', async () => {
    await expect(Tappay.isLinePayAvailable()).rejects.toThrow();
  });

  test('linePayInit() test', async () => {
    await expect(
      Tappay.linePayInit('linepayexample://tech.cherri')
    ).rejects.toThrow('Tappay has not been initialized!');
  });

  test('getLinePayPrime() test', async () => {
    await expect(Tappay.getLinePayPrime()).rejects.toThrow();
  });

  test('linePayRedirectWithUrl() test', async () => {
    await expect(Tappay.linePayRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('samsungPayInit() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(
      Tappay.samsungPayInit(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).rejects.toThrow();
  });

  test('getSamsungPayPrime() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(
      Tappay.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow();
  });

  test('getSamsungPayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await Tappay.init(128088, 'app_key', false);
    await expect(
      Tappay.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow();
  });

  test('isJkoPayAvailable() test', async () => {
    await expect(Tappay.isJkoPayAvailable()).rejects.toThrow();
  });

  test('jkoPayInit() test', async () => {
    await expect(
      Tappay.jkoPayInit('jkoexample://jko.uri:8888/test')
    ).rejects.toThrow();
  });

  test('getJkoPayPrime() test', async () => {
    await expect(Tappay.getJkoPayPrime()).rejects.toThrow();
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    await expect(Tappay.jkoPayRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    await expect(Tappay.jkoPayHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isEasyWalletAvailable() test', async () => {
    await expect(Tappay.isEasyWalletAvailable()).rejects.toThrow();
  });

  test('easyWalletInit() test', async () => {
    await expect(
      Tappay.easyWalletInit('https://google.com.tw')
    ).rejects.toThrow();
  });

  test('getEasyWalletPrime() test', async () => {
    await expect(Tappay.getEasyWalletPrime()).rejects.toThrow();
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    await expect(
      Tappay.easyWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('easyWalletHandleUniversalLink() test', async () => {
    await expect(Tappay.easyWalletHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isPiWalletAvailable() test', async () => {
    await expect(Tappay.isPiWalletAvailable()).rejects.toThrow();
  });

  test('piWalletInit() test', async () => {
    await expect(
      Tappay.piWalletInit('https://google.com.tw')
    ).rejects.toThrow();
  });

  test('getPiWalletPrime() test', async () => {
    await expect(Tappay.getPiWalletPrime()).rejects.toThrow();
  });

  test('piWalletRedirectWithUrl() test', async () => {
    await expect(
      Tappay.piWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('piWalletHandleUniversalLink() test', async () => {
    await expect(Tappay.piWalletHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isPlusPayAvailable() test', async () => {
    await expect(Tappay.isPlusPayAvailable()).rejects.toThrow();
  });

  test('plusPayInit() test', async () => {
    await expect(
      Tappay.plusPayInit(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).rejects.toThrow();
  });

  test('getPlusPayPrime() test', async () => {
    await expect(Tappay.getPlusPayPrime()).rejects.toThrow();
  });

  test('plusPayRedirectWithUrl() test', async () => {
    await expect(Tappay.plusPayRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('plusPayhandleUniversalLink() test', async () => {
    await expect(Tappay.plusPayhandleUniversalLink('url')).rejects.toThrow();
  });

  test('isAtomeAvailable() test', async () => {
    await expect(Tappay.isAtomeAvailable()).rejects.toThrow();
  });

  test('atomeInit() test', async () => {
    await expect(Tappay.atomeInit('https://google.com.tw')).rejects.toThrow();
  });

  test('getAtomePrime() test', async () => {
    await expect(Tappay.getAtomePrime()).rejects.toThrow();
  });

  test('atomeRedirectWithUrl() test', async () => {
    await expect(Tappay.atomeRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('atomehandleUniversalLink() test', async () => {
    await expect(Tappay.atomehandleUniversalLink('url')).rejects.toThrow();
  });

  test('directPayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(await Tappay.directPayTest()).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('googlePayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(await Tappay.googlePayTest('TEST MERCHANT NAME')).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('applePayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(
      await Tappay.applePayTest(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    ).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('linePayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(
      await Tappay.linePayTest('linepayexample://tech.cherri')
    ).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('samsungPayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(
      await Tappay.samsungPayTest(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    ).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('jkoPayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(
      await Tappay.jkoPayTest('jkoexample://jko.uri:8888/test')
    ).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('easyWalletTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(
      await Tappay.easyWalletTest('https://google.com.tw')
    ).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('piWalletTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(await Tappay.piWalletTest('https://google.com.tw')).toBeUndefined();
    setInitPromise(initPromise);
  });

  test('plusPayTest', async () => {
    const initPromise = getInitPromise();
    setInitPromise(null);
    expect(
      await Tappay.plusPayTest(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).toBeUndefined();
    setInitPromise(initPromise);
  });
});
