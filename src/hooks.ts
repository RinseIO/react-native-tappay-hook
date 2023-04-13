import { useState, useEffect } from 'react';

import {
  setDirectPayTPDCard,
  getDeviceId,
  googlePayInit,
  applePayInit,
  linePayInit,
  samsungPayInit,
  jkoPayInit,
  easyWalletInit,
  piWalletInit,
  plusPayInit,
  atomeInit
} from './fp';
import { getInitPromise } from './cacheStatus';

interface directResult {
  isCardNumberValid: boolean;
  isExpiryDateValid: boolean;
  isCCVValid: boolean;
  cardType: string;
  isValid: boolean;
}

const directResult = {
  isCardNumberValid: false,
  isExpiryDateValid: false,
  isCCVValid: false,
  cardType: '',
  isValid: false
};

export function useSetDirectPayTPDCard(
  cardNumber: string = '',
  dueMonth: string = '',
  dueYear: string = '',
  ccv: string = ''
) {
  const [validResult, setValidResult] = useState<directResult>(directResult);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const _validResult = await setDirectPayTPDCard(
          cardNumber,
          dueMonth,
          dueYear,
          ccv
        );
        const {
          isCardNumberValid,
          isExpiryDateValid,
          isCCVValid,
          cardType,
          isValid
        } = _validResult;

        setValidResult({
          isCardNumberValid,
          isExpiryDateValid,
          isCCVValid,
          cardType,
          isValid
        });
      } catch (error: any) {
        console.log('useSetDirectPayTPDCard error', { ...error });
        console.log(error);
      }
    })();
  }, [cardNumber, dueMonth, dueYear, ccv]);

  return validResult;
}

export function useTPDGetDeviceId() {
  const [deviceId, setDeviceId] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const _deviceId = await getDeviceId();
        setDeviceId(_deviceId);
      } catch (error: any) {
        console.log('useTPDGetDeviceId error', { ...error });
        console.log(error);
      }
    })();
  }, []);

  return deviceId;
}

export function useTPDGooglePay(merchantName: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay, msg: _msg } = await googlePayInit(
          merchantName
        );

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDGooglePay error', { ...error });
        console.log(error);
      }
    })();
  }, []);

  return [isReady, msg];
}

export function useTPDApplePay(
  merchantName: string,
  merchantId: string,
  countryCode: string,
  currencyCode: string
) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await applePayInit(
          merchantName,
          merchantId,
          countryCode,
          currencyCode
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDApplePay error', { ...error });
        console.log(error);
      }
    })();
  }, []);

  return [isReady];
}

export function useTPDLinePay(linePayCallbackUri: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await linePayInit(
          linePayCallbackUri
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDLinePay error', { ...error });
        console.log(error);
      }
    })();
  }, [linePayCallbackUri]);

  return [isReady];
}

export function useTPDSamsungPay(
  merchantName: string,
  merchantId: string,
  currencyCode: string,
  serviceId: string
) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await samsungPayInit(
          merchantName,
          merchantId,
          currencyCode,
          serviceId
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDSamsungPay error', { ...error });
        console.log(error);
      }
    })();
  }, [merchantName, merchantId, currencyCode, serviceId]);

  return [isReady];
}

export function useTPDJkoPay(jkoPayUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await jkoPayInit(
          jkoPayUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDJkoPay error', { ...error });
        console.log(error);
      }
    })();
  }, [jkoPayUniversalLinks]);

  return [isReady];
}

export function useTPDEasyWallet(easyWalletUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await easyWalletInit(
          easyWalletUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDEasyWallet error', { ...error });
        console.log(error);
      }
    })();
  }, [easyWalletUniversalLinks]);

  return [isReady];
}

export function useTPDPiWallet(piWalletUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await piWalletInit(
          piWalletUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDPiWallet error', { ...error });
        console.log(error);
      }
    })();
  }, [piWalletUniversalLinks]);

  return [isReady];
}

export function useTPDPlusPay(plusPayUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await plusPayInit(
          plusPayUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDPlusPay error', { ...error });
        console.log(error);
      }
    })();
  }, [plusPayUniversalLinks]);

  return [isReady];
}

export function useTPDAtome(atomeUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await atomeInit(
          atomeUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDAtome error', { ...error });
        console.log(error);
      }
    })();
  }, [atomeUniversalLinks]);

  return [isReady];
}
