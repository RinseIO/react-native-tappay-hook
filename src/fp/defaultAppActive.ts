import { AppState } from 'react-native';

export function defaultAppActive(reject: Function, result: any) {
  let appState = AppState.currentState;

  const subscription = AppState.addEventListener('change', nextAppState => {
    console.log({ nextAppState });
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      setTimeout(() => {
        console.log('defaultAppActive subscription');
        if (result === null) {
          reject(new Error('canceled'));
        }
      }, 5000);
    }
    appState = nextAppState;
  });

  return () => subscription.remove();
}

export default defaultAppActive;
