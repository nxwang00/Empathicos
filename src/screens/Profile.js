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
import {useGlobal} from '../context/Global';
import {Layout} from '../components/Layout';
import {FormBtn} from '../components/FormBtn';
import {FormInput} from '../components/FormInput';

export const Profile = () => {
  const {height, width} = useWindowDimensions();

  const global = useGlobal();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch(`${baseUrl}/web/api/language/`)
    //   .then(response => response.json())
    //   .then(json => setLangs(json))
    //   .catch(error => {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Error',
    //       text2: error,
    //     });
    //   })
    //   .finally(() => setLoading(false));

    const screenInfo = {
      title: 'Empathicos',
      subTitle: 'Discover Your Magic',
    };
    global.onScreen(screenInfo);

    setLoading(false);
  }, []);

  const onProfileSave = () => {};

  return (
    <>
      <Layout>
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
              <Image
                source={require('../assets/imgs/icon_profile.png')}
                style={{width: width * 0.2, height: width * 0.2}}
              />
              <FormInput mt="0" label="Name" />
              <FormInput mt="2" label="Email" />
              <FormInput mt="2" label="Birthday" />
              <FormControl mt="2">
                <Text color="light.50" fontFamily="CenturyGothic" fontSize="md">
                  About me
                </Text>
                <TextArea
                  focusOutlineColor="light.50"
                  numberOfLines={4}
                  _focus={{color: 'white'}}
                />
              </FormControl>
              <View my="4">
                <FormBtn title="Save" onBtnPress={onProfileSave} />
              </View>
            </Center>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'CenturyGothic',
    color: '#fff',
  },
});
