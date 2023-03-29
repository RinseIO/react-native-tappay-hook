//
//  RNToolsManager.m
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/1/13.
//

// https://www.jianshu.com/p/6fc3f77e0213
#import "RNToolsManager.h"

@implementation RNToolsManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNToolsManager);
//  宣告給ReactNative使用，取得app版本號
RCT_EXPORT_METHOD(getAppVersion:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];// 取得目前版本號
    resolve(version);
  }
  @catch (NSException *exception) {
    reject(@"ios error getAppVersion", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的initInstance
RCT_EXPORT_METHOD(TappayInitInstance:(nonnull NSNumber *)APP_ID APP_KEY:(NSString *)APP_KEY prod:(BOOL)prod resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    self.TappayManager = [TappayManager alloc];
    [self.TappayManager initInstance:APP_ID APP_KEY:APP_KEY prod:prod];
    resolve(@YES);
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayInitInstance", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的TPDCard
RCT_EXPORT_METHOD(TappaySetTPDCard:(NSString *)cardNumber dueMonth:(NSString *)dueMonth dueYear:(NSString *)dueYear CCV:(NSString *)CCV resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    TPDCardValidationResult *result = [self.TappayManager TPDCard:cardNumber dueMonth:dueMonth dueYear:dueYear CCV:CCV];
    NSString *cardType = [self.TappayManager cardTypeToString:result.cardType];

    resolve(@{
      @"tappaySDKVersion": self.TappayManager.SDKVersion,
      @"systemOS": @"ios",
      @"cardNumber":cardNumber,
      @"dueMonth":dueMonth,
      @"dueYear":dueYear,
      @"CCV":CCV,
      @"isCardNumberValid":[NSNumber numberWithBool:result.isCardNumberValid],
      @"isExpiryDateValid":[NSNumber numberWithBool:result.isExpiryDateValid],
      @"isCCVValid":[NSNumber numberWithBool:result.isCCVValid],
      @"cardType":cardType,
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappaySetTPDCard", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的createTokenWithGeoLocation
RCT_EXPORT_METHOD(TappayHandlerDirectPay:(NSString *)geoLocation resolver:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager handlerDirectPay:geoLocation resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayHandlerDirectPay", exception.description, nil);
  }
}
//  宣告給ReactNative使用，TappaySDK的getDeviceId
RCT_EXPORT_METHOD(TappayGetDeviceId:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
   resolve([self.TappayManager getDeviceId]);
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayHandlerDirectPay", exception.description, nil);
  }
}

//  宣告給ReactNative使用，對應android版的TappayGooglePayInit方法
RCT_EXPORT_METHOD(TappayGooglePayInit:(NSString *)merchantName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  // reject(@"ios error TappayGooglePayInit", @"ios not support GooglePay", nil);
  resolve(@{
    @"isReadyToPay": @NO,
    @"msg": @"ios not support GooglePay"
  });
}

//  宣告給ReactNative使用，對應android版的TappayHandlerGooglePay方法
RCT_EXPORT_METHOD(TappayHandlerGooglePay:(NSString *)merchantName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  reject(@"ios error TappayHandlerGooglePay", @"ios not support GooglePay", nil);
}

// 宣告給ReactNative使用的function名稱，對TappaySDK的TPDapplePay做初始化
RCT_EXPORT_METHOD(TappayAapplePayInit:(NSString *)merchantName merchantId:(NSString *)merchantId countryCode:(NSString *)countryCode currencyCode:(NSString *)currencyCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager applePayInit:merchantName merchantId:merchantId countryCode:countryCode currencyCode:currencyCode resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayAapplePayInit", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK的TPDapplePay的canMakePayments
RCT_EXPORT_METHOD(TappayIsApplePayAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    BOOL result = [self.TappayManager isApplePayAvailable];
    resolve(@{
      @"isReadyToPay": @(result)
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayIsApplePayAvailable", exception.description, nil);
  }
}

// 宣告給ReactNative使用的function名稱，對TappaySDK TPDapplePay的付款方法
RCT_EXPORT_METHOD(TappayHandlerApplePay:(NSString *)amount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [self.TappayManager handlerApplePay:amount resolver:resolve rejecter:reject];
  }
  @catch (NSException *exception) {
    reject(@"ios error TappayHandlerApplePay", exception.description, nil);
  }
}

@end
