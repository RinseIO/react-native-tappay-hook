import * as TappayFP from '../fp';

import { setInitPromise, setAppId, setAppKey } from '../cacheStatus';

jest.mock('react-native');

describe('TappayFP test(throw)', () => {
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

  test('tappayInitialization() test', () => {
    expect(
      TappayFP.tappayInitialization(128088, 'app_key', false) instanceof Promise
    ).toBe(true);
  });

  test('tappayInitialization() errorHandler test', () => {
    expect(
      TappayFP.tappayInitialization(128088, 'app_key', false, (error: any) =>
        console.log(error)
      ) instanceof Promise
    ).toBe(true);
  });

  test('getDeviceId() test', async () => {
    await expect(TappayFP.getDeviceId()).rejects.toThrow();
  });

  test('setDirectPayTPDCard() test', async () => {
    await expect(
      TappayFP.setDirectPayTPDCard('3549134477691421', '07', '25', '465')
    ).rejects.toThrow();
  });

  test('getDirectPayPrime() test', async () => {
    await expect(TappayFP.getDirectPayPrime()).rejects.toThrow();
  });

  test('googlePayInit() test', async () => {
    await expect(
      TappayFP.googlePayInit('TEST MERCHANT NAME')
    ).rejects.toThrow();
  });

  test('getGooglePayPrime() test', async () => {
    await expect(TappayFP.getGooglePayPrime('1', 'TWD')).rejects.toThrow();
  });

  test('getGooglePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await TappayFP.tappayInitialization(128088, 'app_key', false);
    await expect(TappayFP.getGooglePayPrime('1')).rejects.toThrow();
  });

  test('isApplePayAvailable() test', async () => {
    await expect(TappayFP.isApplePayAvailable()).rejects.toThrow();
  });

  test('applePayInit() test', async () => {
    await expect(
      TappayFP.applePayInit(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    ).rejects.toThrow();
  });

  test('getApplePayPrime() test', async () => {
    await expect(TappayFP.getApplePayPrime('1')).rejects.toThrow();
  });

  test('getApplePayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('ios');
    await TappayFP.tappayInitialization(128088, 'app_key', false);
    await expect(TappayFP.getApplePayPrime('1')).rejects.toThrow();
  });

  test('linePayHandleURL() test', async () => {
    await expect(TappayFP.linePayHandleURL('url')).rejects.toThrow();
  });

  test('isLinePayAvailable() test', async () => {
    await expect(TappayFP.isLinePayAvailable()).rejects.toThrow();
  });

  test('linePayInit() test', async () => {
    await expect(
      TappayFP.linePayInit('linepayexample://tech.cherri')
    ).rejects.toThrow('Tappay has not been initialized!');
  });

  test('getLinePayPrime() test', async () => {
    await expect(TappayFP.getLinePayPrime()).rejects.toThrow();
  });

  test('linePayRedirectWithUrl() test', async () => {
    await expect(
      TappayFP.linePayRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('samsungPayInit() test', async () => {
    require('react-native')._setSystemOS('android');
    await expect(
      TappayFP.samsungPayInit(
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
      TappayFP.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow();
  });

  test('getSamsungPayPrime() test not ready', async () => {
    require('react-native')._setInitInstanceSuccess(true);
    require('react-native')._setSystemOS('android');
    await TappayFP.tappayInitialization(128088, 'app_key', false);
    await expect(
      TappayFP.getSamsungPayPrime('1', '0', '0', '1')
    ).rejects.toThrow();
  });

  test('isJkoPayAvailable() test', async () => {
    await expect(TappayFP.isJkoPayAvailable()).rejects.toThrow();
  });

  test('jkoPayInit() test', async () => {
    await expect(
      TappayFP.jkoPayInit('jkoexample://jko.uri:8888/test')
    ).rejects.toThrow();
  });

  test('getJkoPayPrime() test', async () => {
    await expect(TappayFP.getJkoPayPrime()).rejects.toThrow();
  });

  test('jkoPayRedirectWithUrl() test', async () => {
    await expect(
      TappayFP.jkoPayRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('jkoPayHandleUniversalLink() test', async () => {
    await expect(TappayFP.jkoPayHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isEasyWalletAvailable() test', async () => {
    await expect(TappayFP.isEasyWalletAvailable()).rejects.toThrow();
  });

  test('easyWalletInit() test', async () => {
    await expect(
      TappayFP.easyWalletInit('https://google.com.tw')
    ).rejects.toThrow();
  });

  test('getEasyWalletPrime() test', async () => {
    await expect(TappayFP.getEasyWalletPrime()).rejects.toThrow();
  });

  test('easyWalletRedirectWithUrl() test', async () => {
    await expect(
      TappayFP.easyWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('easyWalletHandleUniversalLink() test', async () => {
    await expect(
      TappayFP.easyWalletHandleUniversalLink('url')
    ).rejects.toThrow();
  });

  test('isPiWalletAvailable() test', async () => {
    await expect(TappayFP.isPiWalletAvailable()).rejects.toThrow();
  });

  test('piWalletInit() test', async () => {
    await expect(
      TappayFP.piWalletInit('https://google.com.tw')
    ).rejects.toThrow();
  });

  test('getPiWalletPrime() test', async () => {
    await expect(TappayFP.getPiWalletPrime()).rejects.toThrow();
  });

  test('piWalletRedirectWithUrl() test', async () => {
    await expect(
      TappayFP.piWalletRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('piWalletHandleUniversalLink() test', async () => {
    await expect(TappayFP.piWalletHandleUniversalLink('url')).rejects.toThrow();
  });

  test('isPlusPayAvailable() test', async () => {
    await expect(TappayFP.isPlusPayAvailable()).rejects.toThrow();
  });

  test('plusPayInit() test', async () => {
    await expect(
      TappayFP.plusPayInit(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    ).rejects.toThrow();
  });

  test('getPlusPayPrime() test', async () => {
    await expect(TappayFP.getPlusPayPrime()).rejects.toThrow();
  });

  test('plusPayRedirectWithUrl() test', async () => {
    await expect(
      TappayFP.plusPayRedirectWithUrl('paymentUrl')
    ).rejects.toThrow();
  });

  test('plusPayhandleUniversalLink() test', async () => {
    await expect(TappayFP.plusPayhandleUniversalLink('url')).rejects.toThrow();
  });

  test('isAtomeAvailable() test', async () => {
    await expect(TappayFP.isAtomeAvailable()).rejects.toThrow();
  });

  test('atomeInit() test', async () => {
    await expect(TappayFP.atomeInit('https://google.com.tw')).rejects.toThrow();
  });

  test('getAtomePrime() test', async () => {
    await expect(TappayFP.getAtomePrime()).rejects.toThrow();
  });

  test('atomeRedirectWithUrl() test', async () => {
    await expect(TappayFP.atomeRedirectWithUrl('paymentUrl')).rejects.toThrow();
  });

  test('atomehandleUniversalLink() test', async () => {
    await expect(TappayFP.atomehandleUniversalLink('url')).rejects.toThrow();
  });
});
