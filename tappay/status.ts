let prod: boolean = false;
let initPromise: any = null;
let deviceId: string = '';
let googlePlayIsReady: boolean = false;
let applePlayIsReady: boolean = false;
let linePlayIsReady: boolean = false;
let samsungPayIsReady: boolean = false;
let jkoPayIsReady: boolean = false;
let easyWalletIsReady: boolean = false;
let piWalletIsReady: boolean = false;
let plusPayIsReady: boolean = false;
let atomePayIsReady: boolean = false;

export function getProd() {
  return prod;
}
export function setProd(newProd: boolean) {
  prod = newProd;
}

export function getInitPromise() {
  return initPromise;
}
export function setInitPromise(newInitPromise: any) {
  initPromise = newInitPromise;
}

export function getDeviceId() {
  return deviceId;
}
export function setDeviceId(newDeviceId: string) {
  deviceId = newDeviceId;
}

export function getGooglePlayIsReady() {
  return googlePlayIsReady;
}
export function setGooglePlayIsReady(newGooglePlayIsReady: boolean) {
  googlePlayIsReady = newGooglePlayIsReady;
}

export function getApplePlayIsReady() {
  return applePlayIsReady;
}
export function setApplePlayIsReady(newApplePlayIsReady: boolean) {
  applePlayIsReady = newApplePlayIsReady;
}

export function getLinePlayIsReady() {
  return linePlayIsReady;
}
export function setLinePlayIsReady(newLinePlayIsReady: boolean) {
  linePlayIsReady = newLinePlayIsReady;
}

export function getSamsungPayIsReady() {
  return samsungPayIsReady;
}
export function setSamsungPayIsReady(newSamsungPayIsReady: boolean) {
  samsungPayIsReady = newSamsungPayIsReady;
}

export function getJkoPayIsReady() {
  return jkoPayIsReady;
}
export function setJkoPayIsReady(newJkoPayIsReady: boolean) {
  jkoPayIsReady = newJkoPayIsReady;
}

export function getEasyWalletIsReady() {
  return easyWalletIsReady;
}
export function setEasyWalletIsReady(newEasyWalletIsReady: boolean) {
  easyWalletIsReady = newEasyWalletIsReady;
}

export function getPiWalletIsReady() {
  return piWalletIsReady;
}
export function setPiWalletIsReady(newPiWalletIsReady: boolean) {
  piWalletIsReady = newPiWalletIsReady;
}

export function getPlusPayIsReady() {
  return plusPayIsReady;
}
export function setPlusPayIsReady(newPlusPayIsReady: boolean) {
  plusPayIsReady = newPlusPayIsReady;
}

export function getAtomePayIsReady() {
  return atomePayIsReady;
}
export function setAtomePayIsReady(newAtomePayIsReady: boolean) {
  atomePayIsReady = newAtomePayIsReady;
}
