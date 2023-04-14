import { useState, useEffect } from 'react';

import { piWalletInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

export function useTPDPiWallet(piWalletUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await piWalletInit(
          piWalletUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDPiWallet error', { ...error });
        console.log(error);
      }
    })();
  }, [piWalletUniversalLinks]);

  return [isReady];
}

export default useTPDPiWallet;