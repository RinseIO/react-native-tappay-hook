import * as cacheStatus from '../cacheStatus';

describe('cacheStatus test', () => {
  beforeEach(() => {
    cacheStatus.setAppId(-1);
    cacheStatus.setAppKey('');
    cacheStatus.setProd(false);
    cacheStatus.setInitPromise(null);
    cacheStatus.setStatusDeviceId('');
    cacheStatus.setGooglePlayIsReady(false);
    cacheStatus.setApplePlayIsReady(false);
    cacheStatus.setLinePlayIsReady(false);
    cacheStatus.setSamsungPayIsReady(false);
    cacheStatus.setJkoPayIsReady(false);
    cacheStatus.setEasyWalletIsReady(false);
    cacheStatus.setPiWalletIsReady(false);
    cacheStatus.setPlusPayIsReady(false);
    cacheStatus.setAtomeIsReady(false);
  });
  test('getAppId() test', () => {
    expect(cacheStatus.getAppId()).toBe(-1);
  });

  test('setAppId() test', () => {
    cacheStatus.setAppId(100);
    expect(cacheStatus.getAppId()).toBe(100);
  });
  test('getAppKey() test', () => {
    expect(cacheStatus.getAppKey()).toBe('');
  });

  test('setAppKey() test', () => {
    cacheStatus.setAppKey('true');
    expect(cacheStatus.getAppKey()).toBe('true');
  });
  test('getProd() test', () => {
    expect(cacheStatus.getProd()).toBe(false);
  });

  test('setProd() test', () => {
    cacheStatus.setProd(true);
    expect(cacheStatus.getProd()).toBe(true);
  });

  test('getInitPromise() test', () => {
    expect(cacheStatus.getInitPromise()).toBeNull();
  });

  // https://stackoverflow.com/questions/62564800/how-to-assert-data-type-with-jest
  test('setInitPromise() test', () => {
    cacheStatus.setInitPromise((async () => {})());
    expect(cacheStatus.getInitPromise() instanceof Promise).toBe(true);
  });

  test('getStatusDeviceId() test', () => {
    expect(cacheStatus.getStatusDeviceId()).toBe('');
  });

  test('setStatusDeviceId() test', () => {
    cacheStatus.setStatusDeviceId('deviceId test');
    expect(cacheStatus.getStatusDeviceId()).toBe('deviceId test');
  });

  test('getGooglePlayIsReady() test', () => {
    expect(cacheStatus.getGooglePlayIsReady()).toBe(false);
  });

  test('setGooglePlayIsReady() test', () => {
    cacheStatus.setGooglePlayIsReady(true);
    expect(cacheStatus.getGooglePlayIsReady()).toBe(true);
  });

  test('getApplePlayIsReady() test', () => {
    expect(cacheStatus.getApplePlayIsReady()).toBe(false);
  });

  test('setApplePlayIsReady() test', () => {
    cacheStatus.setApplePlayIsReady(true);
    expect(cacheStatus.getApplePlayIsReady()).toBe(true);
  });

  test('getLinePlayIsReady() test', () => {
    expect(cacheStatus.getLinePlayIsReady()).toBe(false);
  });

  test('setLinePlayIsReady() test', () => {
    cacheStatus.setLinePlayIsReady(true);
    expect(cacheStatus.getLinePlayIsReady()).toBe(true);
  });

  test('getSamsungPayIsReady() test', () => {
    expect(cacheStatus.getSamsungPayIsReady()).toBe(false);
  });

  test('setSamsungPayIsReady() test', () => {
    cacheStatus.setSamsungPayIsReady(true);
    expect(cacheStatus.getSamsungPayIsReady()).toBe(true);
  });

  test('getJkoPayIsReady() test', () => {
    expect(cacheStatus.getJkoPayIsReady()).toBe(false);
  });

  test('setJkoPayIsReady() test', () => {
    cacheStatus.setJkoPayIsReady(true);
    expect(cacheStatus.getJkoPayIsReady()).toBe(true);
  });

  test('getEasyWalletIsReady() test', () => {
    expect(cacheStatus.getEasyWalletIsReady()).toBe(false);
  });

  test('setEasyWalletIsReady() test', () => {
    cacheStatus.setEasyWalletIsReady(true);
    expect(cacheStatus.getEasyWalletIsReady()).toBe(true);
  });

  test('getPiWalletIsReady() test', () => {
    expect(cacheStatus.getPiWalletIsReady()).toBe(false);
  });

  test('setPiWalletIsReady() test', () => {
    cacheStatus.setPiWalletIsReady(true);
    expect(cacheStatus.getPiWalletIsReady()).toBe(true);
  });

  test('getPlusPayIsReady() test', () => {
    expect(cacheStatus.getPlusPayIsReady()).toBe(false);
  });

  test('setPlusPayIsReady() test', () => {
    cacheStatus.setPlusPayIsReady(true);
    expect(cacheStatus.getPlusPayIsReady()).toBe(true);
  });

  test('getAtomeIsReady() test', () => {
    expect(cacheStatus.getAtomeIsReady()).toBe(false);
  });

  test('setAtomeIsReady() test', () => {
    cacheStatus.setAtomeIsReady(true);
    expect(cacheStatus.getAtomeIsReady()).toBe(true);
  });
});
