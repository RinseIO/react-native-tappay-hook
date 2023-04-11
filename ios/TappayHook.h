#ifdef RCT_NEW_ARCH_ENABLED

  #import "RNTappayHookSpec.h"
  #import "TappayManager.h"

  @interface TappayHook : NSObject <NativeTappayHookSpec>

    @property () TappayManager *TappayManager;

  @end

#else

  #import <React/RCTBridgeModule.h>
  #import "TappayManager.h"

  @interface TappayHook : NSObject <RCTBridgeModule>

    @property () TappayManager *TappayManager;

  @end

#endif