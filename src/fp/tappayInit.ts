import { NativeModules } from 'react-native';

import {
  // getAppId,
  setAppId,
  // getAppKey,
  setAppKey,
  // getProd,
  setProd,
  getInitPromise,
  setInitPromise,
  setStatusDeviceId,
  setGooglePlayIsReady,
  setApplePlayIsReady,
  setLinePlayIsReady,
  setSamsungPayIsReady,
  setJkoPayIsReady,
  setEasyWalletIsReady,
  setPiWalletIsReady,
  setPlusPayIsReady,
  setAtomeIsReady
} from '../cacheStatus';

import getDeviceId from './getDeviceId';

export function tappayInit(
  appId: number,
  appKey: string,
  prod: boolean,
  errorHandler?: Function
) {
  // if (appId === getAppId() && appKey === getAppKey() && prod === getProd()) {
  //   return getInitPromise();
  // }
  setInitPromise(
    (async () => {
      setStatusDeviceId('');
      try {
        await NativeModules.TappayHook.TappayInitInstance(appId, appKey, prod);
        setAppId(appId);
        setAppKey(appKey);
        setProd(prod);
        setGooglePlayIsReady(false);
        setApplePlayIsReady(false);
        setLinePlayIsReady(false);
        setSamsungPayIsReady(false);
        setJkoPayIsReady(false);
        setEasyWalletIsReady(false);
        setPiWalletIsReady(false);
        setPlusPayIsReady(false);
        setAtomeIsReady(false);
        return await getDeviceId();
      } catch (error: any) {
        if (typeof errorHandler === 'function') {
          errorHandler(error);
        } else {
          console.error(error);
        }
        setInitPromise(null);
      }
      return '';
    })()
  );

  return getInitPromise();
}

export default tappayInit;
