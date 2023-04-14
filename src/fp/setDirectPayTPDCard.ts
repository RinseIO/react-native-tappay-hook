import { NativeModules } from 'react-native';

import { getInitPromise } from '../cacheStatus';

export async function setDirectPayTPDCard(
  cardNumber: string,
  dueMonth: string,
  dueYear: string,
  CCV: string
) {
  if (getInitPromise() === null) {
    throw new Error('Tappay has not been initialized!');
  }
  const validationResult = await NativeModules.TappayHook.TappaySetTPDCard(
    cardNumber,
    dueMonth,
    dueYear,
    CCV
  );
  const { isCardNumberValid, isExpiryDateValid, isCCVValid } = validationResult;

  return {
    ...validationResult,
    isValid: isCardNumberValid && isExpiryDateValid && isCCVValid
  };
}

export default setDirectPayTPDCard;
