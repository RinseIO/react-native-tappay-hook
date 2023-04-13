import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle
} from 'react-native';

import { useTPDGooglePay } from '../hooks';

import gpayBtnIcon from '../images/gpay_btn.png';
import gpayDisabledBtnIcon from '../images/gpay_disabled_btn.png';

interface Props {
  merchantName: string;
  disabledOnPress?: Function;
  disabledStyle?: ViewStyle;
  imagesProps?: {
    disabledStyle?: ImageStyle;
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

export function GPayBtn(props: Props) {
  const {
    merchantName,
    disabledOnPress,
    imagesProps = {},
    ...ortherProps
  } = props;
  const [googlePayIsReady] = useTPDGooglePay(merchantName);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];
  let activeOpacity;
  let disabled = googlePayIsReady === false;
  let onPress = ortherProps.onPress;

  if (googlePayIsReady === false) {
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

  if (typeof disabledOnPress === 'function' && googlePayIsReady === false) {
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
        source={googlePayIsReady === false ? gpayDisabledBtnIcon : gpayBtnIcon}
      />
    </TouchableOpacity>
  );
}
