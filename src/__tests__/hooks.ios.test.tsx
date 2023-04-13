import { renderHook, waitFor } from '@testing-library/react';

import * as hooks from '../hooks';
import { tappayInitialization } from '../fp';

jest.mock('react-native');

describe('hooks test(ios)', () => {
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
    tappayInitialization(128088, 'app_key', false);
  });

  test('useSetDirectPayTPDCard() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useSetDirectPayTPDCard('3549134477691421', '07', '25', '465')
    );
    await waitFor(() =>
      expect(result.current).toMatchObject({
        isCardNumberValid: true,
        isExpiryDateValid: true,
        isCCVValid: true,
        isValid: true
      })
    );
  });

  test('useTPDGetDeviceId() test', async () => {
    const { result }: any = renderHook(() => hooks.useTPDGetDeviceId());
    await waitFor(() => expect(result.current).toBe(''));
  });

  test('useTPDGooglePay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDGooglePay('TEST MERCHANT NAME')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false, 'mockMsg']))
    );
  });

  test('useTPDApplePay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDApplePay(
        'TEST MERCHANT NAME',
        'TEST MERCHANT ID',
        'TW',
        'TWD'
      )
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });

  test('useTPDLinePay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDLinePay('linepayexample://tech.cherri')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });

  test('useTPDSamsungPay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDSamsungPay(
        'TapPay Samsung Pay Demo',
        'tech.cherri.samsungpayexample',
        'TWD',
        'your samsung pay service id'
      )
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([false]))
    );
  });

  test('useTPDJkoPay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDJkoPay('jkoexample://jko.uri:8888/test')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });

  test('useTPDEasyWallet() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDEasyWallet('https://google.com.tw')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });

  test('useTPDPiWallet() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDPiWallet('https://google.com.tw')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });

  test('useTPDPlusPay() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDPlusPay(
        'tpdirectexamplepluspay://tech.cherri/myaccount/detail'
      )
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });

  test('useTPDAtome() test', async () => {
    const { result }: any = renderHook(() =>
      hooks.useTPDAtome('https://google.com.tw')
    );
    await waitFor(() =>
      expect(result.current).toEqual(expect.arrayContaining([true]))
    );
  });
});
