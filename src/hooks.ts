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
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
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
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const _deviceId = await getDeviceId();
        setDeviceId(_deviceId);
      } catch (error: any) {
        console.log('useTPDGetDeviceId error', { ...error });
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
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await googlePayInit(merchantName);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDGooglePay error', { ...error });
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
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await applePayInit(
            merchantName,
            merchantId,
            countryCode,
            currencyCode
          );

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDApplePay error', { ...error });
      }
    })();
  }, []);

  return [isReady, msg];
}

export function useTPDLinePay(linePayCallbackUri: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await linePayInit(linePayCallbackUri);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDLinePay error', { ...error });
      }
    })();
  }, [linePayCallbackUri]);

  return [isReady, msg];
}

export function useTPDSamsungPay(
  merchantName: string,
  merchantId: string,
  currencyCode: string,
  serviceId: string
) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await samsungPayInit(
            merchantName,
            merchantId,
            currencyCode,
            serviceId
          );

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log(error);
        console.log('useTPDSamsungPay error', { ...error });
      }
    })();
  }, [merchantName, merchantId, currencyCode, serviceId]);

  return [isReady, msg];
}

export function useTPDJkoPay(jkoPayUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await jkoPayInit(jkoPayUniversalLinks);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDJkoPay error', { ...error });
      }
    })();
  }, [jkoPayUniversalLinks]);

  return [isReady, msg];
}

export function useTPDEasyWallet(easyWalletUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await easyWalletInit(easyWalletUniversalLinks);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDEasyWallet error', { ...error });
      }
    })();
  }, [easyWalletUniversalLinks]);

  return [isReady, msg];
}

export function useTPDPiWallet(piWalletUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await piWalletInit(piWalletUniversalLinks);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDPiWallet error', { ...error });
      }
    })();
  }, [piWalletUniversalLinks]);

  return [isReady, msg];
}

export function useTPDPlusPay(plusPayUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await plusPayInit(plusPayUniversalLinks);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDPlusPay error', { ...error });
      }
    })();
  }, [plusPayUniversalLinks]);

  return [isReady, msg];
}

export function useTPDAtome(atomeUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (initPromise.then) {
          await initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await atomeInit(atomeUniversalLinks);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDAtome error', { ...error });
      }
    })();
  }, [atomeUniversalLinks]);

  return [isReady, msg];
}
