import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle
} from 'react-native';

import { useTPDPiWallet } from '../hooks';

import piWalletBtnIcon from '../images/pi_wallet_btn.png';
import piWalletDisabledBtnIcon from '../images/pi_wallet_disabled_btn.png';

interface Props {
  piWalletUniversalLinks: string;
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
    backgroundColor: '#1da7fc',
    height: 100
  },
  buttonDisable: {
    backgroundColor: '#000'
  },
  icon: {
    width: '100%',
    height: '100%'
  }
});

export function PiWalletBtn(props: Props) {
  const {
    piWalletUniversalLinks,
    disabledOnPress,
    imagesProps = {},
    ...ortherProps
  } = props;
  const [piWalletIsReady] = useTPDPiWallet(piWalletUniversalLinks);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];
  let activeOpacity;
  let disabled = piWalletIsReady === false;
  let onPress = ortherProps.onPress;

  if (piWalletIsReady === false) {
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

  if (typeof disabledOnPress === 'function' && piWalletIsReady === false) {
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
        source={
          piWalletIsReady === false ? piWalletDisabledBtnIcon : piWalletBtnIcon
        }
      />
    </TouchableOpacity>
  );
}

export default PiWalletBtn;
