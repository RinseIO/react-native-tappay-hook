import { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  Platform,
  View,
  StyleSheet,
  useWindowDimensions
} from 'react-native';

import { useKeyboard } from '@hooks/useKeyboard';

const color: { [key: string]: any } = {
  primary: {
    main: 'rgba(252,186,3,1)'
  },
  secondary: {
    main: 'rgba(255,110,23,1)'
  },
  inherit: {
    main: '#406E9F'
  },
  disabled: {
    main: '#b3b3b3'
  },
  info: {
    iconColor: '#0288d1',
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    fontColor: '#4c4646'
  },
  warning: {
    main: '#ee5858',
    iconColor: '#ed6c02',
    backgroundColor: '#fffbe6',
    borderColor: '#ffe58f',
    fontColor: '#4c4646'
  },
  success: {
    iconColor: '#2e7d32',
    backgroundColor: '#f6ffed',
    borderColor: '#b7eb8f',
    fontColor: '#4c4646'
  },
  error: {
    iconColor: '#d32f2f',
    backgroundColor: '#fff2f0',
    borderColor: '#ffccc7',
    fontColor: '#4c4646'
  },
  console: {
    request: '\x1b[33m%s\x1b[0m',
    error: '\x1b[31m%s\x1b[0m',
    track: '\x1b[32m'
  }
};

const style = StyleSheet.create({
  popUpMessageStyle: {
    position: 'absolute',
    zIndex: 999999,
    bottom: -100,
    // bottom: 100,
    // width: deivceWidth,
    minHeight: 40
  },
  messageBackground: {
    width: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    flexDirection: 'row'
  },
  messageBlock: {
    // minWidth: deivceWidth * 0.4,
    maxWidth: '100%',
    minHeight: '100%',
    padding: 5,
    paddingLeft: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#e6f4ff',
    borderColor: '#91caff',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  message: {
    // flex: 1,
    // maxWidth: deivceWidth - 30,
    fontSize: 18,
    lineHeight: 20,
    paddingLeft: 5
  }
});

const MESSAGE_TIMEOUT_ID_LIST: any = {};

const PopUpMessage = (props: {
  messageText?: string | JSX.Element;
  messageTextReset?: Function;
  type?: string;
}) => {
  const {
    messageText: propsMessageText = '',
    messageTextReset = () => {},
    type: propsType = 'info'
  } = props;

  const [messageList, setMessageList] = useState<Array<any>>([]);
  const [removeMessageTimeId, setRremoveMessageTimeId] = useState<any>(-1);

  const { width } = useWindowDimensions();

  const keyboardHeight = useKeyboard(0, -30, Platform.OS === 'ios');

  useEffect(() => {
    if (propsMessageText !== '') {
      setMessageList([
        ...messageList,
        {
          label: propsMessageText,
          type: propsType,
          openAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
          closeAnimation: new Animated.Value(1),
          timeId: Date.now(),
          finished: false
        }
      ]);
      messageTextReset();
    }
  }, [propsMessageText]);
  useEffect(() => {
    if (messageList.length > 4) {
      setMessageList(
        messageList.filter((message: any, key: number) => {
          if (key !== 0) {
            return true;
          }

          if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
            clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timeId]);
            MESSAGE_TIMEOUT_ID_LIST[message.timeId] = undefined;
          }
          return false;
        })
      );
    } else {
      messageList.forEach((message: any, key: number) => {
        if (message.openAnimation) {
          Animated.timing(message.openAnimation, {
            toValue: { x: 0, y: 0 - (keyboardHeight + 180 + key * 50) },
            duration: 150,
            useNativeDriver: true
          }).start();

          if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
            clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timeId]);
          }
          MESSAGE_TIMEOUT_ID_LIST[message.timeId] = setTimeout(() => {
            if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
              setRremoveMessageTimeId(message.timeId);
            }
          }, (key + 1) * 2000);
        }
      });
    }
  }, [messageList, keyboardHeight]);

  useEffect(() => {
    if (removeMessageTimeId > -1) {
      handleClose(removeMessageTimeId);
    }
  }, [removeMessageTimeId]);

  function handleClose(removeTimeId: any) {
    const message = messageList.find(
      _message => _message.timeId === removeTimeId
    );
    if (message === undefined) {
      return;
    }

    if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
      clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timeId]);
      MESSAGE_TIMEOUT_ID_LIST[message.timeId] = undefined;
    }

    if (message.closeAnimation) {
      Animated.timing(message.closeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished === true) {
          setMessageList(
            messageList.filter(
              (_message: any) => _message.timeId !== removeTimeId
            )
          );
        }
      });
    }
  }

  return (
    <>
      {messageList.map((message: any, key: number) => {
        return (
          <Animated.View
            key={key}
            style={[
              style.popUpMessageStyle,
              {
                transform: [{ translateY: message.openAnimation.y }],
                opacity: message.closeAnimation,
                width
              }
            ]}
          >
            <TouchableOpacity
              style={style.messageBackground}
              onPress={() => handleClose(message.timeId)}
            >
              <View
                style={[
                  style.messageBlock,
                  {
                    backgroundColor: color[message.type].backgroundColor,
                    borderColor: color[message.type].borderColor,
                    minWidth: width * 0.4
                  }
                ]}
              >
                {typeof message.label === 'string' ? (
                  <Text
                    allowFontScaling={false}
                    style={[
                      style.message,
                      {
                        color: color[message.type].fontColor,
                        maxWidth: width - 30
                      }
                    ]}
                  >
                    {message.label || ''}
                  </Text>
                ) : (
                  message.label
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </>
  );
};

// export default observer(PopUpMessage);
export default PopUpMessage;
