//
//  TappayManager.h
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/3/21.
//
#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>
#import <TPDirect/TPDirect.h>
#import <React/RCTBridgeModule.h>
#import <AdSupport/ASIdentifierManager.h>

@interface TappayManager : NSObject

@property () NSNumber *APP_ID;
@property () NSString *APP_KEY;
@property () BOOL *prod;
@property () NSString *cardNumber;
@property () NSString *dueMonth;
@property () NSString *dueYear;
@property () NSString *CCV;
@property () NSString *SDKVersion;
@property (nonatomic, strong) TPDMerchant *TPDmerchant;
@property (nonatomic, strong) TPDConsumer *TPDconsumer;
@property (nonatomic, strong) TPDCart *TPDcart;
@property (nonatomic, strong) TPDApplePay *TPDapplePay;
@property () RCTPromiseResolveBlock __strong *applePayResolve;
@property () RCTPromiseRejectBlock __strong *applePayReject;

- (void)initInstance:(NSNumber *)APP_ID APP_KEY:(NSString *)APP_KEY prod:(BOOL)prod;

- (id)TPDCard:(NSString *)cardNumber dueMonth:(NSString *)dueMonth dueYear:(NSString *)dueYear CCV:(NSString *)CCV;

- (void)handlerDirectPay:(NSString *)geoLocation resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (NSString *)getDeviceId;

- (NSString *)cardTypeToString:(CardType)cardType;

- (void)applePayInit:(NSString *)merchantName merchantId:(NSString *)merchantId countryCode:(NSString *)countryCode currencyCode:(NSString *)currencyCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

- (void)handlerApplePay:(NSString *)amount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

@end
