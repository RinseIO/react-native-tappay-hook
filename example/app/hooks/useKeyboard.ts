import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export function useKeyboard(
  defaultValue: number = 5,
  move: number = 0,
  needReturn: boolean = true
) {
  const [keyboardHeight, setKeyboardHeight] = useState(defaultValue);

  function onKeyboardDidShow(e: KeyboardEvent) {
    // Remove type here if not using TypeScript
    if (needReturn === true) {
      setKeyboardHeight(e.endCoordinates.height + move);
    } else {
      setKeyboardHeight(defaultValue);
    }
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(defaultValue);
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

  return keyboardHeight;
}
