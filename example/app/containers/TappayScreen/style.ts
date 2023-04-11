import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

const _inputBox: ViewStyle = {
  minHeight: 40,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999'
};

const buttonStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  minHeight: 40,
  margin: 10,
  padding: 10,
  backgroundColor: 'rgba(252,186,3,1)'
};

const buttonFontStyle: TextStyle = {
  color: '#000'
};

const buttonDisabledStyle: ViewStyle = {
  ...buttonStyle,
  backgroundColor: '#b3b3b3'
};

const buttonDisabledFontStyle: TextStyle = {
  ...buttonFontStyle,
  color: '#fff'
};

export const root: StyleProp<ViewStyle> = {
  flex: 1
};
export const context: StyleProp<ViewStyle> = {
  paddingHorizontal: 10,
  flex: 1
};
export const row: StyleProp<ViewStyle> = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center'
};
export const label: StyleProp<TextStyle> = {
  flex: 1
};
export const inputBox: StyleProp<ViewStyle> = {
  ..._inputBox,
  flex: 1
};
export const cardIcon: StyleProp<ViewStyle> = {
  height: 50,
  width: 55
};

export const PayBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#fff',
  height: 50
};
export const PayBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...PayBtnStyle,
  backgroundColor: '#b3b3b3'
};

export const LinePayBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#00be3b',
  height: 50
};
export const LinePayBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...LinePayBtnStyle,
  backgroundColor: '#c3c3c3'
};

export const SPayBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#fff',
  height: 50
};
export const SPayBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...SPayBtnStyle,
  backgroundColor: '#c3c3c3'
};

export const JkoPayBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#fff',
  height: 50
};
export const JkoPayBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...JkoPayBtnStyle,
  backgroundColor: '#c3c3c3'
};

export const EasyWalleBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#fff',
  height: 50
};
export const EasyWalleBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...EasyWalleBtnStyle,
  backgroundColor: '#c3c3c3'
};

export const PiWalleBtnStyle: StyleProp<ViewStyle> = {
  borderRadius: 10,
  margin: 10,
  padding: 0,
  height: 50
};
export const PiWalleBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...PiWalleBtnStyle
};

export const PlusPayBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#fff',
  height: 50
};
export const PlusPayBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...PlusPayBtnStyle,
  backgroundColor: '#c3c3c3'
};

export const AtomeBtnStyle: StyleProp<ViewStyle> = {
  ...buttonStyle,
  backgroundColor: '#e7f85a',
  height: 50
};
export const AtomeBtnDisabledStyle: StyleProp<ViewStyle> = {
  ...AtomeBtnStyle,
  backgroundColor: '#c3c3c3'
};

export const styles = StyleSheet.create({
  root,
  context,
  row,
  label,
  inputBox,
  buttonStyle,
  buttonFontStyle,
  buttonDisabledStyle,
  buttonDisabledFontStyle,
  cardIcon,
  PayBtnStyle,
  PayBtnDisabledStyle,
  LinePayBtnStyle,
  LinePayBtnDisabledStyle,
  SPayBtnStyle,
  SPayBtnDisabledStyle,
  JkoPayBtnStyle,
  JkoPayBtnDisabledStyle,
  EasyWalleBtnStyle,
  EasyWalleBtnDisabledStyle,
  PiWalleBtnStyle,
  PiWalleBtnDisabledStyle,
  PlusPayBtnStyle,
  PlusPayBtnDisabledStyle,
  AtomeBtnStyle,
  AtomeBtnDisabledStyle
});

export default styles;
