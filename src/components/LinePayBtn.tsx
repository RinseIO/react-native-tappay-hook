import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle
} from 'react-native';

import { useTPDLinePay } from '../hooks';

import linePayBtnIcon from '../images/LINE_Pay_h.png';

interface Props {
  linePayCallbackUri: string;
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
    backgroundColor: '#00be3b',
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

export function LinePayBtn(props: Props) {
  const {
    linePayCallbackUri,
    disabledOnPress,
    imagesProps = {},
    ...ortherProps
  } = props;
  const [linePayIsReady] = useTPDLinePay(linePayCallbackUri);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];
  let activeOpacity;
  let disabled = linePayIsReady === false;
  let onPress = ortherProps.onPress;

  if (linePayIsReady === false) {
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

  if (typeof disabledOnPress === 'function' && linePayIsReady === false) {
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
        source={linePayBtnIcon}
      />
    </TouchableOpacity>
  );
}

export default LinePayBtn;
