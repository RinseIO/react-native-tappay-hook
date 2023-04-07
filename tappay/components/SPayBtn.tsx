import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useTPDSamsungPay } from '../hooks';

import spayBtnIcon from '../images/spay_btn.png';

interface Props {
  merchantName: string;
  merchantId: string;
  currencyCode: string;
  serviceId: string;
  disabledOnPress?: Function;
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
    backgroundColor: '#c3c3c3'
  },
  icon: {
    width: '100%',
    height: '100%'
  }
});

export function SPayBtn(props: Props) {
  const {
    merchantName,
    merchantId,
    currencyCode,
    serviceId,
    disabledOnPress,
    imagesProps = {},
    ...ortherProps
  } = props;
  const [samsungPayIsReady] = useTPDSamsungPay(
    merchantName,
    merchantId,
    currencyCode,
    serviceId
  );

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];
  let activeOpacity;
  let disabled = samsungPayIsReady === false;
  let onPress = ortherProps.onPress;


  if (samsungPayIsReady === false) {
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

  if (typeof disabledOnPress === 'function' && samsungPayIsReady === false) {
    activeOpacity = 1;
    onPress = disabledOnPress;
    disabled = false;
  }

  return (
    <TouchableOpacity
      {...ortherProps}
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <Image
        {...imagesProps}
        style={iconStyle}
        resizeMode="contain"
        source={spayBtnIcon}
      />
    </TouchableOpacity>
  );
}
