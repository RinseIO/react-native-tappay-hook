import { useState, useEffect } from 'react';

import Tappay from './TappayManager';

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
        if (Tappay.initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (Tappay.initPromise.then) {
          await Tappay.initPromise;
        }
        const _validResult = await Tappay.setDirectPayTPDCard(
          cardNumber,
          dueMonth,
          dueYear,
          ccv
        );
        const { isCardNumberValid, isExpiryDateValid, isCCVValid, cardType } =
          _validResult;

        setValidResult({
          isCardNumberValid,
          isExpiryDateValid,
          isCCVValid,
          cardType,
          isValid: isCardNumberValid && isExpiryDateValid && isCCVValid
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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const _deviceId = await Tappay.getDeviceId();
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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.googlePayInit(merchantName);

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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.applePayInit(
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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.linePayInit(linePayCallbackUri);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDApplePay error', { ...error });
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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.samsungPayInit(
            merchantName,
            merchantId,
            currencyCode,
            serviceId
          );

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDApplePay error', { ...error });
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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.jkoPayInit(jkoPayUniversalLinks);

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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.easyWalletInit(easyWalletUniversalLinks);

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
        if (Tappay.initPromise?.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg = '' } =
          await Tappay.piWalletInit(piWalletUniversalLinks);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDPiWallet error', { ...error });
      }
    })();
  }, [piWalletUniversalLinks]);

  return [isReady, msg];
}
