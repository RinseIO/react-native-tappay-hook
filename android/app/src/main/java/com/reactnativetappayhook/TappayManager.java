package com.reactnativetappayhook;

import java.util.List;
// import android.util.Log;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.BaseActivityEventListener;

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

import com.google.android.gms.common.api.Status;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.TransactionInfo;
import com.google.android.gms.wallet.WalletConstants;

// import java.lang.reflect.Field;
// import java.lang.reflect.Method;
// import java.lang.Class;

// https://portal.tappaysdk.com/document/androidnoform
public class TappayManager {
  ReactApplicationContext reactContext;
  TPDCard.CardType[] allowedNetworks = new TPDCard.CardType[] { TPDCard.CardType.Visa,
      TPDCard.CardType.MasterCard, TPDCard.CardType.JCB, TPDCard.CardType.AmericanExpress };
  TPDCard.AuthMethod[] allowedAuthMethods = new TPDCard.AuthMethod[] { TPDCard.AuthMethod.PanOnly,
      TPDCard.AuthMethod.Cryptogram3DS };
  TPDGooglePay tpdGooglePay;
  final int LOAD_PAYMENT_DATA_REQUEST_CODE = 102;

  int APP_ID;
  String APP_KEY;
  Boolean prod;
  String cardNumber;
  String dueMonth;
  String dueYear;
  String CCV;
  String SDKVersion;
  Promise googlePayJsPromise = null;
  PaymentData paymentData;
  Boolean googlePayIsReadyToPay;
  String googlePayMsg;
  String googlePayMerchantName;
  TPDGooglePayActivityEvent mTPDGooglePayActivityEvent;

  interface TPDCardGetPrimeCallback extends TPDCardGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  class TPDGooglePayActivityEvent extends BaseActivityEventListener implements TPDGooglePayListener {
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      switch (requestCode) {
        case LOAD_PAYMENT_DATA_REQUEST_CODE:
          switch (resultCode) {
            case Activity.RESULT_OK:
              if (googlePayJsPromise != null) {
                paymentData = PaymentData.getFromIntent(data);
                revealGooglePaymentInfo(paymentData);
              }
              break;
            case Activity.RESULT_CANCELED:
              if (googlePayJsPromise != null) {
                googlePayJsPromise.reject("Canceled by User");
                // googlePayJsPromise = null;
              }
              break;
            case AutoResolveHelper.RESULT_ERROR:
              if (googlePayJsPromise != null) {
                Status status = AutoResolveHelper.getStatusFromIntent(data);
                googlePayJsPromise.reject("java error onActivityResult   ",
                    "AutoResolveHelper.RESULT_ERROR : " + status.getStatusCode() + " , message = "
                        + status.getStatusMessage());
                // googlePayJsPromise = null;
              }
              break;
            default:
              if (googlePayJsPromise != null) {
                googlePayJsPromise.reject("java error onActivityResult default");
                // googlePayJsPromise = null;
              }
          }
          break;
        default:
          if (googlePayJsPromise != null) {
            googlePayJsPromise.reject("java error onActivityResult default");
            // googlePayJsPromise = null;
          }
      }
    }

    public void onReadyToPayChecked(boolean isReadyToPay, String msg) {
    }
  }

  interface TPDGooglePayGetPrimeCallback extends TPDGooglePayGetPrimeSuccessCallback, TPDGetPrimeFailureCallback {
  }

  public TappayManager(ReactApplicationContext _reactContext) {
    reactContext = _reactContext;
    SDKVersion = TPDSetup.getVersion();
  }

  public void initInstance(int _APP_ID, String _APP_KEY, Boolean _prod) {
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

    // // 使用 Class.forName() 得到該 Class 的物件
    // Class<?> cls =
    // Class.forName("tech.cherri.tpdirect.api.TPDCardValidationResult");

    // // 取得該 Class 的所有屬性
    // Field[] fields = cls.getDeclaredFields();
    // for (Field field : fields) {
    // Log.d("MainActivity", "Field name: " + field.getName());
    // Log.d("MainActivity", "Field type: " + field.getType());
    // }

    // // 取得該 Class 的所有方法
    // Method[] methods = cls.getDeclaredMethods();
    // for (Method method : methods) {
    // Log.d("MainActivity", "Method name: " + method.getName());
    // Log.d("MainActivity", "Method return type: " + method.getReturnType());
    // Class<?>[] paramTypes = method.getParameterTypes();
    // for (Class<?> paramType : paramTypes) {
    // Log.d("MainActivity", "Method parameter type: " + paramType);
    // }
    // }

    return result;
  }

  public void handlerDirectPay(String geoLocation, Promise promise) {

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
          promise.reject("android error handlerDirectPay onSuccess", e);
        }
      }

      @Override
      public void onFailure(int status, String reportMsg) {
        // Failure
        promise.reject("android error handlerDirectPay onFailure", Integer.toString(status),
            new RuntimeException(reportMsg));
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

  public void googlePayInit(String merchantName, MainActivity MainActivity, Promise promise) {
    try {
      if (googlePayIsReadyToPay != null && googlePayMsg != null && googlePayMerchantName == merchantName) {

        WritableNativeMap resultData = new WritableNativeMap();
        resultData.putBoolean("isReadyToPay", googlePayIsReadyToPay);
        resultData.putString("msg", googlePayMsg);

        promise.resolve(resultData);
        return;
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

      tpdGooglePay = new TPDGooglePay(MainActivity, tpdMerchant, tpdConsumer);
      tpdGooglePay.isGooglePayAvailable(mTPDGooglePayActivityEvent);
    } catch (Exception e) {
      promise.reject("android error googlePayInit", e);
    }
  }

  public void handlerGooglePay(String totalPrice, String currencyCode, Promise promise) {
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
          try {
            if (googlePayJsPromise == null) {
              return;
            }
            WritableNativeMap resultData = new WritableNativeMap();
            resultData.putInt("status", status);
            resultData.putString("msg", msg);

            googlePayJsPromise.resolve(resultData);
            // googlePayJsPromise = null;
          } catch (Exception e) {
            googlePayJsPromise.reject("android error revealGooglePaymentInfo onFailure", e);
            // googlePayJsPromise = null;
          }
        }
      };

      tpdGooglePay.getPrime(paymentData, TPDGooglePayGetPrimeCallback, TPDGooglePayGetPrimeCallback);
    } catch (Exception e) {
      googlePayJsPromise.reject("java error revealGooglePaymentInfo", e);
      // googlePayJsPromise = null;
    }
  }
}
