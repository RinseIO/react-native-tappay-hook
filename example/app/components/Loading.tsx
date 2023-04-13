import {
  View,
  ActivityIndicator,
  ViewStyle,
  useWindowDimensions
} from 'react-native';

interface Props {
  loading: boolean;
  backgroundColor: string;
}

export const loadingBackground: ViewStyle = {
  position: 'absolute',
  zIndex: 10,
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

const Loading = (props: Props) => {
  const { loading, backgroundColor } = props;
  const { height, width } = useWindowDimensions();

  if (loading === false) {
    return null;
  }

  return (
    <View
      style={[
        loadingBackground,
        {
          backgroundColor,
          height,
          width
        }
      ]}
    >
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

Loading.defaultProps = {
  loading: false,
  backgroundColor: ''
};

export default Loading;
