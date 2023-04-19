import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform
} from 'react-native';

import { Tappay } from 'react-native-tappay-hook';

import {
  getDirectPayPrime,
  getGooglePayPrime,
  getApplePayPrime,
  getLinePayPrime,
  getSamsungPayPrime,
  getJkoPayPrime,
  getEasyWalletPrime,
  getPiWalletPrime,
  getPlusPayPrime,
  getAtomePrime,
  easyWalletRedirectWithUrl,
  jkoPayRedirectWithUrl
} from 'react-native-tappay-hook/fp';

import { useSetDirectPayTPDCard } from 'react-native-tappay-hook/hooks';

import {
  DirectPayCardIcon,
  GPayBtn,
  ApplePayBtn,
  LinePayBtn,
  SPayBtn,
  JkoPayBtn,
  EasyWalletBtn,
  PiWalletBtn,
  PlusPayBtn,
  AtomeBtn
} from 'react-native-tappay-hook/components';

import request from '@utils/request';

import styles from '@containers/TappayScreen/style';

export function TappayScreen({ setPopUpMessage, setLoading }: any) {
  const [cardNumber, setCardNumber] = useState('6224314183841750');
  const [dueMonth, setDueMonth] = useState('10');
  const [dueYear, setDueYear] = useState('27');
  const [ccv, setCcv] = useState('048');
  const [directPayAmount, setDirectPayAmount] = useState('1');
  const [googlePayAmount, setGooglePayAmount] = useState('1');
  const [appleAmount, setApplePayAmount] = useState('1');
  const [linePayAmount, setLinePayAmount] = useState('1');
  const [samsungPayItemTotalAmount, setSamsungPayItemTotalAmount] =
    useState('1');
  const [samsungPayShippingPrice, setSamsungPayShippingPrice] = useState('0');
  const [samsungPayTax, setSamsungPayTax] = useState('0');
  const [samsungPayTotalAmount, setSamsungPayTotalAmount] = useState('1');
  const [jkoPayAmount, setJkoPayAmount] = useState('1');
  const [easyWalleAmount, setEasyWalleAmount] = useState('1');
  const [piWalleAmount, setPiWalleAmount] = useState('1');
  const [plusPayAmount, setPlusPayAmount] = useState('1');
  const [atomeAmount, setAtomeAmount] = useState('1');

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
        await Tappay.samsungPayTest(
          'TapPay Samsung Pay Demo',
          'tech.cherri.samsungpayexample',
          'TWD',
          'your samsung pay service id'
        );
        // await Tappay.jkoPayTest('jkoexample://jko.uri:8888/test');
        // await Tappay.easyWalletTest('https://google.com.tw');
        // await Tappay.piWalletTest('https://google.com.tw');
        // await Tappay.plusPayTest('tpdirectexamplepluspay://tech.cherri/myaccount/detail');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { isValid: directPayIsValid } = useSetDirectPayTPDCard(
    cardNumber,
    dueMonth,
    dueYear,
    ccv
  );

  async function handlerDirectPay() {
    setLoading(true);
    try {
      const result = await getDirectPayPrime();
      console.log({ ...result, directPayAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay DirectPay Test',
          amount: directPayAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: '直接付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log(error);
      console.log({ ...error });
      setPopUpMessage({
        label: '直接付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerGooglePay() {
    setLoading(true);
    try {
      const result = await getGooglePayPrime(googlePayAmount, 'TWD');
      console.log({ ...result, googlePayAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay GooglePay Test',
          amount: googlePayAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: 'GooglePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      if (error.message === 'canceled') {
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
    setLoading(false);
  }

  async function handlerApplePay() {
    setLoading(true);
    try {
      const result = await getApplePayPrime(appleAmount);
      console.log({ ...result, appleAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay ApplePay Test',
          amount: appleAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: 'ApplePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      if (error.message === 'canceled') {
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
    setLoading(false);
  }

  async function handlerLinePay() {
    setLoading(true);
    try {
      const result = await getLinePayPrime();
      console.log({ ...result, linePayAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay LinePay Test',
          amount: linePayAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: 'LinePay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: 'LinePay付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerSamsungPay() {
    setLoading(true);
    try {
      const result = await getSamsungPayPrime(
        samsungPayItemTotalAmount,
        samsungPayShippingPrice,
        samsungPayTax,
        samsungPayTotalAmount
      );
      console.log({ ...result, samsungPayItemTotalAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay SamsungPay Test',
          amount: samsungPayItemTotalAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: 'SamsungPay付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: 'SamsungPay付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerJkoPay() {
    setLoading(true);
    try {
      const result = await getJkoPayPrime();
      console.log({ ...result, jkoPayAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_JKOPAY',
          details: 'TapPay JkoPay Test',
          amount: jkoPayAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          },
          result_url: {
            frontend_redirect_url: `https://resume-web-orpin.vercel.app/api/open-app-test/${Platform.OS}`,
            backend_notify_url:
              'https://resume-web-orpin.vercel.app/api/tappay/backend_notify'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      await jkoPayRedirectWithUrl(payByPrime.payment_url);
      setPopUpMessage({
        label: '街口支付付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: '街口支付付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerEasyWallet() {
    setLoading(true);
    try {
      const result = await getEasyWalletPrime();
      console.log({ ...result, easyWalleAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_EASY_WALLET',
          details: 'TapPay EasyWallet Test',
          amount: easyWalleAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          },
          result_url: {
            frontend_redirect_url: `https://resume-web-orpin.vercel.app/api/open-app-test/${Platform.OS}`,
            backend_notify_url: 'https://resume-web-orpin.vercel.app/api/tappay/backend_notify'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      await easyWalletRedirectWithUrl(payByPrime.payment_url);
      setPopUpMessage({
        label: '悠遊支付付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: '悠遊支付付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerPiWallet() {
    setLoading(true);
    try {
      const result = await getPiWalletPrime();
      console.log({ ...result, piWalleAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay PiWallet Test',
          amount: piWalleAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: 'Pi錢包付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: 'Pi錢包付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerPlusPay() {
    setLoading(true);
    try {
      const result = await getPlusPayPrime();
      console.log({ ...result, plusPayAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay PlusPay Test',
          amount: plusPayAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: '全盈+PAY付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: '全盈+PAY付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
  }

  async function handlerAtomePay() {
    setLoading(true);
    try {
      const result = await getAtomePrime();
      console.log({ ...result, atomeAmount });
      const payByPrime = await request.post(
        'https://resume-web-orpin.vercel.app/api/tappay/pay_by_prime',
        {
          prime: result.prime,
          partner_key:
            'partner_NCfF30iGuLP4G74nyycZNWykVpt7fqKVDG7qfPdBGbxJUwDKQeDFoH3o',
          merchant_id: 'tappayTest_CTBC_Union_Pay',
          details: 'TapPay AtomePay Test',
          amount: atomeAmount,
          cardholder: {
            phone_number: '+886923456789',
            name: '王小明',
            email: 'LittleMing@Wang.com',
            zip_code: '100',
            address: '台北市天龍區芝麻街1號1樓',
            national_id: 'A123456789'
          }
        },
        null,
        false
      );
      console.log(payByPrime);
      setPopUpMessage({
        label: 'Atome付款成功(測試)',
        type: 'success'
      });
    } catch (error: any) {
      console.log({ ...error });
      setPopUpMessage({
        label: 'Atome付款失敗(測試)',
        type: 'error'
      });
    }
    setLoading(false);
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
        <View style={styles.row}>
          <Text style={styles.label}>直接付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={directPayAmount}
            onChange={({ nativeEvent }) => setDirectPayAmount(nativeEvent.text)}
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
        <GPayBtn
          merchantName="TW_CTBCT"
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
        <ApplePayBtn
          merchantName="TW_CTBCT"
          merchantId="tappayTest_CTBC_Union_Pay"
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
          merchantName="TW_CTBCT"
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
          jkoPayUniversalLinks={`https://resume-web-orpin.vercel.app/api/open-app-test/${Platform.OS}`}
          style={styles.JkoPayBtnStyle}
          disabledStyle={styles.JkoPayBtnDisabledStyle}
          onPress={handlerJkoPay}
        />

        <View style={styles.row}>
          <Text style={styles.label}>悠遊支付付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={easyWalleAmount}
            onChange={({ nativeEvent }) => setEasyWalleAmount(nativeEvent.text)}
          />
        </View>
        <EasyWalletBtn
          easyWalletUniversalLinks={`https://resume-web-orpin.vercel.app/api/open-app-test/${Platform.OS}`}
          style={styles.EasyWalleBtnStyle}
          disabledStyle={styles.EasyWalleBtnDisabledStyle}
          onPress={handlerEasyWallet}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Pi錢包付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={piWalleAmount}
            onChange={({ nativeEvent }) => setPiWalleAmount(nativeEvent.text)}
          />
        </View>
        <PiWalletBtn
          piWalletUniversalLinks="https://google.com.tw"
          style={styles.PiWalleBtnStyle}
          disabledStyle={styles.PiWalleBtnDisabledStyle}
          onPress={handlerPiWallet}
          disabledOnPress={() =>
            setPopUpMessage({
              label: '無法使用Pi錢包，請檢查設定',
              type: 'info'
            })
          }
        />

        <View style={styles.row}>
          <Text style={styles.label}>全盈+PAY付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={plusPayAmount}
            onChange={({ nativeEvent }) => setPlusPayAmount(nativeEvent.text)}
          />
        </View>
        <PlusPayBtn
          plusPayUniversalLinks="tpdirectexamplepluspay://tech.cherri/myaccount/detail"
          style={styles.PlusPayBtnStyle}
          disabledStyle={styles.PlusPayBtnDisabledStyle}
          onPress={handlerPlusPay}
          // disabledOnPress={() =>
          //   setPopUpMessage({
          //     label: '無法使用全盈+PAY，請檢查設定',
          //     type: 'info'
          //   })
          // }
        />

        <View style={styles.row}>
          <Text style={styles.label}>Atome 付款金額:</Text>
          <TextInput
            style={styles.inputBox}
            value={atomeAmount}
            onChange={({ nativeEvent }) => setAtomeAmount(nativeEvent.text)}
          />
        </View>
        <AtomeBtn
          atomeUniversalLinks="https://google.com.tw"
          style={styles.AtomeBtnStyle}
          disabledStyle={styles.AtomeBtnDisabledStyle}
          onPress={handlerAtomePay}
          // disabledOnPress={() =>
          //   setPopUpMessage({
          //     label: '無法使用Atome，請檢查設定',
          //     type: 'info'
          //   })
          // }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default TappayScreen;
