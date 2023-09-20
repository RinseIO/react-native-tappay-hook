# react-native-tappay-hook
#

tappay for react hook

## Installation

```sh
npm install react-native-tappay-hook
```

#### iOS

CocoaPods on iOS needs this extra step:

```
$ cd ios
$ pod install
```

Then add the "PassKit.framework" and "SafariServices.framework" frameworks.

#### Android

Add these lines in your app/build.gradle:

```diff
dependencies {
  ...
+   implementation files("$rootDir/../node_modules/react-native-tappay-hook/android/libs/SamsungPaySDK_2.17.00_release.jar")
+   implementation files("$rootDir/../node_modules/react-native-tappay-hook/android/libs/tpdirect.aar")
  ...
}
```

## Usage

### Functional Programming(FP)

```ts 
import { tappayInit } from 'react-native-tappay-hook';
// or 
import { tappayInit } from 'react-native-tappay-hook/src/fp';
```

### Object-oriented programming(OOP)

```ts 
import { Tappay } from 'react-native-tappay-hook';
// or 
import { Tappay } from 'react-native-tappay-hook/src/oop';
```

### React Hook

```ts 
import { useSetDirectPayTPDCard } from 'react-native-tappay-hook';
// or 
import { useSetDirectPayTPDCard } from 'react-native-tappay-hook/src/hooks';
```

### React Components

```tsx 
import { DirectPayCardIcon } from 'react-native-tappay-hook';
// or 
import { DirectPayCardIcon } from 'react-native-tappay-hook/src/components';
```

## TapPay SDK

### tappayInit

```ts
// App.tsx

const tappayAppId: number = -1; // your app id
const tappayAppKey: string = 'your app key';
const isProd: boolean = false; // Production or Sandbox
const errorHandler: Function | null | undefined = (error) => console.log(error);

import { tappayInit } from 'react-native-tappay-hook';

const deviceId = await tappayInit(tappayAppId, tappayAppKey, isProd, errorHandler);

// or

import { Tappay } from 'react-native-tappay-hook';

const deviceId:string = await Tappay.init(tappayAppId, tappayAppKey, isProd, errorHandler);

/* ... */

function App(): JSX.Element {

  /* ... */

};

```

### getDeviceId

```ts 
import { getDeviceId } from 'react-native-tappay-hook';

const deviceId:string = await getDeviceId();

// or

import { Tappay } from 'react-native-tappay-hook';

const deviceId:string = await Tappay.getDeviceId();

```

## Direct Pay
### setDirectPayTPDCard

```ts 
const cardNumber = '3549134477691421'; // credit card number
const dueMonth = '07'; // credit card dueMonth
const dueYear = '25'; // credit card dueYear
const ccv = '465'; // credit card ccv

interface validResult {
  systemOS: string;
  tappaySDKVersion: string;
  cardNumber: string;
  dueMonth: string;
  dueYear: string;
  CCV: string;
  isCardNumberValid: boolean;
  isExpiryDateValid: boolean;
  isCCVValid: boolean;
  cardType: string;
  isValid: boolean;
}
import { setDirectPayTPDCard } from 'react-native-tappay-hook';


const validResult:validResult = await setDirectPayTPDCard(
  cardNumber,
  dueMonth,
  dueYear,
  ccv
);

// or

import { Tappay } from 'react-native-tappay-hook';

const validResult:validResult = await Tappay.setDirectPayTPDCard(
  cardNumber,
  dueMonth,
  dueYear,
  ccv
);

```

### getDirectPayPrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime:string;
  cardInfo: {
    bincode: string;
    lastFour: string;
    issuer: string;
    level: string;
    country: string;
    countryCode: string;
    cardType: number;
    funding: number;
    issuerZhTw: string;
    bankId: string;
  };
  cardIdentifier:string;
  merchantReferenceInfo: {
    affiliateCodes: Array<string>;
  };
}

import { getDirectPayPrime } from 'react-native-tappay-hook';

const result:result = await getDirectPayPrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result = await Tappay.getDirectPayPrime();

```

### useSetDirectPayTPDCard

```tsx
interface result {
  isCardNumberValid: boolean;
  isExpiryDateValid: boolean;
  isCCVValid: boolean;
  cardType: string;
  isValid: boolean;
}

import { useSetDirectPayTPDCard } from 'react-native-tappay-hook';

function AnyComponent(){
  const result:result = useSetDirectPayTPDCard('3549134477691421', '07', '25', '465');

  return <Text>{JSON.stringify(result)}</Text>;
}

```

### useTPDGetDeviceId

```tsx

import { useTPDGetDeviceId } from 'react-native-tappay-hook';

function AnyComponent(){
  const deviceId:string = useTPDGetDeviceId();

  return <Text>deviceId：{deviceId}</Text>;
}

```

### DirectPayCardIcon

```tsx

import { DirectPayCardIcon } from 'react-native-tappay-hook';

function AnyComponent(){

  return <DirectPayCardIcon cardNumber='3549134477691421' />; // JCB icon
}

```

## Google Pay
### googlePayInit

```ts 
const merchantName = 'your merchant name'; // your merchantName

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  msg: string;
}

import { googlePayInit } from 'react-native-tappay-hook';

const result:result =  await googlePayInit(merchantName);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.googlePayInit(merchantName);

```

### getGooglePayPrime

```ts 
const merchantName = 'your merchant name'; // your merchantName

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  cardDescription: string;
  prime:string;
  cardInfo: {
    bincode: string;
    lastFour: string;
    issuer: string;
    level: string;
    country: string;
    countryCode: string;
    cardType: number;
    funding: number;
    issuerZhTw: string;
    bankId: string;
  };
  merchantReferenceInfo: {
    affiliateCodes: Array<string>;
  };
}

import { getGooglePayPrime } from 'react-native-tappay-hook';

const result:result =  await getGooglePayPrime(merchantName);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getGooglePayPrime(merchantName);

```

### useTPDGooglePay

```tsx

import { useTPDGooglePay } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady, msg] = useTPDGooglePay('your merchant name');

  return <View>
    <Text>isReady:{isReady}</Text>
    <Text>msg:{msg}</Text>
  </View>;
}

```

### GPayBtn

```tsx

interface GPayBtnProps {
  merchantName: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { GPayBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerGooglePay(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <GPayBtn
   merchantName='your merchant name'
   onPress={handlerGooglePay}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#fff' }}
   disabledStyle={{ backgroundColor: '#b3b3b3' }}
  />;
}

```

## Apple Pay
### isApplePayAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}

import { isApplePayAvailable } from 'react-native-tappay-hook';

const result:result = await isApplePayAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isApplePayAvailable();

```

### applePayInit

```ts 
const merchantName: string = 'your merchant name';
const merchantId: string = 'your merchant id';
const countryCode: string = 'TW';
const currencyCode: string = 'TWD';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}

import { applePayInit } from 'react-native-tappay-hook';

const result:result = await applePayInit(merchantName, merchantId, countryCode, currencyCode);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.applePayInit(merchantName, merchantId, countryCode, currencyCode);

```

### getApplePayPrime

```ts 
const amount: string = '1';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime:string;
  expiryMillis: string;
  merchantReferenceInfo: {
    affiliateCodes: Array<string>;
  };
  cart: any;
  consumer: any;
  paymentMethod: any;
}

import { getApplePayPrime } from 'react-native-tappay-hook';

const result:result = await getApplePayPrime(amount);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getApplePayPrime(amount);

```

### useTPDApplePay

```tsx

import { useTPDApplePay } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDApplePay('your merchant name', 'your merchant id', 'TW', 'TWD');

  return <Text>isReady:{isReady}</Text>;
}

```

### ApplePayBtn

```tsx

interface ApplePayBtnProps {
  merchantName: string;
  merchantId: string;
  countryCode: string;
  currencyCode: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { ApplePayBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerApplePay(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <ApplePayBtn
   merchantName='your merchant name'
   merchantId="your merchant id"
   countryCode="TW"
   currencyCode="TWD"
   onPress={handlerApplePay}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#fff' }}
   disabledStyle={{ backgroundColor: '#b3b3b3' }}
  />;
}

```

## Line Pay
### isLinePayAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}

import { isLinePayAvailable } from 'react-native-tappay-hook';

const result:result = await isLinePayAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isLinePayAvailable();

```

### linePayHandleURL

```ts 
const openUri: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  openUri:string;
  success: boolean;
}

import { linePayHandleURL } from 'react-native-tappay-hook';

const result:result = await linePayHandleURL(openUri);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.linePayHandleURL(openUri);

```

### linePayInit

```ts 
const linePayCallbackUri: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  linePayCallbackUri: string;
}

import { linePayInit } from 'react-native-tappay-hook';

const result:result = await linePayInit(linePayCallbackUri);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.linePayInit(linePayCallbackUri);

```

### getLinePayPrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
}

import { getLinePayPrime } from 'react-native-tappay-hook';

const result:result = await getLinePayPrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getLinePayPrime();

```

### linePayRedirectWithUrl

```ts 
import { defaultAppActive } from 'react-native-tappay-hook';
const paymentUrl: string = 'url';
const handleAppActive: Function | undefined | null = defaultAppActive;

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
  paymentUrl: string;
  status: string;
  orderNumber: any;
  recTradeId: any;
  bankTransactionId: any;
}

import { linePayRedirectWithUrl } from 'react-native-tappay-hook';

const result:result = await linePayRedirectWithUrl(paymentUrl, handleAppActive);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.linePayRedirectWithUrl(paymentUrl, handleAppActive);

```

### useTPDLinePay

```tsx

import { useTPDLinePay } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDLinePay('linepayexample://tech.cherri');

  return <Text>isReady:{isReady}</Text>;
}

```

### LinePayBtn

```tsx

interface LinePayBtnProps {
  linePayCallbackUri: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { LinePayBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerLinePay(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <LinePayBtn
   linePayCallbackUri='linepayexample://tech.cherri'
   onPress={handlerLinePay}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#00be3b' }}
   disabledStyle={{ backgroundColor: '#c3c3c3' }}
  />;
}

```

## Samsung Pay
### samsungPayInit

```ts 
const merchantName: string = 'TapPay Samsung Pay Demo';
const merchantId: string = 'tech.cherri.samsungpayexample';
const currencyCode: string = 'TWD';
const serviceId: string = 'your samsung pay service id';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  msg: string;
}

import { samsungPayInit } from 'react-native-tappay-hook';

const result:result = await samsungPayInit(merchantName, merchantId, currencyCode, serviceId);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.samsungPayInit(merchantName, merchantId, currencyCode, serviceId);

```
### getSamsungPayPrime

```ts 
const itemTotalAmount: string = '1';
const shippingPrice: string = '0';
const tax: string = '0';
const totalAmount: string = '1';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime:string;
  cardInfo: {
    bincode: string;
    lastFour: string;
    issuer: string;
    level: string;
    country: string;
    countryCode: string;
    cardType: number;
    funding: number;
    issuerZhTw: string;
    bankId: string;
  };
  merchantReferenceInfo: {
    affiliateCodes: Array<string>;
  };
}

import { getSamsungPayPrime } from 'react-native-tappay-hook';

const result:result = await getSamsungPayPrime(itemTotalAmount, shippingPrice, tax, totalAmount);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getSamsungPayPrime(itemTotalAmount, shippingPrice, tax, totalAmount);

```

### useTPDSamsungPay

```tsx

import { useTPDSamsungPay } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDSamsungPay(
    'TapPay Samsung Pay Demo',
    'tech.cherri.samsungpayexample',
    'TWD',
    'your samsung pay service id'
  );

  return <Text>isReady:{isReady}</Text>;
}

```

### SPayBtn

```tsx

interface SPayBtnProps {
  merchantName: string;
  merchantId: string;
  currencyCode: string;
  serviceId: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { SPayBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerSamsungPay(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <SPayBtn
   merchantName="TapPay Samsung Pay Demo"
   erchantId="tech.cherri.samsungpayexample"
   currencyCode="TWD"
   serviceId="your samsung pay service id"
   onPress={handlerSamsungPay}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#fff' }}
   disabledStyle={{ backgroundColor: '#c3c3c3' }}
  />;
}

```

## JKOPay
### isJkoPayAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}
import { isJkoPayAvailable } from 'react-native-tappay-hook';

const result:result = await isJkoPayAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isJkoPayAvailable();

```
### jkoPayInit

```ts 
const jkoPayUniversalLinks:string = 'jkoexample://jko.uri:8888/test';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  jkoPayUniversalLinks: string;
}
import { jkoPayInit } from 'react-native-tappay-hook';

const result:result = await jkoPayInit(jkoPayUniversalLinks);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.jkoPayInit(jkoPayUniversalLinks);

```
### getJkoPayPrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
}
import { getJkoPayPrime } from 'react-native-tappay-hook';

const result:result = await getJkoPayPrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getJkoPayPrime();

```

### jkoPayRedirectWithUrl

```ts 
import { defaultAppActive } from 'react-native-tappay-hook';
const paymentUrl: string = 'url';
const handleAppActive: Function | undefined | null = defaultAppActive;


interface result {
  systemOS: string;
  tappaySDKVersion: string;
  paymentUrl: string;
  status: number;
  recTradeId: string;
  bankTransactionId: string;
  orderNumber: string;
}

import { jkoPayRedirectWithUrl } from 'react-native-tappay-hook';

const result:result = await jkoPayRedirectWithUrl(paymentUrl, defaultAppActive);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.jkoPayRedirectWithUrl(paymentUrl, defaultAppActive);

```

### jkoPayHandleUniversalLink

```ts 
const url: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  openUri:string;
  success: boolean;
}

import { jkoPayHandleUniversalLink } from 'react-native-tappay-hook';

const result:result = await jkoPayHandleUniversalLink(url);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.jkoPayHandleUniversalLink(url);

```

### useTPDJkoPay

```tsx

import { useTPDJkoPay } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDSamsungPay('jkoexample://jko.uri:8888/test');

  return <Text>isReady:{isReady}</Text>;
}

```

### JkoPayBtn

```tsx

interface JkoPayBtnProps {
  jkoPayUniversalLinks: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { JkoPayBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerJkoPay(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <JkoPayBtn
   jkoPayUniversalLinks="jkoexample://jko.uri:8888/test"
   onPress={handlerJkoPay}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#fff' }}
   disabledStyle={{ backgroundColor: '#c3c3c3' }}
  />;
}

```

## Easy Wallet
### isEasyWalletAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}

import { isEasyWalletAvailable } from 'react-native-tappay-hook';

const result:result = await isEasyWalletAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isEasyWalletAvailable();

```

### easyWalletInit

```ts 
const easyWalletUniversalLinks:string = 'https://google.com.tw';
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  easyWalletUniversalLinks: string;
}

import { easyWalletInit } from 'react-native-tappay-hook';

const result:result = await easyWalletInit(easyWalletUniversalLinks);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.easyWalletInit(easyWalletUniversalLinks);

```

### getEasyWalletPrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
}

import { getEasyWalletPrime } from 'react-native-tappay-hook';

const result:result = await getEasyWalletPrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getEasyWalletPrime();

```

### easyWalletRedirectWithUrl

```ts 
import { defaultAppActive } from 'react-native-tappay-hook';
const paymentUrl: string = 'url';
const handleAppActive: Function | undefined | null = defaultAppActive;

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  paymentUrl: string;
  status: number;
  recTradeId: string;
  bankTransactionId: string;
  orderNumber: string;
}

import { easyWalletRedirectWithUrl } from 'react-native-tappay-hook';

const result:result = await easyWalletRedirectWithUrl(paymentUrl, defaultAppActive);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.easyWalletRedirectWithUrl(paymentUrl, defaultAppActive);

```

### easyWalletHandleUniversalLink

```ts 
const url: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  openUri:string;
  success: boolean;
}

import { easyWalletHandleUniversalLink } from 'react-native-tappay-hook';

const result:result = await easyWalletHandleUniversalLink(url);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.easyWalletHandleUniversalLink(url);

```

### useTPDEasyWallet

```tsx

import { useTPDEasyWallet } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDEasyWallet('https://google.com.tw');

  return <Text>isReady:{isReady}</Text>;
}

```

### EasyWalletBtn

```tsx

interface EasyWalletBtnProps {
  easyWalletUniversalLinks: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { EasyWalletBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerEasyWallet(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <EasyWalletBtn
   easyWalletUniversalLinks="https://google.com.tw"
   onPress={handlerEasyWallet}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#fff' }}
   disabledStyle={{ backgroundColor: '#c3c3c3' }}
  />;
}

```

## Pi Wallet
### isPiWalletAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}
import { isPiWalletAvailable } from 'react-native-tappay-hook';

const result:result = await isPiWalletAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isPiWalletAvailable();
```

### piWalletInit

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  piWalletUniversalLinks: string;
}

import { piWalletInit } from 'react-native-tappay-hook';

const result:result = await piWalletInit();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.piWalletInit();
```

### getPiWalletPrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
}

import { getPiWalletPrime } from 'react-native-tappay-hook';

const result:result = await getPiWalletPrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getPiWalletPrime();
```

### piWalletRedirectWithUrl

```ts 
import { defaultAppActive } from 'react-native-tappay-hook';
const paymentUrl: string = 'url';
const handleAppActive: Function | undefined | null = defaultAppActive;

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  paymentUrl: string;
}

import { piWalletRedirectWithUrl } from 'react-native-tappay-hook';

const result:result = await piWalletRedirectWithUrl(paymentUrl, defaultAppActive);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.piWalletRedirectWithUrl(paymentUrl, defaultAppActive);
```

### piWalletHandleUniversalLink

```ts 
const url: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  openUri:string;
  success: boolean;
}

import { piWalletHandleUniversalLink } from 'react-native-tappay-hook';

const result:result = await piWalletHandleUniversalLink(url);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.piWalletHandleUniversalLink(url);

```

### useTPDPiWallet

```tsx

import { useTPDPiWallet } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDPiWallet('https://google.com.tw');

  return <Text>isReady:{isReady}</Text>;
}

```

### PiWalletBtn

```tsx

interface PiWalletBtnProps {
  piWalletUniversalLinks: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { PiWalletBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerPiWallet(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <PiWalletBtn
   piWalletUniversalLinks="https://google.com.tw"
   onPress={handlerPiWallet}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#1da7fc' }}
   disabledStyle={{ backgroundColor: '#000' }}
  />;
}

```

## +Pay(Plus Pay)
### isPlusPayAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}

import { isPlusPayAvailable } from 'react-native-tappay-hook';

const result:result = await isPlusPayAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isPlusPayAvailable();

```
### plusPayInit

```ts 
const plusPayUniversalLinks:string = 'tpdirectexamplepluspay://tech.cherri/myaccount/detail';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  plusPayUniversalLinks: string;
}

import { plusPayInit } from 'react-native-tappay-hook';

const result:result = await plusPayInit(plusPayUniversalLinks);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.plusPayInit(plusPayUniversalLinks);

```
### getPlusPayPrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
}

import { getPlusPayPrime } from 'react-native-tappay-hook';

const result:result = await getPlusPayPrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getPlusPayPrime();

```

### plusPayRedirectWithUrl

```ts 
import { defaultAppActive } from 'react-native-tappay-hook';
const paymentUrl: string = 'url';
const handleAppActive: Function | undefined | null = defaultAppActive;

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  paymentUrl: string;
}

import { plusPayRedirectWithUrl } from 'react-native-tappay-hook';

const result:result = await plusPayRedirectWithUrl(paymentUrl, defaultAppActive);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.plusPayRedirectWithUrl(paymentUrl, defaultAppActive);
```

### plusPayhandleUniversalLink

```ts 
const url: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  openUri:string;
  success: boolean;
}

import { plusPayhandleUniversalLink } from 'react-native-tappay-hook';

const result:result = await plusPayhandleUniversalLink(url);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.plusPayhandleUniversalLink(url);

```

### useTPDPlusPay

```tsx

import { useTPDPlusPay } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDPlusPay('tpdirectexamplepluspay://tech.cherri/myaccount/detail');

  return <Text>isReady:{isReady}</Text>;
}

```

### PlusPayBtn

```tsx

interface PlusPayBtnProps {
  plusPayUniversalLinks: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { PlusPayBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerPlusPay(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <PlusPayBtn
   piWalletUniversalLinks="https://google.com.tw"
   onPress={handlerPlusPay}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#fff' }}
   disabledStyle={{ backgroundColor: '#c3c3c3' }}
  />;
}

```

## Atome
### isAtomeAvailable

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
}

import { isAtomeAvailable } from 'react-native-tappay-hook';

const result:result = await isAtomeAvailable();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.isAtomeAvailable();

```
### atomeInit

```ts 
const atomeUniversalLinks:string = 'https://google.com.tw'

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  isReadyToPay: boolean;
  atomeUniversalLinks: string;
}

import { atomeInit } from 'react-native-tappay-hook';

const result:result = await atomeInit(atomeUniversalLinks);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.atomeInit(atomeUniversalLinks);

```
### getAtomePrime

```ts 
interface result {
  systemOS: string;
  tappaySDKVersion: string;
  prime: string;
}

import { getAtomePrime } from 'react-native-tappay-hook';

const result:result = await getAtomePrime();

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.getAtomePrime();

```
### atomeRedirectWithUrl

```ts 
import { defaultAppActive } from 'react-native-tappay-hook';
const paymentUrl: string = 'url';
const handleAppActive: Function | undefined | null = defaultAppActive;

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  paymentUrl: string;
  status: string;
  recTradeId: string;
  bankTransactionId: string;
  orderNumber: string;
}

import { atomeRedirectWithUrl } from 'react-native-tappay-hook';

const result:result = await atomeRedirectWithUrl(paymentUrl, defaultAppActive);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.atomeRedirectWithUrl(paymentUrl, defaultAppActive);

```

### atomehandleUniversalLink

```ts 
const url: string = 'url';

interface result {
  systemOS: string;
  tappaySDKVersion: string;
  openUri:string;
  success: boolean;
}

import { atomehandleUniversalLink } from 'react-native-tappay-hook';

const result:result = await atomehandleUniversalLink(url);

// or

import { Tappay } from 'react-native-tappay-hook';

const result:result =  await Tappay.atomehandleUniversalLink(url);

```

### useTPDAtome

```tsx

import { useTPDAtome } from 'react-native-tappay-hook';

function AnyComponent(){
  const [isReady] = useTPDAtome('https://google.com.tw');

  return <Text>isReady:{isReady}</Text>;
}

```

### AtomeBtn

```tsx

interface AtomeBtnProps {
  atomeUniversalLinks: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
    [key: string]: any;
  };
  [key: string]: any;
}

import { AtomeBtn } from 'react-native-tappay-hook';

function AnyComponent(){

  function handlerAtome(){
    /* ... */
  }
  function onDisabled(){
    /* ... */
  }

  return <AtomeBtn
   atomeUniversalLinks="https://google.com.tw"
   onPress={handlerAtome}
   disabledOnPress={onDisabled}
   style={{ backgroundColor: '#e7f85a' }}
   disabledStyle={{ backgroundColor: '#c3c3c3' }}
  />;
}

```

## TapPay
[Direct Pay(android)](https://docs.tappaysdk.com/tutorial/zh/android/front.html)

[Direct Pay(ios)](https://docs.tappaysdk.com/tutorial/zh/ios/front.html)

[Google Pay](https://docs.tappaysdk.com/google-pay/zh/front.html)

[Apple Pay](https://docs.tappaysdk.com/apple-pay/zh/front.html#create-token)

[Samsung Pay](https://docs.tappaysdk.com/samsung-pay/zh/front.html#create-token)

[LINE Pay(android)](https://docs.tappaysdk.com/line-pay/zh/android/front.html#android)

[LINE Pay(ios)](https://docs.tappaysdk.com/line-pay/zh/ios/front.html#create-token)

[JKOPAY(android)](https://docs.tappaysdk.com/jko-pay/zh/android/front.html#android)

[JKOPAY(ios)](https://docs.tappaysdk.com/jko-pay/zh/ios/front.html#ios)

[Easy Wallet(android)](https://docs.tappaysdk.com/easy-wallet/zh/android/front.html#create-token)

[Easy Wallet(ios)](https://docs.tappaysdk.com/easy-wallet/zh/ios/front.html#create-token)

[Pi Wallet(android)](https://docs.tappaysdk.com/pi-wallet/zh/android/front.html#android)

[Pi Wallet(ios)](https://docs.tappaysdk.com/pi-wallet/zh/ios/front.html#ios)

[+Pay(Plus Pay)(android)](https://docs.tappaysdk.com/plus-pay/en/android/front.html#android)

[+Pay(Plus Pay)(ios)](https://docs.tappaysdk.com/plus-pay/en/ios/front.html#ios)

[Atome(android)](https://docs.tappaysdk.com/atome/zh/android/front.html#android)

[Atome(ios)](https://docs.tappaysdk.com/atome/zh/ios/front.html#create-token)


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
