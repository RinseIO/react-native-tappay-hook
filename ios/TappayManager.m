//
//  TappayManager.m
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/3/21.
//

#import "TappayManager.h"

@implementation TappayManager

- (void)initInstance:(NSNumber *)APP_ID APP_KEY:(NSString *)APP_KEY prod:(BOOL)prod {
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

- (void)handlerDirectPay:(NSString *)geoLocation resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {

   [[[[TPDCard setWithCardNumber:self.cardNumber withDueMonth:self.dueMonth withDueYear:self.dueYear withCCV:self.CCV]
    onSuccessCallback:^(NSString * _Nullable prime, TPDCardInfo * _Nullable cardInfo, NSString * _Nullable cardIdentifier, NSDictionary *_Nonnull merchantReferenceInfo) {
        //Success
        resolve(@{
          @"systemOS": @"ios",
          @"tappaySDKVersion": self.SDKVersion,
          @"prime": prime,
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
          @"ios error handlerDirectPay onFailure",
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
            stringCardType = @"AMEX";
            break;
        case CardType_UnionPay:
            stringCardType = @"UnionPay";
            break;
        default:
            stringCardType = @"Unknown";
    }
    return stringCardType;
}

- (void)applePayInit:(NSString *)merchantName merchantId:(NSString *)merchantId countryCode:(NSString *)countryCode currencyCode:(NSString *)currencyCode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.TPDmerchant = [TPDMerchant new];
    self.TPDmerchant.merchantName               = merchantName;
    self.TPDmerchant.merchantCapability         = PKMerchantCapability3DS;
    self.TPDmerchant.applePayMerchantIdentifier = merchantId; // Your Apple Pay Merchant ID (https://developer.apple.com/account/ios/identifier/merchant)
    self.TPDmerchant.countryCode                = countryCode;
    self.TPDmerchant.currencyCode               = currencyCode;
    self.TPDmerchant.supportedNetworks          = @[PKPaymentNetworkAmex, PKPaymentNetworkVisa ,PKPaymentNetworkMasterCard];

    // Set Consumer Contact.
    PKContact *contact  = [PKContact new];
    NSPersonNameComponents *name = [NSPersonNameComponents new];
    // name.familyName = @"Cherri";
    // name.givenName  = @"TapPay";
    contact.name = name;
    
    self.TPDconsumer = [TPDConsumer new];
    self.TPDconsumer.billingContact    = contact;
    self.TPDconsumer.shippingContact   = contact;
    // self.TPDconsumer.requiredShippingAddressFields  = PKAddressFieldNone;
    // self.TPDconsumer.requiredBillingAddressFields   = PKAddressFieldNone;

    // self.applePayJsResolve = resolve;
    // self.applePayJsReject = reject;

    TPDApplePayDelegate *_TPDApplePayDelegate = [TPDApplePayDelegate alloc];
    _TPDApplePayDelegate.applePayJsResolve = resolve;
    _TPDApplePayDelegate.applePayJsReject = reject;
    _TPDApplePayDelegate.SDKVersion = self.SDKVersion;
    _TPDApplePayDelegate.TPDconsumer = self.TPDconsumer;

    TPDApplePay *TPDapplePay = [TPDApplePay setupWthMerchant:self.TPDmerchant withConsumer:self.TPDconsumer withCart:[TPDCart new] withDelegate:_TPDApplePayDelegate];
    // TPDApplePay *TPDapplePay = [TPDApplePay setupWthMerchant:self.TPDmerchant withConsumer:self.TPDconsumer withCart:nil withDelegate:_TPDApplePayDelegate];

    resolve(@{
      @"isReadyToPay": @([TPDApplePay canMakePayments]),
    });
  }
  @catch (NSException *exception) {
    reject(@"ios error applePayInit", exception.description, nil);
  }
}

- (BOOL)isApplePayAvailable {
  return [TPDApplePay canMakePayments];
}

- (void)handlerApplePay:(NSString *)amount resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
  @try {
    self.TPDcart = [TPDCart new];
    self.TPDcart.isAmountPending = YES;
    self.TPDcart.isShowTotalAmount = NO;

    TPDPaymentItem *final = [TPDPaymentItem paymentItemWithItemName:@"final" withAmount:[NSDecimalNumber decimalNumberWithString:amount]];
    [self.TPDcart addPaymentItem:final];

    TPDPaymentItem * pending = [TPDPaymentItem pendingPaymentItemWithItemName:@"pending"];
    [self.TPDcart addPaymentItem:pending];

    self.applePayJsResolve = resolve;
    self.applePayJsReject = reject;

    TPDApplePayDelegate *_TPDApplePayDelegate = [TPDApplePayDelegate alloc];
    _TPDApplePayDelegate.applePayJsResolve = resolve;
    _TPDApplePayDelegate.applePayJsReject = reject;
    _TPDApplePayDelegate.SDKVersion = self.SDKVersion;
    _TPDApplePayDelegate.TPDconsumer = self.TPDconsumer;

    // Without Handle Payment
    self.TPDapplePay = [TPDApplePay setupWthMerchant:self.TPDmerchant withConsumer:self.TPDconsumer withCart:self.TPDcart withDelegate:_TPDApplePayDelegate];

    [self.TPDapplePay startPayment];

  }
  @catch (NSException *exception) {
    reject(@"ios error handlerApplePay", exception.description, nil);
  }
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
        [self.TPDcart addPaymentItem:[TPDPaymentItem paymentItemWithItemName:@"Discount"
                                                               withAmount:[NSDecimalNumber decimalNumberWithString:@"-1.00"]]];
    }
    
    return self.TPDcart;
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

    PKPaymentMethod * paymentMethod = self.TPDconsumer.paymentMethod;

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
        @"prime": prime,
        @"systemOS": @"ios",
        @"SDKVersion": self.SDKVersion,
        @"expiryMillis": [NSString stringWithFormat: @"%ld", expiryMillis],
        @"merchantReferenceInfo": merchantReferenceInfo,
        @"cart": applePay.cart,
        @"consumer": applePay.consumer,
        @"paymentMethod": self.TPDconsumer.paymentMethod
      });
    self.applePayJsResolve = nil;
    }
}

@end
