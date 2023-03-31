import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { useTPDLinePay } from '../hooks';

import linePayBtnIcon from '../images/LINE_Pay_h.png';

interface Props {
  linePayCallbackUri: string;
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

export function LinePayBtn(props: Props) {
  const { linePayCallbackUri, imagesProps = {}, ...ortherProps } = props;
  const [linePayIsReady] = useTPDLinePay(linePayCallbackUri);

  const buttonStyle: any = [styles.button];
  const iconStyle: any = [styles.icon];

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

  return (
    <TouchableOpacity
      {...ortherProps}
      style={buttonStyle}
      disabled={linePayIsReady === false}
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
