import { useState, useEffect } from 'react';

import { plusPayInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useTPDPlusPay;