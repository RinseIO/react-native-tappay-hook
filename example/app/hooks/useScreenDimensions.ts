import { useState, useEffect } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

// https://stackoverflow.com/questions/44978804/whats-the-difference-between-window-and-screen-in-the-dimensions-api
const SCREEN = Dimensions.get('screen');

export function useScreenDimensions() {
  const [screenDimensions, setScreenDimensions] = useState(SCREEN);
  const windowDimensions = useWindowDimensions();
  useEffect(() => {
    setScreenDimensions(Dimensions.get('screen'));
  }, [windowDimensions]);
  return [screenDimensions, windowDimensions];
}
