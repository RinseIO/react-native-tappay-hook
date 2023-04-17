import { useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { TappayScreen } from '@containers';

import { tappayInit } from 'react-native-tappay-hook';

import PopUpMessage from '@components/PopUpMessage';
import Loading from '@components/Loading';

tappayInit(
  128088,
  'app_eE7hYsgDdXRhgI4LmizvETwCt49EV8WvVcKXBBSLa2I0Yhv5kS84UD057Xjx',
  false
);

function App(): JSX.Element {
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  function messageTextReset() {
    setMessageType('');
    setMessageText('');
  }

  function setPopUpMessage({ label = '', type = 'info' } = {}) {
    setMessageType(type);
    setMessageText(label);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TappayScreen setPopUpMessage={setPopUpMessage} setLoading={setLoading} />
      <PopUpMessage
        messageText={messageText}
        type={messageType}
        messageTextReset={messageTextReset}
      />
      <Loading loading={loading} />
    </SafeAreaView>
  );
}

export default App;
