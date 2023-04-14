import { useState, useEffect } from 'react';

import { applePayInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useTPDApplePay;
