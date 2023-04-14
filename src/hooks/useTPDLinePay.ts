import { useState, useEffect } from 'react';

import { linePayInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useTPDLinePay;