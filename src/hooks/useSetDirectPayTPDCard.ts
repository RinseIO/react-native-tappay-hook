import { useState, useEffect } from 'react';

import { setDirectPayTPDCard } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useSetDirectPayTPDCard;
