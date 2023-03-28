import { useState, useEffect } from 'react';

import Tappay from '@utils/tappay';

export function useSetDirectPayTPDCard(
  cardNumber: string,
  dueMonth: string,
  dueYear: string,
  ccv: string
) {
  const [cardType, setCardType] = useState('');
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
  const [isCCVValid, setIsCCVValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (Tappay.initPromise === null) {
          throw new Error('Tappay has not been initialized!');
        }
        if (Tappay.initPromise.then) {
          await Tappay.initPromise;
        }
        const {
          isCardNumberValid: _isCardNumberValid,
          isExpiryDateValid: _isExpiryDateValid,
          isCCVValid: _isCCVValid,
          cardType: _cardType
        } = await Tappay.setDirectPayTPDCard(
          cardNumber,
          dueMonth,
          dueYear,
          ccv
        );

        setIsCardNumberValid(_isCardNumberValid);
        setIsExpiryDateValid(_isExpiryDateValid);
        setIsCCVValid(_isCCVValid);
        setCardType(_cardType);
        setIsValid(_isCardNumberValid && _isExpiryDateValid && _isCCVValid);
      } catch (error: any) {
        console.log('useSetDirectPayTPDCard error', { ...error });
      }
    })();
  }, [cardNumber, dueMonth, dueYear, ccv]);

  return {
    isCardNumberValid,
    isExpiryDateValid,
    isCCVValid,
    cardType,
    isValid
  };
}

export function useGooglePay(merchantName: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (Tappay.initPromise.then) {
          await Tappay.initPromise;
        }
        const { isReadyToPay: _isReadyToPay, msg: _msg } =
          await Tappay.googlePayInit(merchantName);

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useGooglePay error', { ...error });
      }
    })();
  }, []);

  return [isReady, msg];
}
