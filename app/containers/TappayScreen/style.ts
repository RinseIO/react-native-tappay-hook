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
  cardIcon
});

export default styles;
