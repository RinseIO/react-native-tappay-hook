
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTappayHookSpec.h"

@interface TappayHook : NSObject <NativeTappayHookSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TappayHook : NSObject <RCTBridgeModule>
#endif

#import "TappayManager.h"
@property () TappayManager *TappayManager;

@end
