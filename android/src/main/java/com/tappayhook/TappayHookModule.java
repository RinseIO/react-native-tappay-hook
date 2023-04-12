package com.tappayhook;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeMap;

import tech.cherri.tpdirect.api.TPDCardValidationResult;

@ReactModule(name = TappayHookModule.NAME)
public class TappayHookModule extends ReactContextBaseJavaModule {
  public static final String NAME = "TappayHook";
  TappayManager TappayManager;

  public TappayHookModule(ReactApplicationContext reactContext) {
    super(reactContext);
    TappayManager = new TappayManager(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的initInstance
  @ReactMethod
  public void TappayInitInstance(int APP_ID, String APP_KEY, Boolean prod, Promise promise) {
    try {
      TappayManager.initInstance(APP_ID, APP_KEY, prod);
      WritableNativeMap resultData = new WritableNativeMap();

      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("success", true);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayInitInstance", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDCard
  @ReactMethod
  public void TappaySetTPDCard(String cardNumber, String dueMonth, String dueYear, String CCV,
      Promise promise) {
    try {
      TPDCardValidationResult result = TappayManager.TPDCard(cardNumber, dueMonth, dueYear, CCV);
      WritableNativeMap resultData = new WritableNativeMap();

      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("cardNumber", cardNumber);
      resultData.putString("dueMonth", dueMonth);
      resultData.putString("dueYear", dueYear);
      resultData.putString("CCV", CCV);
      resultData.putBoolean("isCardNumberValid", result.isCardNumberValid());
      resultData.putBoolean("isExpiryDateValid", result.isExpiryDateValid());
      resultData.putBoolean("isCCVValid", result.isCCVValid());
      resultData.putString("cardType", String.valueOf(result.getCardType()));

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappaySetTPDCard", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的createToken
  @ReactMethod
  public void TappayGetDirectPayPrime(String geoLocation, Promise promise) {
    try {
      TappayManager.getDirectPayPrime(geoLocation, promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetDirectPayPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的getRbaDeviceId
  @ReactMethod
  public void TappayGetDeviceId(Promise promise) {
    try {
      promise.resolve(TappayManager.getDeviceId());
    } catch (Exception e) {
      promise.reject("android error TappayGetDeviceId", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，對TappaySDK的TPDGooglePay做初始化
  @ReactMethod
  public void TappayGooglePayInit(String merchantName, Promise promise) {
    try {
      TappayManager.googlePayInit(merchantName, promise);
    } catch (Exception e) {
      promise.reject("android error TappayGooglePayInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDGooglePay的requestPayment
  @ReactMethod
  public void TappayGetGooglePayPrime(String totalPrice, String currencyCode, Promise promise) {
    try {
      TappayManager.getGooglePayPrime(totalPrice, currencyCode, promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetGooglePayPrime", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayAapplePayInit方法
  @ReactMethod
  public void TappayAapplePayInit(String merchantName, String merchantId, String countryCode, String currencyCode,
      Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayAapplePayInit", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayIsApplePayAvailable方法
  @ReactMethod
  public void TappayIsApplePayAvailable(Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsApplePayAvailable", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayHandlerApplePay方法
  @ReactMethod
  public void TappayGetApplePayPrime(String amount, Promise promise) {
    promise.reject("android error TappayGetApplePayPrime", "android not support ApplePay");
  }

  // 宣告給ReactNative使用的function名稱，對應ios版的TappayLinePayHandleURL方法
  @ReactMethod
  public void TappayLinePayHandleURL(String openUri, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("openUri", openUri);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayLinePayHandleURL", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的isLinePayAvailable
  @ReactMethod
  public void TappayIsLinePayAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isLinePayAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsLinePayAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的linePayInit
  @ReactMethod
  public void TappayLinePayInit(String linePayCallbackUri, Promise promise) {
    try {
      boolean result = TappayManager.linePayInit(linePayCallbackUri);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("linePayCallbackUri", linePayCallbackUri);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayLinePayInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的getPrime
  @ReactMethod
  public void TappayGetLinePayPrime(Promise promise) {
    try {
      TappayManager.getLinePayPrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetLinePayPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDLinePay的redirectWithUrl，並自動完成跳轉資料的監聽
  @ReactMethod
  public void TappayLinePayRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.linePayRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayLinePayRedirectWithUrl", e);
    }
  }

  @ReactMethod
  public void TappaySamsungPayInit(String merchantName, String merchantId, String currencyCode,
      String serviceId, Promise promise) {
    try {
      TappayManager.samsungPayInit(merchantName, merchantId, currencyCode, serviceId, promise);
    } catch (Exception e) {
      promise.reject("android error TappaySamsungPayInit", e);
    }
  }

  @ReactMethod
  public void TappayGetSamsungPayPrime(String itemTotalAmount, String shippingPrice, String tax, String totalAmount,
      Promise promise) {
    try {
      TappayManager.getSamsungPayPrime(itemTotalAmount, shippingPrice, tax, totalAmount, promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetSamsungPayPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDJkoPay的isJkoPayAvailable
  @ReactMethod
  public void TappayIsJkoPayAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isJkoPayAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsJkoPayAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDJkoPay的初始化方法
  @ReactMethod
  public void TappayJkoPayInit(String jkoPayUniversalLinks, Promise promise) {
    try {
      boolean result = TappayManager.jkoPayInit(jkoPayUniversalLinks);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("jkoPayUniversalLinks", jkoPayUniversalLinks);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayJkoPayInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDJkoPay取得prime方法
  @ReactMethod
  public void TappayGetJkoPayPrime(Promise promise) {
    try {
      TappayManager.getJkoPayPrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetJkoPayPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDJkoPay的跳轉付款方法
  @ReactMethod
  public void TappayJkoPayRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.jkoPayRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayJkoPayRedirectWithUrl", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayJkoPayHandleUniversalLink方法
  @ReactMethod
  public void TappayJkoPayHandleUniversalLink(String url, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("url", url);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayJkoPayHandleUniversalLink", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDEasyWallet的isAvailable
  @ReactMethod
  public void TappayIsEasyWalletAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isEasyWalletAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsEasyWalletAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDEasyWallet的easyWalletInit
  @ReactMethod
  public void TappayEasyWalletInit(String easyWalletUniversalLinks, Promise promise) {
    try {
      boolean result = TappayManager.easyWalletInit(easyWalletUniversalLinks);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("easyWalletUniversalLinks", easyWalletUniversalLinks);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayEasyWalletInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDEasyWallet的getPrime
  @ReactMethod
  public void TappayGetEasyWalletPrime(Promise promise) {
    try {
      TappayManager.getEasyWalletPrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetEasyWalletPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDEasyWallet的redirectWithUrl，並自動完成跳轉資料的監聽
  @ReactMethod
  public void TappayEasyWalletRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.easyWalletRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayEasyWalletRedirectWithUrl", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayEasyWalletHandleUniversalLink方法
  @ReactMethod
  public void TappayEasyWalletHandleUniversalLink(String url, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("url", url);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayEasyWalletHandleUniversalLink", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPiWallet的isPiWalletAvailable
  @ReactMethod
  public void TappayIsPiWalletAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isPiWalletAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsPiWalletAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPiWallet的piWalletInit
  @ReactMethod
  public void TappayPiWalletInit(String piWalletUniversalLinks, Promise promise) {
    try {
      boolean result = TappayManager.piWalletInit(piWalletUniversalLinks);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("piWalletUniversalLinks", piWalletUniversalLinks);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayPiWalletInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPiWallet的getPrime
  @ReactMethod
  public void TappayGetPiWalletPrime(Promise promise) {
    try {
      TappayManager.getPiWalletPrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetPiWalletPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPiWallet的redirectWithUrl，並自動完成跳轉資料的監聽
  @ReactMethod
  public void TappayPiWalletRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.piWalletRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayPiWalletRedirectWithUrl", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayPiWalletHandleUniversalLink方法
  @ReactMethod
  public void TappayPiWalletHandleUniversalLink(String url, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("url", url);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayPiWalletHandleUniversalLink", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPlusPay的isPlusPayAvailable
  @ReactMethod
  public void TappayIsPlusPayAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isPlusPayAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsPlusPayAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPlusPay的plusPayInit
  @ReactMethod
  public void TappayPlusPayInit(String plusPayUniversalLinks, Promise promise) {
    try {
      boolean result = TappayManager.plusPayInit(plusPayUniversalLinks);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("plusPayUniversalLinks", plusPayUniversalLinks);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayPlusPayInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPlusPay的getPrime
  @ReactMethod
  public void TappayGetPlusPayPrime(Promise promise) {
    try {
      TappayManager.getPlusPayPrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetPlusPayPrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDPlusPay的redirectWithUrl，並自動完成跳轉資料的監聽
  @ReactMethod
  public void TappayPlusPayRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.plusPayRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayPlusPayRedirectWithUrl", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayPlusPayHandleUniversalLink方法
  @ReactMethod
  public void TappayPlusPayHandleUniversalLink(String url, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("url", url);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayPlusPayHandleUniversalLink", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDAtome的isAtomeAppAvailable
  @ReactMethod
  public void TappayIsAtomeAvailable(Promise promise) {
    try {
      boolean result = TappayManager.isAtomeAvailable();
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayIsAtomeAvailable", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDAtome的atomeInit
  @ReactMethod
  public void TappayAtomeInit(String atomeUniversalLinks, Promise promise) {
    try {
      boolean result = TappayManager.atomeInit(atomeUniversalLinks);
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putBoolean("isReadyToPay", result);
      resultData.putString("atomeUniversalLinks", atomeUniversalLinks);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayAtomeInit", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDAtome的getPrime
  @ReactMethod
  public void TappayGetAtomePrime(Promise promise) {
    try {
      TappayManager.getAtomePrime(promise);
    } catch (Exception e) {
      promise.reject("android error TappayGetAtomePrime", e);
    }
  }

  // 宣告給ReactNative使用的function名稱，TappaySDK的TPDAtome的redirectWithUrl，並自動完成跳轉資料的監聽
  @ReactMethod
  public void TappayAtomeRedirectWithUrl(String paymentUrl, Promise promise) {
    try {
      TappayManager.atomeRedirectWithUrl(paymentUrl, promise);
    } catch (Exception e) {
      promise.reject("android error TappayAtomeRedirectWithUrl", e);
    }
  }

  // 宣告給ReactNative使用，對應ios版的TappayAtomeHandleUniversalLink方法
  @ReactMethod
  public void TappayAtomeHandleUniversalLink(String url, Promise promise) {
    try {
      WritableNativeMap resultData = new WritableNativeMap();
      resultData.putString("systemOS", "android");
      resultData.putString("tappaySDKVersion", TappayManager.SDKVersion);
      resultData.putString("url", url);
      resultData.putBoolean("success", false);

      promise.resolve(resultData);
    } catch (Exception e) {
      promise.reject("android error TappayAtomeHandleUniversalLink", e);
    }
  }
}