package com.reactnativetappayhook;

import java.util.List;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.BaseActivityEventListener;

import com.google.android.gms.common.api.Status;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.TransactionInfo;
import com.google.android.gms.wallet.WalletConstants;

import tech.cherri.tpdirect.api.TPDCard;

import tech.cherri.tpdirect.callback.dto.TPDCardInfoDto;
import tech.cherri.tpdirect.callback.TPDCardGetPrimeSuccessCallback;
import tech.cherri.tpdirect.callback.TPDGetPrimeFailureCallback;
import tech.cherri.tpdirect.callback.dto.TPDMerchantReferenceInfoDto;

import tech.cherri.tpdirect.api.TPDCardValidationResult;
import tech.cherri.tpdirect.api.TPDSetup;
import tech.cherri.tpdirect.api.TPDServerType;

import tech.cherri.tpdirect.api.TPDConsumer;
import tech.cherri.tpdirect.api.TPDGooglePay;
import tech.cherri.tpdirect.api.TPDMerchant;
import tech.cherri.tpdirect.callback.TPDGooglePayGetPrimeSuccessCallback;
import tech.cherri.tpdirect.callback.TPDGooglePayListener;

import tech.cherri.tpdirect.api.TPDLinePay;
import tech.cherri.tpdirect.api.TPDLinePayResult;
import tech.cherri.tpdirect.callback.TPDLinePayGetPrimeSuccessCallback;
import tech.cherri.tpdirect.callback.TPDLinePayResultListener;
import tech.cherri.tpdirect.exception.TPDLinePayException;

import tech.cherri.tpdirect.api.TPDSamsungPay;
import tech.cherri.tpdirect.callback.TPDSamsungPayGetPrimeSuccessCallback;
import tech.cherri.tpdirect.callback.TPDSamsungPayStatusListener;
import tech.cherri.tpdirect.callback.dto.TPDCardDto;

import tech.cherri.tpdirect.api.TPDJkoPay;
import tech.cherri.tpdirect.api.TPDJkoPayResult;
import tech.cherri.tpdirect.callback.TPDJkoPayResultListener;
import tech.cherri.tpdirect.exception.TPDJkoPayException;
import tech.cherri.tpdirect.callback.TPDJkoPayGetPrimeSuccessCallback;

import tech.cherri.tpdirect.api.TPDEasyWallet;
import tech.cherri.tpdirect.api.TPDEasyWalletResult;
import tech.cherri.tpdirect.callback.TPDEasyWalletResultListener;
import tech.cherri.tpdirect.exception.TPDEasyWalletException;
import tech.cherri.tpdirect.callback.TPDEasyWalletGetPrimeSuccessCallback;

import tech.cherri.tpdirect.api.TPDPiWallet;
import tech.cherri.tpdirect.callback.TPDPiWalletResultListener;
import tech.cherri.tpdirect.exception.TPDPiWalletException;
import tech.cherri.tpdirect.callback.TPDPiWalletGetPrimeSuccessCallback;
import tech.cherri.tpdirect.api.TPDPiWalletResult;

// https://portal.tappaysdk.com/document/androidnoform
public class TappayManager {
  ReactApplicationContext reactContext;
  TPDGooglePay tpdGooglePay;
  TPDLinePay tpdLinePay;

  TPDCard.CardType[] allowedNetworks = new TPDCard.CardType[] {
      TPDCard.CardType.Visa,
      TPDCard.CardType.MasterCard,
      TPDCard.CardType.JCB,
      TPDCard.CardType.AmericanExpress
  };
  TPDCard.AuthMethod[] allowedAuthMethods = new TPDCard.AuthMethod[] {
      TPDCard.AuthMethod.PanOnly,
      TPDCard.AuthMethod.Cryptogram3DS
  };
  final int LOAD_PAYMENT_DATA_REQUEST_CODE = 102;
  final int REQUEST_READ_PHONE_STATE = 101;

  int APP_ID;
  String APP_KEY;
  Boolean prod;
  String cardNumber;
  String dueMonth;
  String dueYear;
  String CCV;
  String SDKVersion;
  Promise googlePayJsPromise = null;
  Boolean googlePayIsReadyToPay;
  String googlePayMsg;
  String googlePayMerchantName;
  TPDGooglePayActivityEvent mTPDGooglePayActivityEvent;
  Promise linePayJsPromise = null;
  String linePayCallbackUri;
  Boolean linePayIsReadyToPay = false;
  TPDLinePayActivityEvent mTPDLinePayActivityEvent;
  Boolean samsungPayIsReadyToPay;
  String samsungPayMsg;
  String samsungPayMerchantName;
  String samsungPayMerchantId;
  String samsungPayCurrencyCode;
  String samsungPayServiceId;
  TPDSamsungPay tpdSamsungPay;
  boolean jkoPayIsReadyToPay;
  String jkoPayUniversalLinks;
  TPDJkoPay tpdJkoPay;
  TPDJkoPayActivityEvent mTPDJkoPayActivityEvent;
  TPDEasyWallet tpdEasyWallet;
  String easyWalletUniversalLinks;
  boolean easyWalletIsReadyToPay;
  TPDEasyWalletActivityEvent mTPDEasyWalletActivityEvent;

  TPDPiWallet tpdPiWalletPay;
  String piWalletUniversalLinks;
  boolean piWalletIsReadyToPay;
  TPDPiWalletActivityEvent mTPDPiWalletActivityEvent;

  interface TPDCardGetPrimeCallback extends TPDCardGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  class TPDGooglePayActivityEvent extends BaseActivityEventListener implements TPDGooglePayListener {
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      switch (requestCode) {
        case LOAD_PAYMENT_DATA_REQUEST_CODE:
          switch (resultCode) {
            case Activity.RESULT_OK:
              if (googlePayJsPromise != null) {
                revealGooglePaymentInfo(PaymentData.getFromIntent(data));
              }
              break;
            case Activity.RESULT_CANCELED:
              if (googlePayJsPromise != null) {
                googlePayJsPromise.reject("android error onActivityResult", "Canceled by User");
                // googlePayJsPromise = null;
              }
              break;
            case AutoResolveHelper.RESULT_ERROR:
              if (googlePayJsPromise != null) {
                Status status = AutoResolveHelper.getStatusFromIntent(data);
                googlePayJsPromise.reject("android error onActivityResult ",
                    "AutoResolveHelper.RESULT_ERROR : " + status.getStatusCode() + " , message = "
                        + status.getStatusMessage());
                // googlePayJsPromise = null;
              }
              break;
            default:
              if (googlePayJsPromise != null) {
                googlePayJsPromise.reject("android error onActivityResult default");
                // googlePayJsPromise = null;
              }
          }
          break;
        default:
          if (googlePayJsPromise != null) {
            googlePayJsPromise.reject("android error onActivityResult default");
            // googlePayJsPromise = null;
          }
      }
    }

    public void onReadyToPayChecked(boolean isReadyToPay, String msg) {
    }
  }

  interface TPDGooglePayGetPrimeCallback extends TPDGooglePayGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  interface TPDLinePayGetPrimeCallback extends TPDLinePayGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  class TPDLinePayActivityEvent extends BaseActivityEventListener implements TPDLinePayResultListener {
    public void onParseSuccess(TPDLinePayResult tpdLinePayResult) {
    }

    public void onParseFail(int status, String msg) {
    }
  }

  interface TPDSamsungPayGetPrimeCallback extends TPDSamsungPayGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  interface TPDJkoPayGetPrimeCallback extends TPDJkoPayGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  class TPDJkoPayActivityEvent extends BaseActivityEventListener implements TPDJkoPayResultListener {
    public void onParseSuccess(TPDJkoPayResult tpdJkoPayResult) {
    }

    public void onParseFail(int status, String msg) {
    }
  }

  interface TPDEasyWalletGetPrimeCallback extends TPDEasyWalletGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  class TPDEasyWalletActivityEvent extends BaseActivityEventListener implements TPDEasyWalletResultListener {
    public void onParseSuccess(TPDEasyWalletResult tpdEasyWalletResult) {
    }

    public void onParseFail(int status, String msg) {
    }
  }

  interface TPDPiWalletGetPrimeCallback extends TPDPiWalletGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  class TPDPiWalletActivityEvent extends BaseActivityEventListener implements TPDPiWalletResultListener {
    public void onParseSuccess(TPDPiWalletResult tpdPiWalletPayResult) {
    }

    public void onParseFail(int status, String msg) {
    }
  }

  public TappayManager(ReactApplicationContext _reactContext) {
    reactContext = _reactContext;
    SDKVersion = TPDSetup.getVersion();
  }

  public void initInstance(int _APP_ID, String _APP_KEY, Boolean _prod) {
    // if (APP_ID == _APP_ID && APP_KEY == _APP_KEY && prod == _prod) {
    //   return;
    // }
    APP_ID = _APP_ID;
    APP_KEY = _APP_KEY;
    prod = _prod;

    if (prod == true) {
      TPDSetup.initInstance(reactContext, APP_ID, APP_KEY, TPDServerType.Production);
    } else {
      TPDSetup.initInstance(reactContext, APP_ID, APP_KEY, TPDServerType.Sandbox);
    }
  }

  public TPDCardValidationResult TPDCard(String _cardNumber, String _dueMonth, String _dueYear, String _CCV)
      throws Exception {
    cardNumber = _cardNumber;
    dueMonth = _dueMonth;
    dueYear = _dueYear;
    CCV = _CCV;

    TPDCard card = new TPDCard(reactContext, new StringBuffer(cardNumber), new StringBuffer(dueMonth),
        new StringBuffer(dueYear), new StringBuffer(CCV));

    TPDCardValidationResult result = card.validate(new StringBuffer(cardNumber), new StringBuffer(dueMonth),
        new StringBuffer(dueYear), new StringBuffer(CCV));

    return result;
  }

  public void getDirectPayPrime(String geoLocation, Promise promise) {

    TPDCardGetPrimeCallback TPDCardGetPrimeCallback = new TPDCardGetPrimeCallback() {
      @Override
      public void onSuccess(String prime, TPDCardInfoDto cardInfo, String cardIdentifier,
          TPDMerchantReferenceInfoDto merchantReferenceInfo) {
        // Success
        try {

          WritableNativeMap resultData = new WritableNativeMap();
          resultData.putString("systemOS", "android");
          resultData.putString("tappaySDKVersion", SDKVersion);
          resultData.putString("prime", prime);

          WritableNativeMap _cardInfo = new WritableNativeMap();
          _cardInfo.putString("bincode", cardInfo.getBincode());
          _cardInfo.putString("lastFour", cardInfo.getLastFour());
          _cardInfo.putString("issuer", cardInfo.getIssuer());
          _cardInfo.putString("level", cardInfo.getLevel());
          _cardInfo.putString("country", cardInfo.getCountry());
          _cardInfo.putString("countryCode", cardInfo.getCountryCode());
          _cardInfo.putInt("cardType", cardInfo.getCardType());
          _cardInfo.putInt("funding", cardInfo.getFunding());
          _cardInfo.putString("issuerZhTw", cardInfo.getIssuerZhTw());
          _cardInfo.putString("bankId", cardInfo.getBankId());
          resultData.putMap("cardInfo", _cardInfo);

          resultData.putString("cardIdentifier", cardIdentifier);

          WritableNativeMap _merchantReferenceInfo = new WritableNativeMap();

          List<String> affiliateCodes = merchantReferenceInfo.getAffiliateCodes();
          WritableNativeArray _affiliateCodes = new WritableNativeArray();
          affiliateCodes.forEach((element) -> {
            _affiliateCodes.pushString(element);
          });
          _merchantReferenceInfo.putArray("affiliateCodes", _affiliateCodes);

          resultData.putMap("merchantReferenceInfo", _merchantReferenceInfo);

          promise.resolve(resultData);
        } catch (Exception e) {
          promise.reject("android error getDirectPayPrime onSuccess", e);
        }
      }

      @Override
      public void onFailure(int status, String reportMsg) {
        // Failure
        promise.reject("android error getDirectPayPrime onFailure",
            reportMsg + ", Error Status:" + Integer.toString(status));
      }
    };

    TPDCard card = new TPDCard(
        reactContext,
        new StringBuffer(cardNumber),
        new StringBuffer(dueMonth),
        new StringBuffer(dueYear),
        new StringBuffer(CCV))
        .onSuccessCallback(TPDCardGetPrimeCallback)
        .onFailureCallback(TPDCardGetPrimeCallback);

    // card.getPrime();
    card.createToken(geoLocation);
    // card.createToken("UNKNOWN");
  }

  public String getDeviceId() {
    return TPDSetup.getInstance(reactContext).getRbaDeviceId();
  }

  public void googlePayInit(String merchantName, Promise promise) {
    try {
      if (googlePayIsReadyToPay != null &&
          googlePayMsg != null &&
          googlePayMerchantName == merchantName) {

        WritableNativeMap resultData = new WritableNativeMap();
        resultData.putString("systemOS", "android");
        resultData.putString("tappaySDKVersion", SDKVersion);
        resultData.putBoolean("isReadyToPay", googlePayIsReadyToPay);
        resultData.putString("msg", googlePayMsg);

        promise.resolve(resultData);
        return;
      }

      if (mTPDGooglePayActivityEvent != null) {
        reactContext.removeActivityEventListener(mTPDGooglePayActivityEvent);
      }

      TPDMerchant tpdMerchant = new TPDMerchant();
      tpdMerchant.setMerchantName(merchantName);
      tpdMerchant.setSupportedNetworks(allowedNetworks);
      tpdMerchant.setSupportedAuthMethods(allowedAuthMethods);

      TPDConsumer tpdConsumer = new TPDConsumer();
      tpdConsumer.setPhoneNumberRequired(false);
      tpdConsumer.setShippingAddressRequired(false);
      tpdConsumer.setEmailRequired(false);

      mTPDGooglePayActivityEvent = new TPDGooglePayActivityEvent() {
        @Override
        public void onReadyToPayChecked(boolean isReadyToPay, String msg) {

          WritableNativeMap resultData = new WritableNativeMap();
          resultData.putBoolean("isReadyToPay", isReadyToPay);
          resultData.putString("msg", msg);

          googlePayIsReadyToPay = isReadyToPay;
          googlePayMsg = msg;
          googlePayMerchantName = merchantName;
          promise.resolve(resultData);
        }
      };

      reactContext.addActivityEventListener(mTPDGooglePayActivityEvent);

      tpdGooglePay = new TPDGooglePay(reactContext.getCurrentActivity(), tpdMerchant, tpdConsumer);
      tpdGooglePay.isGooglePayAvailable(mTPDGooglePayActivityEvent);
    } catch (Exception e) {
      promise.reject("android error googlePayInit", e);
    }
  }

  public void getGooglePayPrime(String totalPrice, String currencyCode, Promise promise) {
    tpdGooglePay.requestPayment(TransactionInfo.newBuilder()
        .setTotalPriceStatus(WalletConstants.TOTAL_PRICE_STATUS_FINAL)
        .setTotalPrice(totalPrice)
        .setCurrencyCode(currencyCode)
        .build(), LOAD_PAYMENT_DATA_REQUEST_CODE);
    googlePayJsPromise = promise;
  }

  public void revealGooglePaymentInfo(PaymentData paymentData) {
    if (googlePayJsPromise == null) {
      return;
    }
    try {
      JSONObject paymentDataJO = new JSONObject(paymentData.toJson());
      String cardDescription = paymentDataJO.getJSONObject("paymentMethodData").getString("description");

      TPDGooglePayGetPrimeCallback TPDGooglePayGetPrimeCallback = new TPDGooglePayGetPrimeCallback() {
        @Override
        public void onSuccess(String prime, TPDCardInfoDto cardInfo,
            TPDMerchantReferenceInfoDto merchantReferenceInfo) {
          // Success
          try {
            if (googlePayJsPromise == null) {
              return;
            }

            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putString("cardDescription ", cardDescription);
            resultData.putString("prime", prime);

            WritableNativeMap _cardInfo = new WritableNativeMap();
            _cardInfo.putString("bincode", cardInfo.getBincode());
            _cardInfo.putString("lastFour", cardInfo.getLastFour());
            _cardInfo.putString("issuer", cardInfo.getIssuer());
            _cardInfo.putString("level", cardInfo.getLevel());
            _cardInfo.putString("country", cardInfo.getCountry());
            _cardInfo.putString("countryCode", cardInfo.getCountryCode());
            _cardInfo.putInt("cardType", cardInfo.getCardType());
            _cardInfo.putInt("funding", cardInfo.getFunding());
            _cardInfo.putString("issuerZhTw", cardInfo.getIssuerZhTw());
            _cardInfo.putString("bankId", cardInfo.getBankId());
            resultData.putMap("cardInfo", _cardInfo);

            WritableNativeMap _merchantReferenceInfo = new WritableNativeMap();

            List<String> affiliateCodes = merchantReferenceInfo.getAffiliateCodes();
            WritableNativeArray _affiliateCodes = new WritableNativeArray();
            affiliateCodes.forEach((element) -> {
              _affiliateCodes.pushString(element);
            });
            _merchantReferenceInfo.putArray("affiliateCodes", _affiliateCodes);

            resultData.putMap("merchantReferenceInfo", _merchantReferenceInfo);

            googlePayJsPromise.resolve(resultData);
            // googlePayJsPromise = null;
          } catch (Exception e) {
            googlePayJsPromise.reject("android error revealGooglePaymentInfo onSuccess", e);
            // googlePayJsPromise = null;
          }
        }

        @Override
        public void onFailure(int status, String msg) {
          googlePayJsPromise.reject("android error revealGooglePaymentInfo onFailure",
              msg + ", Error Status:" + Integer.toString(status));
          // googlePayJsPromise = null;
        }
      };

      tpdGooglePay.getPrime(paymentData, TPDGooglePayGetPrimeCallback, TPDGooglePayGetPrimeCallback);
    } catch (Exception e) {
      googlePayJsPromise.reject("android error revealGooglePaymentInfo", e);
      // googlePayJsPromise = null;
    }
  }

  public boolean isLinePayAvailable() {
    return TPDLinePay.isLinePayAvailable(reactContext);
  }

  public boolean linePayInit(String _linePayCallbackUri) throws TPDLinePayException {
    if (linePayIsReadyToPay == true && linePayCallbackUri == _linePayCallbackUri) {
      return linePayIsReadyToPay;
    }

    boolean isLinePayAvailable = isLinePayAvailable();

    if (isLinePayAvailable == true) {
      tpdLinePay = new TPDLinePay(reactContext, _linePayCallbackUri);
      linePayIsReadyToPay = isLinePayAvailable;
      linePayCallbackUri = _linePayCallbackUri;
    }

    return isLinePayAvailable;
  }

  public void getLinePayPrime(Promise promise) {
    try {
      TPDLinePayGetPrimeCallback TPDLinePayGetPrimeCallback = new TPDLinePayGetPrimeCallback() {
        @Override
        public void onSuccess(String prime) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putString("prime", prime);
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error getLinePayPrime onSuccess", e);
          }
        }

        @Override
        public void onFailure(int status, String msg) {
          promise.reject("android error getLinePayPrime onFailure",
              msg + ", Error Status:" + Integer.toString(status));
        }
      };

      tpdLinePay.getPrime(TPDLinePayGetPrimeCallback, TPDLinePayGetPrimeCallback);
    } catch (Exception e) {
      promise.reject("android error getLinePayPrime", e);
    }
  }

  public void linePayRedirectWithUrl(String paymentUrl, Promise promise) {
    try {

      if (mTPDLinePayActivityEvent != null) {
        reactContext.removeActivityEventListener(mTPDLinePayActivityEvent);
      }

      mTPDLinePayActivityEvent = new TPDLinePayActivityEvent() {
        @Override
        public void onNewIntent(Intent intent) {
          super.onNewIntent(intent);
          if (intent.getDataString() != null && intent.getDataString().contains(linePayCallbackUri)) {
            tpdLinePay.parseToLinePayResult(reactContext.getApplicationContext(), intent.getData(),
                mTPDLinePayActivityEvent);
          }
        }

        @Override
        public void onParseSuccess(TPDLinePayResult tpdLinePayResult) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putInt("status", tpdLinePayResult.getStatus());
            resultData.putString("nrecTradeId", tpdLinePayResult.getRecTradeId());
            resultData.putString("nbankTransactionId", tpdLinePayResult.getBankTransactionId());
            resultData.putString("norderNumber", tpdLinePayResult.getOrderNumber());
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error linePayRedirectWithUrl onParseSuccess", e);
          }
          reactContext.removeActivityEventListener(mTPDLinePayActivityEvent);
          mTPDLinePayActivityEvent = null;
        }

        @Override
        public void onParseFail(int status, String msg) {
          promise.reject("android error linePayRedirectWithUrl onParseFail",
              msg + ", Error Status:" + Integer.toString(status));
          reactContext.removeActivityEventListener(mTPDLinePayActivityEvent);
          mTPDLinePayActivityEvent = null;
        }
      };

      reactContext.addActivityEventListener(mTPDLinePayActivityEvent);

      tpdLinePay.redirectWithUrl(paymentUrl);
    } catch (Exception e) {
      promise.reject("android error linePayRedirectWithUrl", e);
    }
  }

  public void samsungPayInit(String merchantName, String merchantId, String currencyCode, String serviceId,
      Promise promise) {
    try {
      if (samsungPayIsReadyToPay != null &&
          samsungPayMsg != null &&
          samsungPayMerchantName == merchantName &&
          samsungPayMerchantId == merchantId &&
          samsungPayCurrencyCode == currencyCode &&
          samsungPayServiceId == serviceId) {

        WritableNativeMap resultData = new WritableNativeMap();
        resultData.putString("systemOS", "android");
        resultData.putString("tappaySDKVersion", SDKVersion);
        resultData.putBoolean("isReadyToPay", samsungPayIsReadyToPay);
        resultData.putString("msg", samsungPayMsg);

        promise.resolve(resultData);
        return;
      }

      TPDMerchant tpdMerchant = new TPDMerchant();
      tpdMerchant.setMerchantName(merchantName);
      tpdMerchant.setSupportedNetworks(allowedNetworks);
      tpdMerchant.setSamsungMerchantId(merchantId);
      tpdMerchant.setCurrencyCode(currencyCode);
      tpdSamsungPay = new TPDSamsungPay(reactContext, serviceId, tpdMerchant);

      TPDSamsungPayStatusListener mTPDSamsungPayStatusListener = new TPDSamsungPayStatusListener() {
        @Override
        public void onReadyToPayChecked(boolean isReadyToPay, String msg) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putBoolean("isReadyToPay", isReadyToPay);
            resultData.putString("msg", msg);

            samsungPayIsReadyToPay = isReadyToPay;
            samsungPayMsg = msg;
            samsungPayMerchantName = merchantName;
            samsungPayMerchantId = merchantId;
            samsungPayCurrencyCode = currencyCode;
            samsungPayServiceId = serviceId;
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error samsungPayInit onReadyToPayChecked", e);
          }
        }
      };
      tpdSamsungPay.isSamsungPayAvailable(mTPDSamsungPayStatusListener);
    } catch (Exception e) {
      promise.reject("android error samsungPayInit", e);
    }
  }

  public void getSamsungPayPrime(String itemTotalAmount, String shippingPrice, String tax, String totalAmount,
      Promise promise) {
    try {

      TPDSamsungPayGetPrimeCallback mTPDSamsungPayGetPrimeCallback = new TPDSamsungPayGetPrimeCallback() {
        @Override
        public void onSuccess(String prime, TPDCardInfoDto cardInfo, TPDMerchantReferenceInfoDto merchantReferenceInfo,
            TPDCardDto card) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putString("prime", prime);

            WritableNativeMap _cardInfo = new WritableNativeMap();
            _cardInfo.putString("bincode", cardInfo.getBincode());
            _cardInfo.putString("lastFour", cardInfo.getLastFour());
            _cardInfo.putString("issuer", cardInfo.getIssuer());
            _cardInfo.putString("level", cardInfo.getLevel());
            _cardInfo.putString("country", cardInfo.getCountry());
            _cardInfo.putString("countryCode", cardInfo.getCountryCode());
            _cardInfo.putInt("cardType", cardInfo.getCardType());
            _cardInfo.putInt("funding", cardInfo.getFunding());
            _cardInfo.putString("issuerZhTw", cardInfo.getIssuerZhTw());
            _cardInfo.putString("bankId", cardInfo.getBankId());
            resultData.putMap("cardInfo", _cardInfo);

            WritableNativeMap _merchantReferenceInfo = new WritableNativeMap();
            WritableNativeArray _affiliateCodes = new WritableNativeArray();
            merchantReferenceInfo.getAffiliateCodes().forEach((element) -> {
              _affiliateCodes.pushString(element);
            });
            _merchantReferenceInfo.putArray("affiliateCodes", _affiliateCodes);
            resultData.putMap("merchantReferenceInfo", _merchantReferenceInfo);

            WritableNativeMap _card = new WritableNativeMap();
            _card.putString("lastFour", card.getLastFour());
            resultData.putMap("card", _card);

            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error getSamsungPayPrime onSuccess", e);
          }
        }

        @Override
        public void onFailure(int status, String reportMsg) {
          promise.reject("android error getSamsungPayPrime onFailure",
              reportMsg + ", Error Status:" + Integer.toString(status));
        }
      };

      tpdSamsungPay.getPrime(itemTotalAmount, shippingPrice, tax, totalAmount, mTPDSamsungPayGetPrimeCallback,
          mTPDSamsungPayGetPrimeCallback);
    } catch (Exception e) {
      promise.reject("android error getSamsungPayPrime", e);
    }
  }

  public boolean isJkoPayAvailable() {
    return TPDJkoPay.isJkoPayAvailable(reactContext);
  }

  public boolean jkoPayInit(String _jkoPayUniversalLinks) {
    if (jkoPayIsReadyToPay == true && jkoPayUniversalLinks == _jkoPayUniversalLinks) {
      return jkoPayIsReadyToPay;
    }

    boolean _jkoPayIsReadyToPay = false;

    try {
      _jkoPayIsReadyToPay = isJkoPayAvailable();

      if (_jkoPayIsReadyToPay == true) {
        tpdJkoPay = new TPDJkoPay(reactContext, _jkoPayUniversalLinks);
        jkoPayUniversalLinks = _jkoPayUniversalLinks;
        jkoPayIsReadyToPay = _jkoPayIsReadyToPay;
      }

    } catch (TPDJkoPayException e) {
      throw new RuntimeException(e);
    }

    return _jkoPayIsReadyToPay;
  }

  public void getJkoPayPrime(Promise promise) {
    try {
      TPDJkoPayGetPrimeCallback mTPDJkoPayGetPrimeCallback = new TPDJkoPayGetPrimeCallback() {
        @Override
        public void onSuccess(String prime) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putString("prime", prime);
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error getJkoPayPrime onSuccess", e);
          }
        }

        @Override
        public void onFailure(int status, String msg) {
          promise.reject("android error getJkoPayPrime onFailure",
              msg + ", Error Status:" + Integer.toString(status));
        }
      };

      tpdJkoPay.getPrime(mTPDJkoPayGetPrimeCallback, mTPDJkoPayGetPrimeCallback);
    } catch (Exception e) {
      promise.reject("android error getJkoPayPrime", e);
    }
  }

  public void jkoPayRedirectWithUrl(String paymentUrl, Promise promise) {
    try {

      if (mTPDJkoPayActivityEvent != null) {
        reactContext.removeActivityEventListener(mTPDJkoPayActivityEvent);
      }

      mTPDJkoPayActivityEvent = new TPDJkoPayActivityEvent() {
        @Override
        public void onNewIntent(Intent intent) {
          super.onNewIntent(intent);
          if (intent.getDataString() != null && intent.getDataString().contains(jkoPayUniversalLinks)) {
            tpdJkoPay.parseToJkoPayResult(reactContext.getApplicationContext(), intent.getData(),
                mTPDJkoPayActivityEvent);
          }
        }

        @Override
        public void onParseSuccess(TPDJkoPayResult tpdJkoPayResult) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putInt("status", tpdJkoPayResult.getStatus());
            resultData.putString("nrecTradeId", tpdJkoPayResult.getRecTradeId());
            resultData.putString("nbankTransactionId", tpdJkoPayResult.getBankTransactionId());
            resultData.putString("norderNumber", tpdJkoPayResult.getOrderNumber());
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error jkoPayRedirectWithUrl onParseSuccess", e);
          }
          reactContext.removeActivityEventListener(mTPDJkoPayActivityEvent);
          mTPDJkoPayActivityEvent = null;
        }

        @Override
        public void onParseFail(int status, String msg) {
          promise.reject("android error jkoPayRedirectWithUrl onParseFail",
              msg + ", Error Status:" + Integer.toString(status));
          reactContext.removeActivityEventListener(mTPDJkoPayActivityEvent);
          mTPDJkoPayActivityEvent = null;
        }
      };

      reactContext.addActivityEventListener(mTPDJkoPayActivityEvent);

      tpdJkoPay.redirectWithUrl(paymentUrl);
    } catch (Exception e) {
      promise.reject("android error jkoPayRedirectWithUrl", e);
    }
  }

  public boolean isEasyWalletAvailable() {
    return TPDEasyWallet.isAvailable(reactContext);
  }

  public boolean easyWalletInit(String _easyWalletUniversalLinks) {
    if (easyWalletIsReadyToPay == true && easyWalletUniversalLinks == _easyWalletUniversalLinks) {
      return easyWalletIsReadyToPay;
    }

    boolean _easyWalletIsReadyToPay = false;

    try {
      _easyWalletIsReadyToPay = isEasyWalletAvailable();

      if (_easyWalletIsReadyToPay == true) {
        tpdEasyWallet = new TPDEasyWallet(reactContext, _easyWalletUniversalLinks);
        easyWalletUniversalLinks = _easyWalletUniversalLinks;
        easyWalletIsReadyToPay = _easyWalletIsReadyToPay;
      }

    } catch (TPDEasyWalletException e) {
      throw new RuntimeException(e);
    }

    return _easyWalletIsReadyToPay;
  }

  public void getEasyWalletPrime(Promise promise) {
    try {
      TPDEasyWalletGetPrimeCallback mTPDEasyWalletGetPrimeCallback = new TPDEasyWalletGetPrimeCallback() {
        @Override
        public void onSuccess(String prime) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putString("prime", prime);
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error getEasyWalletPrime onSuccess", e);
          }
        }

        @Override
        public void onFailure(int status, String msg) {
          promise.reject("android error getEasyWalletPrime onFailure",
              msg + ", Error Status:" + Integer.toString(status));
        }
      };

      tpdEasyWallet.getPrime(mTPDEasyWalletGetPrimeCallback, mTPDEasyWalletGetPrimeCallback);
    } catch (Exception e) {
      promise.reject("android error getEasyWalletPrime", e);
    }
  }

  public void easyWalletRedirectWithUrl(String paymentUrl, Promise promise) {
    try {

      if (mTPDEasyWalletActivityEvent != null) {
        reactContext.removeActivityEventListener(mTPDEasyWalletActivityEvent);
      }

      mTPDEasyWalletActivityEvent = new TPDEasyWalletActivityEvent() {
        @Override
        public void onNewIntent(Intent intent) {
          super.onNewIntent(intent);
          if (intent.getDataString() != null && intent.getDataString().contains(easyWalletUniversalLinks)) {
            tpdEasyWallet.parseToEasyWalletResult(reactContext.getApplicationContext(), intent.getData(),
                mTPDEasyWalletActivityEvent);
          }
        }

        @Override
        public void onParseSuccess(TPDEasyWalletResult tpdEasyWalletResult) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putInt("status", tpdEasyWalletResult.getStatus());
            resultData.putString("nrecTradeId", tpdEasyWalletResult.getRecTradeId());
            resultData.putString("nbankTransactionId", tpdEasyWalletResult.getBankTransactionId());
            resultData.putString("norderNumber", tpdEasyWalletResult.getOrderNumber());
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error easyWalletRedirectWithUrl onParseSuccess", e);
          }
          reactContext.removeActivityEventListener(mTPDEasyWalletActivityEvent);
          mTPDEasyWalletActivityEvent = null;
        }

        @Override
        public void onParseFail(int status, String msg) {
          promise.reject("android error easyWalletRedirectWithUrl onParseFail",
              msg + ", Error Status:" + Integer.toString(status));
          reactContext.removeActivityEventListener(mTPDEasyWalletActivityEvent);
          mTPDEasyWalletActivityEvent = null;
        }
      };

      reactContext.addActivityEventListener(mTPDEasyWalletActivityEvent);

      tpdEasyWallet.redirectWithUrl(paymentUrl);
    } catch (Exception e) {
      promise.reject("android error easyWalletRedirectWithUrl", e);
    }
  }

  public boolean isPiWalletAvailable() {
    return TPDPiWallet.isPiWalletAvailable(reactContext);
  }

  public boolean piWalletInit(String _piWalletUniversalLinks) {
    if (piWalletIsReadyToPay == true && piWalletUniversalLinks == _piWalletUniversalLinks) {
      return piWalletIsReadyToPay;
    }

    boolean _piWalletIsReadyToPay = false;

    try {
      _piWalletIsReadyToPay = isPiWalletAvailable();

      if (_piWalletIsReadyToPay == true) {
        tpdPiWalletPay = new TPDPiWallet(reactContext, _piWalletUniversalLinks);
        piWalletUniversalLinks = _piWalletUniversalLinks;
        piWalletIsReadyToPay = _piWalletIsReadyToPay;
      }

    } catch (TPDPiWalletException e) {
      throw new RuntimeException(e);
    }

    return _piWalletIsReadyToPay;
  }

  public void getPiWalletPrime(Promise promise) {
    try {
      TPDPiWalletGetPrimeCallback mTPDPiWalletGetPrimeCallback = new TPDPiWalletGetPrimeCallback() {
        @Override
        public void onSuccess(String prime) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putString("prime", prime);
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error getPiWalletPrime onSuccess", e);
          }
        }

        @Override
        public void onFailure(int status, String msg) {
          promise.reject("android error getPiWalletPrime onFailure",
              msg + ", Error Status:" + Integer.toString(status));
        }
      };

      tpdPiWalletPay.getPrime(mTPDPiWalletGetPrimeCallback, mTPDPiWalletGetPrimeCallback);
    } catch (Exception e) {
      promise.reject("android error getPiWalletPrime", e);
    }
  }

  public void piWalletRedirectWithUrl(String paymentUrl, Promise promise) {
    try {

      if (mTPDPiWalletActivityEvent != null) {
        reactContext.removeActivityEventListener(mTPDPiWalletActivityEvent);
      }

      mTPDPiWalletActivityEvent = new TPDPiWalletActivityEvent() {
        @Override
        public void onNewIntent(Intent intent) {
          super.onNewIntent(intent);
          if (intent.getDataString() != null && intent.getDataString().contains(piWalletUniversalLinks)) {
            tpdPiWalletPay.parseToPiWalletResult(reactContext.getApplicationContext(), intent.getData(),
                mTPDPiWalletActivityEvent);
          }
        }

        @Override
        public void onParseSuccess(TPDPiWalletResult tpdPiWalletPayResult) {
          try {
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putString("systemOS", "android");
            resultData.putString("tappaySDKVersion", SDKVersion);
            resultData.putInt("status", tpdPiWalletPayResult.getStatus());
            resultData.putString("nrecTradeId", tpdPiWalletPayResult.getRecTradeId());
            resultData.putString("nbankTransactionId", tpdPiWalletPayResult.getBankTransactionId());
            resultData.putString("norderNumber", tpdPiWalletPayResult.getOrderNumber());
            promise.resolve(resultData);
          } catch (Exception e) {
            promise.reject("android error piWalletRedirectWithUrl onParseSuccess", e);
          }
          reactContext.removeActivityEventListener(mTPDPiWalletActivityEvent);
          mTPDPiWalletActivityEvent = null;
        }

        @Override
        public void onParseFail(int status, String msg) {
          promise.reject("android error piWalletRedirectWithUrl onParseFail",
              msg + ", Error Status:" + Integer.toString(status));
          reactContext.removeActivityEventListener(mTPDPiWalletActivityEvent);
          mTPDPiWalletActivityEvent = null;
        }
      };

      reactContext.addActivityEventListener(mTPDPiWalletActivityEvent);

      tpdPiWalletPay.redirectWithUrl(paymentUrl);
    } catch (Exception e) {
      promise.reject("android error piWalletRedirectWithUrl", e);
    }
  }

}
