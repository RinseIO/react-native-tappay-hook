import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle
} from 'react-native';

import { useTPDJkoPay } from '../hooks';

import JkoPayBtnIcon from '../images/JKOPAY_btn.png';

interface Props {
  jkoPayUniversalLinks: string;
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
    backgroundColor: '#c3c3c3'
  },
  icon: {
    width: '100%',
    height: '100%'
  }
});

export function JkoPayBtn(props: Props) {
  const {
    jkoPayUniversalLinks,
    disabledOnPress,
    imagesProps = {},
    ...ortherProps
  } = props;
  const [jkoPayIsReady] = useTPDJkoPay(jkoPayUniversalLinks);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];
  let activeOpacity;
  let disabled = jkoPayIsReady === false;
  let onPress = ortherProps.onPress;

  if (jkoPayIsReady === false) {
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

  if (typeof disabledOnPress === 'function' && jkoPayIsReady === false) {
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
        source={JkoPayBtnIcon}
      />
    </TouchableOpacity>
  );
}

export default JkoPayBtn;
