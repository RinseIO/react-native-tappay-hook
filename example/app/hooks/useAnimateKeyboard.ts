import { useEffect, useRef } from 'react';
import { Platform, Keyboard, KeyboardEvent, Animated } from 'react-native';

export function useAnimateKeyboard(
  defaultValue: number = 5,
  duration: number = 70,
  displacement: number = 0,
  useNativeDriver: boolean = false
) {
  const keyboardAnimateHeight = useRef(
    new Animated.Value(defaultValue)
  ).current;

  function onKeyboardDidShow(e: KeyboardEvent) {
    // Remove type here if not using TypeScript
    const keyboardHeight = e.endCoordinates.height - displacement;
    hanlderAnimate(keyboardHeight);
  }

  function onKeyboardDidHide() {
    hanlderAnimate(defaultValue);
  }

  function hanlderAnimate(toValue: number) {
    if (Platform.OS === 'ios') {
      Animated.timing(keyboardAnimateHeight, {
        toValue,
        duration,
        useNativeDriver
      }).start();
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardAnimateHeight;
}
