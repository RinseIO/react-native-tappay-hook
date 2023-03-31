import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useTPDApplePay } from '../hooks';

import applePayBtnIcon from '../images/apple_pay_btn.png';
import applePayDisabledBtnIcon from '../images/apple_pay_disabled_btn.png';

interface Props {
  merchantName: string;
  merchantId: string;
  countryCode: string;
  currencyCode: string;
  imagesProps?: {
    [key: string]: any;
  };
  [key: string]: any;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    height: 100
  },
  buttonDisable: {
    backgroundColor: '#b3b3b3'
  },
  icon: {
    width: '100%',
    height: '100%'
  }
});

export function ApplePayBtn(props: Props) {
  const {
    merchantName,
    merchantId,
    countryCode,
    currencyCode,
    imagesProps = {},
    ...ortherProps
  } = props;

  const [applePayIsReady] = useTPDApplePay(
    merchantName,
    merchantId,
    countryCode,
    currencyCode
  );

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];

  if (applePayIsReady === false) {
    buttonStyle.push(styles.buttonDisable);

    if (typeof ortherProps.disabledStyle === 'object') {
      buttonStyle.push(ortherProps.disabledStyle);
    }
    if (typeof imagesProps.disabledStyle === 'object') {
      iconStyle.push(imagesProps.disabledStyle);
    }
  } else {
    if (typeof ortherProps.style === 'object') {
      buttonStyle.push(ortherProps.style);
    }
    if (typeof imagesProps.style === 'object') {
      iconStyle.push(imagesProps.style);
    }
  }
  return (
    <TouchableOpacity
      {...ortherProps}
      style={buttonStyle}
      disabled={applePayIsReady === false}
    >
      <Image
        {...imagesProps}
        style={iconStyle}
        resizeMode="contain"
        source={
          applePayIsReady === false ? applePayDisabledBtnIcon : applePayBtnIcon
        }
      />
    </TouchableOpacity>
  );
}
