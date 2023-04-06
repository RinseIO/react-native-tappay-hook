import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useTPDJkoPay } from '../hooks';

import JkoPayBtnIcon from '../images/JKOPAY_btn.png';

interface Props {
  jkoPayUniversalLinks: string;
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

export function JkoPayBtn(props: Props) {
  const { jkoPayUniversalLinks, imagesProps = {}, ...ortherProps } = props;
  const [jkoPayIsReady] = useTPDJkoPay(jkoPayUniversalLinks);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];

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

  return (
    <TouchableOpacity
      {...ortherProps}
      style={buttonStyle}
      disabled={jkoPayIsReady === false}
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
