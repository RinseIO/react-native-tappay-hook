import { useState, useEffect } from 'react';

import { atomeInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

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

export default useTPDAtome;