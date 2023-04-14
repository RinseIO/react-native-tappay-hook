import { useState, useEffect } from 'react';

import { getDeviceId } from '../fp';
import { getInitPromise } from '../cacheStatus';

export function useTPDGetDeviceId() {
  const [deviceId, setDeviceId] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const initPromise = getInitPromise();
        if (typeof initPromise?.then !== 'function') {
          throw new Error('Tappay has not been initialized!');
        }
        await initPromise;
        const _deviceId = await getDeviceId();
        setDeviceId(_deviceId);
      } catch (error: any) {
        console.log('useTPDGetDeviceId error', { ...error });
        console.log(error);
      }
    })();
  }, []);

  return deviceId;
}

export default useTPDGetDeviceId;
