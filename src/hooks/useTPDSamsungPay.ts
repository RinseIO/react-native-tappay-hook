import { useState, useEffect } from 'react';

import { samsungPayInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useTPDSamsungPay;