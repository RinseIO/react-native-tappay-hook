import { useState, useEffect } from 'react';

import { easyWalletInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

export function useTPDEasyWallet(easyWalletUniversalLinks: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay } = await easyWalletInit(
          easyWalletUniversalLinks
        );

        setIsReady(_isReadyToPay);
      } catch (error: any) {
        console.log('useTPDEasyWallet error', { ...error });
        console.log(error);
      }
    })();
  }, [easyWalletUniversalLinks]);

  return [isReady];
}

export default useTPDEasyWallet;