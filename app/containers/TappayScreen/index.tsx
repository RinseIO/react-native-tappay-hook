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

import {
  Tappay,
  useSetDirectPayTPDCard
  // useTPDGooglePay,
  // useTPDApplePay,
  // useTPDLinePay
} from '@tappay';

import {
  DirectPayCardIcon,
  GPayBtn,
  ApplePayBtn,
  LinePayBtn,
  SPayBtn
} from '@tappay/components';

export function TappayScreen({ setPopUpMessage }: any) {
  const [cardNumber, setCardNumber] = useState('3549134477691421');
  const [dueMonth, setDueMonth] = useState('07');
  const [dueYear, setDueYear] = useState('25');
  const [ccv, setCcv] = useState('465');
  const [googlePayAmount, setGooglePayAmount] = useState('1');
  const [appleAmount, setApplePayAmount] = useState('1');
  const [lineAmount, setLinePayAmount] = useState('1');
  // const [directPayIsValid, setDirectPayIsValid] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // await Tappay.directPayTest();
        // await Tappay.googlePayTest('TEST MERCHANT NAME');
        // await Tappay.applePayTest(
        //   'TEST MERCHANT NAME',
        //   'TEST MERCHANT ID',
        //   'TW',
        //   'TWD'
        // );
        // await Tappay.linePayTest('linepayexample://tech.cherri');
        // await Tappay.samsungTest(
        //   'TapPay Samsung Pay Demo',
        //   'tech.cherri.samsungpayexample',
        //   'TWD',
        //   'your samsung pay service id'
        // );
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  const { isValid: directPayIsValid } = useSetDirectPayTPDCard(
    cardNumber,
    dueMonth,
    dueYear,
    ccv
  );
  // const [googlePayIsReady] = useTPDGooglePay('TEST MERCHANT NAME');
  // const applePayIsReady = useTPDApplePay(
  //   'TEST MERCHANT NAME',
  //   'TEST MERCHANT ID',
  //   'TW',
  //   'TWD'
  // );
  // const linePayIsReady = useTPDLinePay('linepayexample://tech.cherri');

  async function handlerDirectPay() {
    try {
      const result = await Tappay.handlerDirectPay();
      console.log(result);
      setPopUpMessage({
        label: '直接付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: '直接付款失敗(測試)',
        type: 'error'
      });
    }
  }

  async function handlerGooglePay() {
    try {
      const result = await Tappay.handlerGooglePay(googlePayAmount, 'TWD');
      console.log(result);
      setPopUpMessage({
        label: 'GooglePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      if (error.message === 'Canceled by User') {
        setPopUpMessage({
          label: 'GooglePay付款已取消',
          type: 'warning'
        });
      } else {
        setPopUpMessage({
          label: 'GooglePay付款失敗(測試)',
          type: 'error'
        });
      }
    }
  }

  async function handlerApplePay() {
    try {
      const result = await Tappay.handlerApplePay(appleAmount);
      console.log(result);
      setPopUpMessage({
        label: 'ApplePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      if (error.message === 'Canceled by User') {
        setPopUpMessage({
          label: 'ApplePay付款已取消',
          type: 'warning'
        });
      } else {
        console.log({ ...error });
        setPopUpMessage({
          label: 'ApplePay付款失敗(測試)',
          type: 'error'
        });
      }
    }
  }

  async function handlerLinePay() {
    try {
      const result = await Tappay.getLinePayPrime();
      console.log(result);
      setPopUpMessage({
        label: 'LinePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      if (error.message === 'Canceled by User') {
        setPopUpMessage({
          label: 'LinePay付款已取消',
          type: 'warning'
        });
      } else {
        console.log({ ...error });
        setPopUpMessage({
          label: 'LinePay付款失敗(測試)',
          type: 'error'
        });
      }
    }
  }

  async function handlerSamsungPay() {
    try {
      const result = await Tappay.getSamsungPayPrime('1', '0', '0', '1');
      console.log(result);
      setPopUpMessage({
        label: 'SamsungPay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      if (error.message === 'Canceled by User') {
        setPopUpMessage({
          label: 'SamsungPay付款已取消',
          type: 'warning'
        });
      } else {
        console.log({ ...error });
        setPopUpMessage({
          label: 'SamsungPay付款失敗(測試)',
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
          <DirectPayCardIcon style={style.cardIcon} cardNumber={cardNumber} />
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
          <Text style={style.label}>Google Pay付款金額:</Text>
          <TextInput
            style={style.inputBox}
            value={googlePayAmount}
            onChange={({ nativeEvent }) => setGooglePayAmount(nativeEvent.text)}
          />
        </View>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <GPayBtn
          merchantName="TEST MERCHANT NAME"
          style={style.PayBtnStyle}
          disabledStyle={style.PayBtnDisabledStyle}
          onPress={handlerGooglePay}
        />

        <View style={style.row}>
          <Text style={style.label}>Apple Pay付款金額:</Text>
          <TextInput
            style={style.inputBox}
            value={appleAmount}
            onChange={({ nativeEvent }) => setApplePayAmount(nativeEvent.text)}
          />
        </View>
        {/* <TouchableOpacity
          style={
            applePayIsReady === false
              ? style.buttonDisabledStyle
              : style.buttonStyle
          }
          disabled={applePayIsReady === false}
          onPress={handlerApplePay}
        >
          <Text
            style={
              applePayIsReady === false
                ? style.buttonDisabledFontStyle
                : style.buttonFontStyle
            }
          >
            apple pay付款測試
          </Text>
        </TouchableOpacity> */}
        <ApplePayBtn
          merchantName="TEST MERCHANT NAME"
          merchantId="TEST MERCHANT ID"
          countryCode="TW"
          currencyCode="TWD"
          style={style.PayBtnStyle}
          disabledStyle={style.PayBtnDisabledStyle}
          onPress={handlerApplePay}
        />

        <View style={style.row}>
          <Text style={style.label}>Line Pay付款金額:</Text>
          <TextInput
            style={style.inputBox}
            value={lineAmount}
            onChange={({ nativeEvent }) => setLinePayAmount(nativeEvent.text)}
          />
        </View>
        {/* <TouchableOpacity
          style={
            linePayIsReady === false
              ? style.buttonDisabledStyle
              : style.buttonStyle
          }
          disabled={linePayIsReady === false}
          onPress={handlerLinePay}
        >
          <Text
            style={
              linePayIsReady === false
                ? style.buttonDisabledFontStyle
                : style.buttonFontStyle
            }
          >
            line pay付款測試
          </Text>
        </TouchableOpacity> */}
        <LinePayBtn
          linePayCallbackUri="linepayexample://tech.cherri"
          style={style.LinePayBtnStyle}
          disabledStyle={style.LinePayBtnDisabledStyle}
          onPress={handlerLinePay}
        />

        <View style={style.row}>
          <Text style={style.label}>Samsung Pay付款金額:</Text>
          <TextInput
            style={style.inputBox}
            value={lineAmount}
            onChange={({ nativeEvent }) => setLinePayAmount(nativeEvent.text)}
          />
        </View>
        <SPayBtn
          merchantName="TapPay Samsung Pay Demo"
          merchantId="tech.cherri.samsungpayexample"
          currencyCode="TWD"
          serviceId="your samsung pay service id"
          style={style.SPayBtnStyle}
          disabledStyle={style.SPayBtnDisabledStyle}
          onPress={handlerSamsungPay}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default TappayScreen;
