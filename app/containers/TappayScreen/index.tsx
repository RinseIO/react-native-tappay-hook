import { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView
} from 'react-native';

import style from '@containers/TappayScreen/style';

import Tappay from '@utils/tappay';
import { useSetDirectPayTPDCard, useGooglePay } from '@hooks/tappay';

export function TappayScreen({ setPopUpMessage }: any) {
  const [cardNumber, setCardNumber] = useState('4679270817026199');
  const [dueMonth, setDueMonth] = useState('08');
  const [dueYear, setDueYear] = useState('25');
  const [ccv, setCcv] = useState('081');
  const [googlePayAmount, setGooglePayAmount] = useState('1');

  useEffect(() => {
    (async () => {
      try {
        await Tappay.initPromise;

        // await Tappay.googlePayTest(tappayConfig.merchantName);
        await Tappay.applePayTest('TEST MERCHANT', '', 'TW', 'TWD');
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  const { isValid: directPayIsValid } = useSetDirectPayTPDCard(
    cardNumber,
    dueMonth,
    dueYear,
    ccv
  );
  const [googlePayIsReady] = useGooglePay('TEST MERCHANT');

  async function handlerDirectPay() {
    if (directPayIsValid) {
      try {
        const result = await Tappay.handlerDirectPay();
        console.log(result);
        setPopUpMessage({
          label: '直接付款成功(測試)',
          type: 'success'
        });
      } catch (error) {
        setPopUpMessage({
          label: '直接付款失敗(測試)',
          type: 'error'
        });
      }
    }
  }

  async function handlerGooglePay() {
    try {
      const result = await Tappay.handlerGooglePay(googlePayAmount);
      console.log(result);
      setPopUpMessage({
        label: 'GooglePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      if (error.message === 'Canceled by User') {
        setPopUpMessage({
          label: 'GooglePay付款已取消',
          type: 'warning'
        });
      } else {
        console.log(error);
        setPopUpMessage({
          label: 'GooglePay付款失敗(測試)',
          type: 'error'
        });
      }
    }
  }

  return (
    <SafeAreaView style={style.root}>
      <ScrollView style={style.context}>
        <View style={style.row}>
          <Text style={style.label}>直接付款信用卡卡號:</Text>
          <TextInput
            style={style.inputBox}
            value={cardNumber}
            onChange={({ nativeEvent }) => setCardNumber(nativeEvent.text)}
          />
        </View>
        <View style={style.row}>
          <Text style={style.label}>直接付款信用卡過期月份:</Text>
          <TextInput
            style={style.inputBox}
            value={dueMonth}
            onChange={({ nativeEvent }) => setDueMonth(nativeEvent.text)}
          />
        </View>
        <View style={style.row}>
          <Text style={style.label}>直接付款信用卡過期年份:</Text>
          <TextInput
            style={style.inputBox}
            value={dueYear}
            onChange={({ nativeEvent }) => setDueYear(nativeEvent.text)}
          />
        </View>
        <View style={style.row}>
          <Text style={style.label}>直接付款信用卡檢查碼:</Text>
          <TextInput
            style={style.inputBox}
            value={ccv}
            onChange={({ nativeEvent }) => setCcv(nativeEvent.text)}
          />
        </View>
        <TouchableOpacity
          style={
            directPayIsValid === false
              ? style.buttonDisabledStyle
              : style.buttonStyle
          }
          disabled={directPayIsValid === false}
          onPress={handlerDirectPay}
        >
          <Text
            style={
              directPayIsValid === false
                ? style.buttonDisabledFontStyle
                : style.buttonFontStyle
            }
          >
            直接付款測試
          </Text>
        </TouchableOpacity>
        <View style={style.row}>
          <Text style={style.label}>google pay付款金額:</Text>
          <TextInput
            style={style.inputBox}
            value={googlePayAmount}
            onChange={({ nativeEvent }) => setGooglePayAmount(nativeEvent.text)}
          />
        </View>
        <TouchableOpacity
          style={
            googlePayIsReady === false
              ? style.buttonDisabledStyle
              : style.buttonStyle
          }
          disabled={googlePayIsReady === false}
          onPress={handlerGooglePay}
        >
          <Text
            style={
              googlePayIsReady === false
                ? style.buttonDisabledFontStyle
                : style.buttonFontStyle
            }
          >
            google pay付款測試
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TappayScreen;
