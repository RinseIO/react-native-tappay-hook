//
//  TappayManager.m
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/3/21.
//

#import "TappayManager.h"

@implementation TappayManager

- (void)initInstance:(NSNumber *)APP_ID APP_KEY:(NSString *)APP_KEY prod:(BOOL)prod {
  // if (self.APP_ID == APP_ID && self.APP_KEY == APP_KEY && self.prod == prod) {
  //   return;
  // }
  self.APP_ID = APP_ID;
  self.APP_KEY = APP_KEY;
  self.prod = &prod;
  self.SDKVersion = [TPDSetup version];

  #if prod
    [TPDSetup setWithAppId:APP_ID withAppKey:APP_KEY withServerType:TPDServer_Production];
  #else
    [TPDSetup setWithAppId:[APP_ID intValue] withAppKey:APP_KEY withServerType:TPDServer_SandBox];
  #endif

}

- (id)TPDCard:(NSString *)cardNumber dueMonth:(NSString *)dueMonth dueYear:(NSString *)dueYear CCV:(NSString *)CCV {
  self.cardNumber = cardNumber;
  self.dueMonth = dueMonth;
  self.dueYear = dueYear;
  self.CCV = CCV;

  return [TPDCard validateWithCardNumber:self.cardNumber withDueMonth:self.dueMonth withDueYear:self.dueYear withCCV:self.CCV];
}

- (void)getDirectPayPrime:(NSString *)geoLocation resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {

   [[[[TPDCard setWithCardNumber:self.cardNumber withDueMonth:self.dueMonth withDueYear:self.dueYear withCCV:self.CCV]
    onSuccessCallback:^(NSString * _Nullable prime, TPDCardInfo * _Nullable cardInfo, NSString * _Nullable cardIdentifier, NSDictionary *_Nonnull merchantReferenceInfo) {
        //Success
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"prime": prime,
          @"geoLocation": geoLocation,
          @"cardInfo": @{
            @"bincode": cardInfo.bincode,
            @"lastfour": cardInfo.lastFour,
            @"issuer": cardInfo.issuer,
            @"countryCode": cardInfo.countryCode,
            @"country": cardInfo.country,
            @"level": cardInfo.level,
            @"issuerZhTw": cardInfo.issuerZhTw,
            @"bankId": cardInfo.bankId,
            @"cardType":[NSNumber numberWithInteger:cardInfo.cardType],
            @"funding":[NSNumber numberWithInteger:cardInfo.funding]
          },
          // @"bincode": cardInfo.bincode,
          // @"lastfour": cardInfo.lastFour,
          // @"issuer": cardInfo.issuer,
          // @"type":[NSNumber numberWithInteger:cardInfo.cardType],
          // @"funding":[NSNumber numberWithInteger:cardInfo.funding],
          @"cardidentifier": cardIdentifier,
          @"merchantReferenceInfo": merchantReferenceInfo
        });
    }]
    onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
        //Failure
        reject(
          @"ios error getDirectPayPrime onFailure",
          [NSString stringWithFormat: @"%ld", status],
          [NSError errorWithDomain:message code:status userInfo:nil]
        );
    }]
    createTokenWithGeoLocation:geoLocation
    // createTokenWithGeoLocation:@"UNKNOWN"
    // getPrime
    ];
}

- (NSString *)getDeviceId {
  return [[TPDSetup shareInstance] getDeviceId];
}

- (NSString *)cardTypeToString:(CardType)cardType {
    NSString *stringCardType = nil;
    switch(cardType) {
        case CardType_Visa:
            stringCardType = @"Visa";
            break;
        case CardType_JCB:
            stringCardType = @"JCB";
            break;
        case CardType_MasterCard:
            stringCardType = @"MasterCard";
            break;
        case CardType_AMEX:
            stringCardType = @"AmericanExpress";
            break;
        case CardType_UnionPay:
            stringCardType = @"UnionPay";
            break;
        default:
            stringCardType = @"Unknown";
    }
    return stringCardType;
}

- (BOOL)isApplePayAvailable {
  return [TPDApplePay canMakePayments];
}

- (void)applePayInit:(NSString *)merchantName merchantId:(NSString *)merchantId countryCode:(NSString *)countryCode currencyCode:(NSString *)currencyCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.tpdMerchant = [TPDMerchant new];
    self.tpdMerchant.merchantName               = merchantName;
    self.tpdMerchant.merchantCapability         = PKMerchantCapability3DS;
    self.tpdMerchant.applePayMerchantIdentifier = merchantId; // Your Apple Pay Merchant ID (https://developer.apple.com/account/ios/identifier/merchant)
    self.tpdMerchant.countryCode                = countryCode;
    self.tpdMerchant.currencyCode               = currencyCode;
    self.tpdMerchant.supportedNetworks          = @[PKPaymentNetworkAmex, PKPaymentNetworkVisa ,PKPaymentNetworkMasterCard];

    // Set Consumer Contact.
    PKContact *contact  = [PKContact new];
    NSPersonNameComponents *name = [NSPersonNameComponents new];
    // name.familyName = @"Cherri";
    // name.givenName  = @"TapPay";
    contact.name = name;
    
    self.tpdConsumer = [TPDConsumer new];
    self.tpdConsumer.billingContact    = contact;
    self.tpdConsumer.shippingContact   = contact;
    // self.tpdConsumer.requiredShippingAddressFields  = PKAddressFieldNone;
    // self.tpdConsumer.requiredBillingAddressFields   = PKAddressFieldNone;

    // self.applePayJsResolve = resolve;
    // self.applePayJsReject = reject;

    TPDApplePayDelegate *_TPDApplePayDelegate = [TPDApplePayDelegate alloc];
    _TPDApplePayDelegate.applePayJsResolve = resolve;
    _TPDApplePayDelegate.applePayJsReject = reject;
    _TPDApplePayDelegate.SDKVersion = self.SDKVersion;
    _TPDApplePayDelegate.tpdConsumer = self.tpdConsumer;

    TPDApplePay *tpdApplePay = [TPDApplePay setupWthMerchant:self.tpdMerchant withConsumer:self.tpdConsumer withCart:[TPDCart new] withDelegate:_TPDApplePayDelegate];
    // TPDApplePay *tpdApplePay = [TPDApplePay setupWthMerchant:self.tpdMerchant withConsumer:self.tpdConsumer withCart:nil withDelegate:_TPDApplePayDelegate];

    resolve(@{
      @"systemOS": @"ios",
      @"tappaySDKVersion": self.SDKVersion,
      @"isReadyToPay": @([self isApplePayAvailable])
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error applePayInit", exception.description, nil);
  }
}

- (void)getApplePayPrime:(NSString *)amount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.tpdCart = [TPDCart new];
    self.tpdCart.isAmountPending = YES;
    self.tpdCart.isShowTotalAmount = NO;

    TPDPaymentItem *final = [TPDPaymentItem paymentItemWithItemName:@"final" withAmount:[NSDecimalNumber decimalNumberWithString:amount]];
    [self.tpdCart addPaymentItem:final];

    TPDPaymentItem * pending = [TPDPaymentItem pendingPaymentItemWithItemName:@"pending"];
    [self.tpdCart addPaymentItem:pending];

    self.applePayJsResolve = resolve;
    self.applePayJsReject = reject;

    TPDApplePayDelegate *_TPDApplePayDelegate = [TPDApplePayDelegate alloc];
    _TPDApplePayDelegate.applePayJsResolve = resolve;
    _TPDApplePayDelegate.applePayJsReject = reject;
    _TPDApplePayDelegate.SDKVersion = self.SDKVersion;
    _TPDApplePayDelegate.tpdConsumer = self.tpdConsumer;

    // Without Handle Payment
    self.tpdApplePay = [TPDApplePay setupWthMerchant:self.tpdMerchant withConsumer:self.tpdConsumer withCart:self.tpdCart withDelegate:_TPDApplePayDelegate];

    [self.tpdApplePay startPayment];

  }
  @catch (NSException *exception) {
    reject(@"ios error getApplePayPrime", exception.description, nil);
  }
}

//When exception happened receive notification.
- (void)tappayLinePayExceptionHandler:(NSNotification *)notification {
  if (self.linePayJsReject != nil) {
    TPDLinePayResult * result = [TPDLinePay parseURL:notification];
    
    self.linePayJsReject(@"ios error tappayLinePayExceptionHandler", [NSString stringWithFormat: @"%ld", result.status], @{
      @"status": [NSString stringWithFormat: @"%ld", result.status],
      @"orderNumber": result.orderNumber,
      @"recTradeId": result.recTradeId,
      @"bankTransactionId": result.bankTransactionId,
    });
    self.linePayJsReject = nil;
  }
}

- (BOOL)linePayHandleURL:(NSString *)openUri {
  return [TPDLinePay handleURL:openUri];
}

- (BOOL)isLinePayAvailable {
  return [TPDLinePay isLinePayAvailable];
}

- (BOOL)linePayInit:(NSString *)linePayCallbackUri {
  if (self.linePayIsReadyToPay == YES) {
    return self.linePayIsReadyToPay;
  }

  bool linePayIsReadyToPay = false;
  linePayIsReadyToPay = [self isLinePayAvailable];

  #if linePayIsReadyToPay == YES
    [TPDLinePay addExceptionObserver:(@selector(tappayLinePayExceptionHandler:))];
    self.tpdLinePay = [TPDLinePay setupWithReturnUrl:linePayCallbackUri];
    self.linePayIsReadyToPay = &(linePayIsReadyToPay);
    self.linePayCallbackUri = linePayCallbackUri;
  #endif

  return linePayIsReadyToPay;
}

-(void)getLinePayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  self.linePayJsReject = reject;
  [
    [
      [self.tpdLinePay onSuccessCallback:^(NSString * _Nullable prime) {
            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime,
            });
            self.linePayJsReject = nil;
        }
      ]
      onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error getLinePayPrime onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
          self.linePayJsReject = nil;
      }
    ]
    getPrime
  ];
}

-(void)linePayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  self.linePayJsReject = reject;
  [
    [
      [self.tpdLinePay onSuccessCallback:^(NSString * _Nullable prime) {
          UIViewController *rootViewcontroller= [UIApplication sharedApplication].keyWindow.rootViewController;

          [self.tpdLinePay redirect:paymentUrl withViewController:rootViewcontroller completion:^(TPDLinePayResult * _Nonnull result) {

            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime,
              @"paymentUrl": paymentUrl,
              @"status": [NSString stringWithFormat: @"%ld", result.status],
              @"orderNumber": result.orderNumber,
              @"recTradeId": result.recTradeId,
              @"bankTransactionId": result.bankTransactionId
            });
            self.linePayJsReject = nil;

          }];
        }
      ]
      onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error linePayRedirectWithUrl onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
          self.linePayJsReject = nil;
      }
    ]
    getPrime
  ];

}

- (void)tappayJKOPayExceptionHandler:(NSNotification *)notification {
  if (self.linePayJsResolve != nil) {
    TPDJKOPayResult * result = [TPDJKOPay parseURL:notification];
    
    self.linePayJsReject(@"ios error tappayLinePayExceptionHandler",
     [NSString stringWithFormat: @"%ld", result.status],
     @{
        @"status": [NSString stringWithFormat: @"%ld", result.status],
        @"orderNumber": result.orderNumber,
        @"recTradeId": result.recTradeId,
        @"bankTransactionId": result.bankTransactionId,
      }
    );
  }
}

-(BOOL)isJkoPayAvailable {
  return [TPDJKOPay isJKOPayAvailable];
}

-(BOOL)jkoPayInit:(NSString *)_jkoPayUniversalLinks {
  if (self.jkoPayIsReadyToPay == YES && self.jkoPayUniversalLinks == _jkoPayUniversalLinks) {
    return self.jkoPayIsReadyToPay;
  }
  
  BOOL jkoPayIsReadyToPay = [self isJkoPayAvailable];
  
  #if jkoPayIsReadyToPay == YES
    TPDJKOPay *tpdJkoPay = [TPDJKOPay setupWithReturnUrl:_jkoPayUniversalLinks];
    [TPDJKOPay addExceptionObserver:(@selector(tappayJKOPayExceptionHandler:))];

    self.tpdJkoPay = tpdJkoPay;
    self.jkoPayUniversalLinks = _jkoPayUniversalLinks;
    self.jkoPayIsReadyToPay = &(jkoPayIsReadyToPay);
  #endif

  return jkoPayIsReadyToPay;
}

-(void)getJkoPayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    [
      [
        [
          self.tpdJkoPay onSuccessCallback:^(NSString * _Nullable prime) {
            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime
            });
          }
        ]
        onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error getJkoPayPrime onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
        }
      ]
      getPrime
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error getJkoPayPrime", exception.description, nil);
  }
}

-(void)jkoPayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    [
      self.tpdJkoPay redirect:paymentUrl completion:^(TPDJKOPayResult * _Nonnull result) {
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"paymentUrl": paymentUrl,
          @"status":[NSString stringWithFormat:@"%ld", result.status],
          @"recTradeId": result.recTradeId,
          @"bankTransactionId": result.bankTransactionId,
          @"orderNumber":result.orderNumber
        });
      }
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error jkoPayRedirectWithUrl", exception.description, nil);
  }
}
-(BOOL)jkoPayHandleUniversalLink:(NSString *)url {
  return [TPDJKOPay handleJKOUniversalLink:url];
}

- (void)tappayEasyWalletExceptionHandler:(NSNotification *)notification {
    TPDEasyWalletResult * result = [TPDEasyWallet parseURL:notification];

    if (self.easyWalletJsReject != nil) {
      self.easyWalletJsReject(@"ios error tappayEasyWalletExceptionHandler", [NSString stringWithFormat: @"%ld", result.status], @{
        @"status": [NSString stringWithFormat: @"%ld", result.status],
        @"orderNumber": result.orderNumber,
        @"recTradeId": result.recTradeId,
        @"bankTransactionId": result.bankTransactionId,
      });
      self.easyWalletJsReject = nil;
    }
}

-(BOOL)isEasyWalletAvailable {
  return [TPDEasyWallet isEasyWalletAvailable];
}

-(BOOL)easyWalletInit:(NSString *)_easyWalletUniversalLinks {
  if (self.easyWalletIsReadyToPay == YES && self.easyWalletUniversalLinks == _easyWalletUniversalLinks) {
    return self.easyWalletIsReadyToPay;
  }
  
  BOOL easyWalletIsReadyToPay = [self isEasyWalletAvailable];
  
  #if easyWalletIsReadyToPay == YES
  TPDEasyWallet *tpdEasyWallet = [TPDEasyWallet setupWithReturUrl:_easyWalletUniversalLinks];
    [TPDEasyWallet addExceptionObserver:(@selector(tappayEasyWalletExceptionHandler:))];

    self.tpdEasyWallet = tpdEasyWallet;
    self.easyWalletUniversalLinks = _easyWalletUniversalLinks;
    self.easyWalletIsReadyToPay = &(easyWalletIsReadyToPay);
  #endif

  return easyWalletIsReadyToPay;
}

-(void)getEasyWalletPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.easyWalletJsReject = reject;
    [
      [
        [
          self.tpdEasyWallet onSuccessCallback:^(NSString * _Nullable prime) {
            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime
            });
            self.easyWalletJsReject = nil;
          }
        ]
        onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error getEasyWalletPrime onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
          self.easyWalletJsReject = nil;
        }
      ]
      getPrime
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error getEasyWalletPrime", exception.description, nil);
    self.easyWalletJsReject = nil;
  }
}

-(void)easyWalletRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.easyWalletJsReject = reject;
    [
      self.tpdEasyWallet redirect:paymentUrl completion:^(TPDEasyWalletResult * _Nonnull result) {
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"paymentUrl": paymentUrl,
          @"status":[NSString stringWithFormat:@"%ld", result.status],
          @"recTradeId": result.recTradeId,
          @"bankTransactionId": result.bankTransactionId,
          @"orderNumber":result.orderNumber
        });
        self.easyWalletJsReject = nil;
      }
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error easyWalletRedirectWithUrl", exception.description, nil);
    self.easyWalletJsReject = nil;
  }
}

-(BOOL)easyWalletHandleUniversalLink:(NSString *)url {
  return [TPDEasyWallet handleEasyWalletUniversalLink:url];
}

- (void)tappayPiWalletExceptionHandler:(NSNotification *)notification {
  if (self.piWalletJsReject != nil) {
    TPDPiWalletResult * result = [TPDPiWallet parseURL:notification];
    
    self.piWalletJsReject(@"ios error tappayPiWalletExceptionHandler",
     [NSString stringWithFormat: @"%ld", result.status],
     @{
        @"status": [NSString stringWithFormat: @"%ld", result.status],
        @"orderNumber": result.orderNumber,
        @"recTradeId": result.recTradeId,
        @"bankTransactionId": result.bankTransactionId,
      }
    );
    self.piWalletJsReject = nil;
  }
}

-(BOOL)isPiWalletAvailable {
  return [TPDPiWallet isPiWalletAvailable];
}

-(BOOL)piWalletInit:(NSString *)_piWalletUniversalLinks {
  if (self.piWalletIsReadyToPay == YES && self.piWalletUniversalLinks == _piWalletUniversalLinks) {
    return self.piWalletIsReadyToPay;
  }
  
  BOOL piWalletIsReadyToPay = [self isPiWalletAvailable];
  
  #if piWalletIsReadyToPay == YES
    TPDPiWallet *tpdPiWallet = [TPDPiWallet setupWithReturUrl:_piWalletUniversalLinks];
    [TPDPiWallet addExceptionObserver:(@selector(tappayPiWalletExceptionHandler:))];

    self.tpdPiWallet = tpdPiWallet;
    self.piWalletUniversalLinks = _piWalletUniversalLinks;
    self.piWalletIsReadyToPay = &(piWalletIsReadyToPay);
  #endif

  return piWalletIsReadyToPay;
}

-(void)getPiWalletPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.piWalletJsReject = reject;
    [
      [
        [
          self.tpdPiWallet onSuccessCallback:^(NSString * _Nullable prime) {
            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime
            });
            self.piWalletJsReject = nil;
          }
        ]
        onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error getPiWalletPrime onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
          self.piWalletJsReject = nil;
        }
      ]
      getPrime
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error getPiWalletPrime", exception.description, nil);
    self.piWalletJsReject = nil;
  }
}

-(void)piWalletRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.piWalletJsReject = reject;
    [
      self.tpdPiWallet redirect:paymentUrl completion:^(TPDPiWalletResult * _Nonnull result) {
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"paymentUrl": paymentUrl,
          @"status":[NSString stringWithFormat:@"%ld", result.status],
          @"recTradeId": result.recTradeId,
          @"bankTransactionId": result.bankTransactionId,
          @"orderNumber":result.orderNumber
        });
        self.piWalletJsReject = nil;
      }
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error piWalletRedirectWithUrl", exception.description, nil);
    self.piWalletJsReject = nil;
  }
}

-(BOOL)piWalletHandleUniversalLink:(NSString *)url {
  return [TPDPiWallet handlePiWalletUniversalLink:url];
}

-(void)tappayPlusPayExceptionHandler:(NSNotification *)notification {
  if (self.plusPayJsReject != nil) {
    TPDPlusPayResult * result = [TPDPlusPay parseURL:notification];
    
    self.plusPayJsReject(@"ios error tappayPlusPayExceptionHandler",
     [NSString stringWithFormat: @"%ld", result.status],
     @{
        @"status": [NSString stringWithFormat: @"%ld", result.status],
        @"orderNumber": result.orderNumber,
        @"recTradeId": result.recTradeId,
        @"bankTransactionId": result.bankTransactionId,
      }
    );
    self.plusPayJsReject = nil;
  }
}

-(BOOL)isPlusPayAvailable {
  return [TPDPlusPay isPlusPayAvailable];
}

-(BOOL)plusPayInit:(NSString *)_plusPayUniversalLinks {
  if (self.plusPayIsReadyToPay == YES && self.plusPayUniversalLinks == _plusPayUniversalLinks) {
    return self.plusPayIsReadyToPay;
  }
  
  BOOL plusPayIsReadyToPay = [self isPlusPayAvailable];
  
  #if plusPayIsReadyToPay == YES
    TPDPlusPay *tpdPlusPay = [TPDPlusPay setupWithReturnUrl:_plusPayUniversalLinks];
    [TPDPlusPay addExceptionObserver:(@selector(tappayPlusPayExceptionHandler:))];

    self.tpdPlusPay = tpdPlusPay;
    self.plusPayUniversalLinks = _plusPayUniversalLinks;
    self.plusPayIsReadyToPay = &(plusPayIsReadyToPay);
  #endif

  return plusPayIsReadyToPay;
}

-(void)getPlusPayPrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.plusPayJsReject = reject;
    [
      [
        [
          self.tpdPlusPay onSuccessCallback:^(NSString * _Nullable prime) {
            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime
            });
            self.plusPayJsReject = nil;
          }
        ]
        onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error getPiWalletPrime onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
          self.plusPayJsReject = nil;
        }
      ]
      getPrime
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error getPlusPayPrime", exception.description, nil);
    self.plusPayJsReject = nil;
  }
}

-(void)plusPayRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.plusPayJsReject = reject;
    [
      self.tpdPlusPay redirect:paymentUrl completion:^(TPDPlusPayResult * _Nonnull result) {
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"status":[NSString stringWithFormat:@"%ld", result.status],
          @"recTradeId": result.recTradeId,
          @"bankTransactionId": result.bankTransactionId,
          @"orderNumber":result.orderNumber
        });
        self.plusPayJsReject = nil;
      }
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error plusPayRedirectWithUrl", exception.description, nil);
    self.plusPayJsReject = nil;
  }
}

-(BOOL)plusPayHandleUniversalLink:(NSString *)url {
  return [TPDPlusPay handlePlusPayUniversalLink:url];
}

-(void)tappayAtomeExceptionHandler:(NSNotification *)notification {
  if (self.atomeJsReject != nil) {
    TPDAtomeResult * result = [TPDAtome parseURL:notification];
    
    self.atomeJsReject(@"ios error tappayAtomeExceptionHandler",
     [NSString stringWithFormat: @"%ld", result.status],
     @{
        @"status": [NSString stringWithFormat: @"%ld", result.status],
        @"orderNumber": result.orderNumber,
        @"recTradeId": result.recTradeId,
        @"bankTransactionId": result.bankTransactionId,
      }
    );
    self.atomeJsReject = nil;
  }
}

-(BOOL)isAtomeAvailable {
  return [TPDAtome isAtomeAvailable];
}

-(BOOL)atomeInit:(NSString *)_atomeUniversalLinks {
  if (self.atomeIsReadyToPay == YES && self.atomeUniversalLinks == _atomeUniversalLinks) {
    return self.atomeIsReadyToPay;
  }
  
  BOOL atomeIsReadyToPay = [self isAtomeAvailable];
  
  #if atomeIsReadyToPay == YES
    TPDAtome *tpdAtome = [TPDAtome setupWithReturnUrl:_atomeUniversalLinks];
    [TPDAtome addExceptionObserver:(@selector(tappayAtomeExceptionHandler:))];

    self.tpdAtome = tpdAtome;
    self.atomeUniversalLinks = _atomeUniversalLinks;
    self.atomeIsReadyToPay = &(atomeIsReadyToPay);
  #endif

  return atomeIsReadyToPay;
}

-(void)getAtomePrime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.atomeJsReject = reject;
    [
      [
        [
          self.tpdAtome onSuccessCallback:^(NSString * _Nullable prime) {
            resolve(@{
              @"systemOS": @"ios",
              @"tappaySDKVersion": self.SDKVersion,
              @"prime": prime
            });
            self.atomeJsReject = nil;
          }
        ]
        onFailureCallback:^(NSInteger status, NSString * _Nonnull message) {
          reject(
            @"ios error getAtomePrime onFailureCallback",
            [NSString stringWithFormat: @"%ld", status],
            [NSError errorWithDomain:message code:status userInfo:nil]
          );
          self.atomeJsReject = nil;
        }
      ]
      getPrime
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error getAtomePrime", exception.description, nil);
    self.atomeJsReject = nil;
  }
}

-(void)atomeRedirectWithUrl:(NSString *)paymentUrl resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.atomeJsReject = reject;
    [
      self.tpdAtome redirect:paymentUrl completion:^(TPDAtomeResult * _Nonnull result) {
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"paymentUrl": paymentUrl,
          @"status":[NSString stringWithFormat:@"%ld", result.status],
          @"recTradeId": result.recTradeId,
          @"bankTransactionId": result.bankTransactionId,
          @"orderNumber":result.orderNumber
        });
        self.atomeJsReject = nil;
      }
    ];
  }
  @catch (NSException *exception) {
    reject(@"ios error atomeRedirectWithUrl", exception.description, nil);
    self.atomeJsReject = nil;
  }
}

-(BOOL)atomeHandleUniversalLink:(NSString *)url {
  return [TPDAtome handleAtomeUniversalLink:url];
}

@end


@implementation TPDApplePayDelegate

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

#pragma mark - TPDApplePayDelegate
- (void)tpdApplePayDidStartPayment:(TPDApplePay *)applePay {
    
    NSLog(@"=====================================================");
    NSLog(@"Apple Pay On Start");
    NSLog(@"===================================================== \n\n");
}

- (void)tpdApplePay:(TPDApplePay *)applePay didSuccessPayment:(TPDTransactionResult *)result {
    
    NSLog(@"=====================================================");
    NSLog(@"Apple Pay Did Success ==> Amount : %@", [result.amount stringValue]);
    
    // NSLog(@"shippingContact.name : %@ %@", applePay.consumer.shippingContact.name.givenName, applePay.consumer.shippingContact.name.familyName);
    // NSLog(@"shippingContact.emailAddress : %@", applePay.consumer.shippingContact.emailAddress);
    // NSLog(@"shippingContact.phoneNumber : %@", applePay.consumer.shippingContact.phoneNumber.stringValue);
    NSLog(@"===================================================== \n\n");
    
}

- (void)tpdApplePay:(TPDApplePay *)applePay didFailurePayment:(TPDTransactionResult *)result {
    
    NSLog(@"=====================================================");
    NSLog(@"Apple Pay Did Failure ==> Message : %@, ErrorCode : %ld", result.message, (long)result.status);
    NSLog(@"===================================================== \n\n");
  if(self.applePayJsReject != nil ) {
    self.applePayJsReject(
      @"ios error Apple Pay Did Failure",
      result.message,
      nil
    );
    self.applePayJsResolve = nil;
    self.applePayJsReject = nil;
  }
}

- (void)tpdApplePayDidCancelPayment:(TPDApplePay *)applePay {
    
    NSLog(@"=====================================================");
    NSLog(@"Apple Pay Did Cancel");
    NSLog(@"===================================================== \n\n");
  if(self.applePayJsReject != nil ) {
    self.applePayJsReject(
      @"ios error tpdApplePayDidCancelPayment",
      @"Canceled by User",
      nil
    );
    self.applePayJsResolve = nil;
    self.applePayJsReject = nil;
  }
}

- (void)tpdApplePayDidFinishPayment:(TPDApplePay *)applePay {
    
    NSLog(@"=====================================================");
    NSLog(@"Apple Pay Did Finish");
    NSLog(@"===================================================== \n\n");
}

- (void)tpdApplePay:(TPDApplePay *)applePay didSelectShippingMethod:(PKShippingMethod *)shippingMethod {
    
    NSLog(@"=====================================================");
    NSLog(@"======> didSelectShippingMethod: ");
    NSLog(@"Shipping Method.identifier : %@", shippingMethod.identifier);
    NSLog(@"Shipping Method.detail : %@", shippingMethod.detail);
    NSLog(@"===================================================== \n\n");
    
}

- (TPDCart *)tpdApplePay:(TPDApplePay *)applePay didSelectPaymentMethod:(PKPaymentMethod *)paymentMethod cart:(TPDCart *)cart {
    
    NSLog(@"=====================================================");
    NSLog(@"======> didSelectPaymentMethod: ");
    NSLog(@"===================================================== \n\n");
    
    if (paymentMethod.type == PKPaymentMethodTypeDebit) {
        [self.tpdCart addPaymentItem:[TPDPaymentItem paymentItemWithItemName:@"Discount"
                                                               withAmount:[NSDecimalNumber decimalNumberWithString:@"-1.00"]]];
    }
    
    return self.tpdCart;
}

- (BOOL)tpdApplePay:(TPDApplePay *)applePay canAuthorizePaymentWithShippingContact:(PKContact *)shippingContact {
    
    NSLog(@"=====================================================");
    NSLog(@"======> canAuthorizePaymentWithShippingContact ");
    NSLog(@"shippingContact.name : %@ %@", shippingContact.name.givenName, shippingContact.name.familyName);
    NSLog(@"shippingContact.emailAddress : %@", shippingContact.emailAddress);
    NSLog(@"shippingContact.phoneNumber : %@", shippingContact.phoneNumber.stringValue);
    NSLog(@"===================================================== \n\n");
    return YES;
}

// With Payment Handle

- (void)tpdApplePay:(TPDApplePay *)applePay didReceivePrime:(NSString *)prime withExpiryMillis:(long)expiryMillis withCardInfo:(TPDCardInfo *)cardInfo withMerchantReferenceInfo:(NSDictionary *)merchantReferenceInfo {

    // 1. Send Your 'Prime' To Your Server, And Handle Payment With Result
    // ...
    NSLog(@"=====================================================");
    NSLog(@"======> didReceivePrime ");
    NSLog(@"Prime : %@", prime);
    NSLog(@"Expiry millis : %ld",expiryMillis);
    NSLog(@"merchantReferenceInfo : %@", merchantReferenceInfo);
    NSLog(@"totalAmount : %@",applePay.cart.totalAmount);
    NSLog(@"Client  IP : %@",applePay.consumer.clientIP);
    // NSLog(@"shippingContact.name : %@ %@", applePay.consumer.shippingContact.name.givenName, applePay.consumer.shippingContact.name.familyName);
    // NSLog(@"shippingContact.emailAddress : %@", applePay.consumer.shippingContact.emailAddress);
    // NSLog(@"shippingContact.phoneNumber : %@", applePay.consumer.shippingContact.phoneNumber.stringValue);

    PKPaymentMethod * paymentMethod = self.tpdConsumer.paymentMethod;

    NSLog(@"tpye : %ld", paymentMethod.type);
    NSLog(@"Network : %@", paymentMethod.network);
    NSLog(@"Display Name : %@", paymentMethod.displayName);
    NSLog(@"===================================================== \n\n");


    // dispatch_async(dispatch_get_main_queue(), ^{
    //     NSString *payment = [NSString stringWithFormat:@"Use below cURL to proceed the payment.\ncurl -X POST \\\nhttps://sandbox.tappaysdk.com/tpc/payment/pay-by-prime \\\n-H \'content-type: application/json\' \\\n-H \'x-api-key: partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM\' \\\n-d \'{ \n \"prime\": \"%@\", \"partner_key\": \"partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM\", \"merchant_id\": \"GlobalTesting_CTBC\", \"details\":\"TapPay Test\", \"amount\": %@, \"cardholder\": { \"phone_number\": \"+886923456789\", \"name\": \"Jane Doe\", \"email\": \"Jane@Doe.com\", \"zip_code\": \"12345\", \"address\": \"123 1st Avenue, City, Country\", \"national_id\": \"A123456789\" }, \"remember\": true }\'",prime,applePay.cart.totalAmount];
    //     NSLog(@"%@", payment);
    // });


    // 2. If Payment Success, set paymentReault = YES.
    BOOL paymentReault = YES;
    [applePay showPaymentResult:paymentReault];

    if(self.applePayJsResolve !=nil ) {
      self.applePayJsResolve(@{
        @"systemOS": @"ios",
        @"tappaySDKVersion": self.SDKVersion,
        @"prime": prime,
        @"expiryMillis": [NSString stringWithFormat: @"%ld", expiryMillis],
        @"merchantReferenceInfo": merchantReferenceInfo,
        @"cart": applePay.cart,
        @"consumer": applePay.consumer,
        @"paymentMethod": self.tpdConsumer.paymentMethod
      });
    self.applePayJsResolve = nil;
    self.applePayJsReject = nil;
    }
}

@end
