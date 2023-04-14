import { useState, useEffect } from 'react';

import { googlePayInit } from '../fp';
import { getInitPromise } from '../cacheStatus';

export function useTPDGooglePay(merchantName: string) {
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const { isReadyToPay: _isReadyToPay, msg: _msg } = await googlePayInit(
          merchantName
        );

        setIsReady(_isReadyToPay);
        setMsg(_msg);
      } catch (error: any) {
        console.log('useTPDGooglePay error', { ...error });
        console.log(error);
      }
    })();
  }, []);

  return [isReady, msg];
}

export default useTPDGooglePay;