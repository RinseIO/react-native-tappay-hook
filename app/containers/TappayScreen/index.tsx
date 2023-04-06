import { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView
} from 'react-native';

import styles from '@containers/TappayScreen/style';

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
  SPayBtn,
  JkoPayBtn
} from '@tappay/components';

export function TappayScreen({ setPopUpMessage }: any) {
  const [cardNumber, setCardNumber] = useState('3549134477691421');
  const [dueMonth, setDueMonth] = useState('07');
  const [dueYear, setDueYear] = useState('25');
  const [ccv, setCcv] = useState('465');
  const [googlePayAmount, setGooglePayAmount] = useState('1');
  const [appleAmount, setApplePayAmount] = useState('1');
  const [linePayAmount, setLinePayAmount] = useState('1');
  const [samsungPayItemTotalAmount, setSamsungPayItemTotalAmount] =
    useState('1');
  const [samsungPayShippingPrice, setSamsungPayShippingPrice] = useState('0');
  const [samsungPayTax, setSamsungPayTax] = useState('0');
  const [samsungPayTotalAmount, setSamsungPayTotalAmount] = useState('1');
  const [jkoPayAmount, setJkoPayAmount] = useState('1');
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
        // await Tappay.jkoPayTest('jkoexample://jko.uri:8888/test');
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
      const result = await Tappay.getDirectPayPrime();
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
      const result = await Tappay.getGooglePayPrime(googlePayAmount, 'TWD');
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
      const result = await Tappay.getApplePayPrime(appleAmount);
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
      console.log({ ...result, linePayAmount });
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
      const result = await Tappay.getSamsungPayPrime(
        samsungPayItemTotalAmount,
        samsungPayShippingPrice,
        samsungPayTax,
        samsungPayTotalAmount
      );
      console.log({ ...result, samsungPayItemTotalAmount });
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

  async function handlerJkoPay() {
    try {
      const result = await Tappay.getJkoPayPrime();
      console.log({ ...result, jkoPayAmount });
      setPopUpMessage({
        label: '街口支付付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      if (error.message === 'Canceled by User') {
        setPopUpMessage({
          label: '街口支付付款已取消',
          type: 'warning'
        });
      } else {
        console.log({ ...error });
        setPopUpMessage({
          label: '街口支付付款失敗(測試)',
          type: 'error'
        });
      }
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.context}>
        <View style={styles.row}>
          <Text style={styles.label}>直接付款信用卡卡號:</Text>
          <DirectPayCardIcon style={styles.cardIcon} cardNumber={cardNumber} />
          <TextInput
            style={styles.inputBox}
            value={cardNumber}
            onChange={({ nativeEvent }) => setCardNumber(nativeEvent.text)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>直接付款信用卡過期月份:</Text>
          <TextInput
            style={styles.inputBox}
            value={dueMonth}
            onChange={({ nativeEvent }) => setDueMonth(nativeEvent.text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>直接付款信用卡過期年份:</Text>
          <TextInput
            style={styles.inputBox}
            value={dueYear}
            onChange={({ nativeEvent }) => setDueYear(nativeEvent.text)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>直接付款信用卡檢查碼:</Text>
          <TextInput
            style={styles.inputBox}
            value={ccv}
            onChange={({ nativeEvent }) => setCcv(nativeEvent.text)}
          />
        </View>
        <TouchableOpacity
          style={
            directPayIsValid === false
              ? styles.buttonDisabledStyle
              : styles.buttonStyle
          }
          disabled={directPayIsValid === false}
          onPress={handlerDirectPay}
        >
          <Text
            style={
              directPayIsValid === false
                ? styles.buttonDisabledFontStyle
                : styles.buttonFontStyle
            }
          >
            直接付款測試
          </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Google Pay付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={googlePayAmount}
            onChange={({ nativeEvent }) => setGooglePayAmount(nativeEvent.text)}
          />
        </View>
        {/* <TouchableOpacity
          style={
            googlePayIsReady === false
              ? styles.buttonDisabledStyle
              : styles.buttonStyle
          }
          disabled={googlePayIsReady === false}
          onPress={handlerGooglePay}
        >
          <Text
            style={
              googlePayIsReady === false
                ? styles.buttonDisabledFontStyle
                : styles.buttonFontStyle
            }
          >
            google pay付款測試
          </Text>
        </TouchableOpacity> */}
        <GPayBtn
          merchantName="TEST MERCHANT NAME"
          style={styles.PayBtnStyle}
          disabledStyle={styles.PayBtnDisabledStyle}
          onPress={handlerGooglePay}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Apple Pay付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={appleAmount}
            onChange={({ nativeEvent }) => setApplePayAmount(nativeEvent.text)}
          />
        </View>
        {/* <TouchableOpacity
          style={
            applePayIsReady === false
              ? styles.buttonDisabledStyle
              : styles.buttonStyle
          }
          disabled={applePayIsReady === false}
          onPress={handlerApplePay}
        >
          <Text
            style={
              applePayIsReady === false
                ? styles.buttonDisabledFontStyle
                : styles.buttonFontStyle
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
          style={styles.PayBtnStyle}
          disabledStyle={styles.PayBtnDisabledStyle}
          onPress={handlerApplePay}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Line Pay付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={linePayAmount}
            onChange={({ nativeEvent }) => setLinePayAmount(nativeEvent.text)}
          />
        </View>
        {/* <TouchableOpacity
          style={
            linePayIsReady === false
              ? styles.buttonDisabledStyle
              : styles.buttonStyle
          }
          disabled={linePayIsReady === false}
          onPress={handlerLinePay}
        >
          <Text
            style={
              linePayIsReady === false
                ? styles.buttonDisabledFontStyle
                : styles.buttonFontStyle
            }
          >
            line pay付款測試
          </Text>
        </TouchableOpacity> */}
        <LinePayBtn
          linePayCallbackUri="linepayexample://tech.cherri"
          style={styles.LinePayBtnStyle}
          disabledStyle={styles.LinePayBtnDisabledStyle}
          onPress={handlerLinePay}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Samsung Pay付款品項總金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={samsungPayItemTotalAmount}
            onChange={({ nativeEvent }) => {
              setSamsungPayItemTotalAmount(nativeEvent.text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Samsung Pay付款運費金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={samsungPayShippingPrice}
            onChange={({ nativeEvent }) => {
              setSamsungPayShippingPrice(nativeEvent.text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Samsung Pay付款稅金金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={samsungPayTax}
            onChange={({ nativeEvent }) => setSamsungPayTax(nativeEvent.text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Samsung Pay付款總金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={samsungPayTotalAmount}
            onChange={({ nativeEvent }) =>
              setSamsungPayTotalAmount(nativeEvent.text)
            }
          />
        </View>
        <SPayBtn
          merchantName="TapPay Samsung Pay Demo"
          merchantId="tech.cherri.samsungpayexample"
          currencyCode="TWD"
          serviceId="your samsung pay service id"
          style={styles.SPayBtnStyle}
          disabledStyle={styles.SPayBtnDisabledStyle}
          onPress={handlerSamsungPay}
        />

        <View style={styles.row}>
          <Text style={styles.label}>街口支付付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={jkoPayAmount}
            onChange={({ nativeEvent }) => setJkoPayAmount(nativeEvent.text)}
          />
        </View>
        <JkoPayBtn
          jkoPayUniversalLinks="jkoexample://jko.uri:8888/test"
          style={styles.JkoPayBtnStyle}
          disabledStyle={styles.JkoPayBtnDisabledStyle}
          onPress={handlerJkoPay}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default TappayScreen;
