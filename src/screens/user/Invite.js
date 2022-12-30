import React, {useState, useEffect} from 'react';
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
import {Layout} from '../../components/Layout';
import {FormBtn} from '../../components/FormBtn';
import {FormInput} from '../../components/FormInput';

export const Invite = () => {
  const {height, width} = useWindowDimensions();

  const screenInfo = {
    title: 'Invite Friends',
    subTitle: '',
    header: '1',
    footer: '0',
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onInviteSend = () => {};

  return (
    <>
      <Layout screenInfo={screenInfo}>
        <KeyboardAvoidingView
          w={width * 0.9}
          h={height * 0.53}
          ml="6"
          mt="8"
          bg="primary.600"
          borderColor="amber.300"
          borderWidth="2"
          borderRadius="md"
          zIndex={1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView px="6" pt="2">
            <Center>
              <Text
                fontSize="md"
                color="light.50"
                fontFamily="CenturyGothic"
                fontWeight="700"
                textAlign="center">
                We love you! Thank you for sharing the empathicos magic with
                your friends and loved-ones!
              </Text>
              <FormInput mt="0" label="Name" />
              <FormInput mt="2" label="Email" />
              <FormControl mt="2">
                <Text color="light.50" fontFamily="CenturyGothic" fontSize="md">
                  Message
                </Text>
                <TextArea
                  focusOutlineColor="light.50"
                  numberOfLines={4}
                  _focus={{color: 'white'}}
                />
              </FormControl>
              <View my="4">
                <FormBtn title="Send" onBtnPress={onInviteSend} />
              </View>
            </Center>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};
