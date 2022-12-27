import React, {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {Image, useWindowDimensions, StyleSheet} from 'react-native';
import {
  Center,
  View,
  ScrollView,
  FormControl,
  TextArea,
  Text,
  KeyboardAvoidingView,
} from 'native-base';
import {useGlobal} from '../context/Global';
import {useUser} from '../context/User';
import {Layout} from '../components/Layout';
import {FormBtn} from '../components/FormBtn';
import {FormInput} from '../components/FormInput';
import {baseUrl} from '../utils/util';

export const Login = () => {
  const {height, width} = useWindowDimensions();

  const global = useGlobal();
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [PasswordErr, setPasswordErr] = useState('');

  useEffect(() => {
    const screenInfo = {
      title: 'Empathicos',
      subTitle: '',
      name: 'login',
    };
    global.onScreen(screenInfo);
  }, []);

  const onLogin = async () => {
    if (!email) {
      setEmailErr('Email is required.');
      return;
    } else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (mailformat.test(email) === false) {
        setEmailErr('Email is incorrect.');
        return;
      }
    }

    if (!password) {
      setPasswordErr('Password is required.');
      return;
    }

    const url = `${baseUrl}/auth/signin`;
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    setLoading(true);
    try {
      const result = await fetch(url, options);
      const resResult = await result.json();
      setLoading(false);
      if (!resResult.status) {
        Toast.show({
          type: 'error',
          text1: resResult.message,
        });
      } else {
        user.onUser(resResult.results);
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Network not working',
      });
    }
  };

  const onEmailChanged = txt => {
    setEmailErr('');
    setEmail(txt);
  };

  const onPasswordChanged = txt => {
    setPasswordErr('');
    setPassword(txt);
  };

  return (
    <>
      <Layout>
        <KeyboardAvoidingView
          w={width * 0.9}
          h={height * 0.53}
          ml="6"
          mt="10"
          bg="primary.600"
          borderColor="amber.300"
          borderWidth="2"
          borderRadius="md"
          zIndex={1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView px="6" pt="2">
            <Center>
              <Text
                color="light.50"
                fontFamily="CenturyGothic"
                fontWeight="700"
                fontSize="2xl"
                textAlign="center">
                Login
              </Text>
              <FormInput
                mt="2"
                label="Email"
                isRequired={true}
                errMsg={emailErr}
                value={email}
                onChange={txt => onEmailChanged(txt)}
              />
              <FormInput
                mt="4"
                label="Password"
                isRequired={true}
                errMsg={PasswordErr}
                value={password}
                onChange={txt => onPasswordChanged(txt)}
              />
              <View mt="8">
                <FormBtn
                  title="Login"
                  onBtnPress={() => onLogin()}
                  loading={loading}
                />
              </View>
              <View mt="3">
                <Text
                  color="pink.700"
                  fontFamily="CenturyGothic"
                  fontSize="lg"
                  fontWeight="bold">
                  Register
                </Text>
              </View>
            </Center>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};
