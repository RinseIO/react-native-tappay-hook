import { useState, useEffect } from 'react';

import { jkoPayInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useTPDJkoPay;