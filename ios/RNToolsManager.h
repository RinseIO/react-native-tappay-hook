//
//  RNToolsManager.h
//  bbn_yahoo_bid
//
//  Created by Bibian App RD on 2023/1/13.
//

// https://www.jianshu.com/p/6fc3f77e0213
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "TappayManager.h"

@interface RNToolsManager : NSObject <RCTBridgeModule>

@property () TappayManager *TappayManager;

@end
