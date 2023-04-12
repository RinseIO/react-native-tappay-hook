import { renderHook, waitFor } from '@testing-library/react';

import * as hooks from '../hooks';
import { tappayInitialization } from '../fp';

jest.mock('react-native');

describe('hooks test(android)', () => {
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
    tappayInitialization(
      128088,
      'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
      false
    );
  });

  test('useSetDirectPayTPDCard() test', async () => {
    require('react-native')._setCardType('JCB');
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
});

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
    tappayInitialization(
      128088,
      'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
      false
    );
  });

  test('useSetDirectPayTPDCard() test', async () => {
    require('react-native')._setCardType('JCB');
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
});
