import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useTPDGooglePay } from '../hooks';

import gpayBtnIcon from '../images/gpay_btn.png';
import gpayDisabledBtnIcon from '../images/gpay_disabled_btn.png';

interface Props {
  merchantName: string;
  imagesProps?: {
    [key: string]: any;
  };
  [key: string]: any;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff'
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
  const { imagesProps = {}, merchantName, ...ortherProps } = props;
  const [googlePayIsReady] = useTPDGooglePay(merchantName);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];

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

  return (
    <TouchableOpacity
      {...ortherProps}
      style={buttonStyle}
      disabled={googlePayIsReady === false}
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
