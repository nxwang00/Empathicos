import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {Center, VStack, Pressable, View} from 'native-base';
import {useGlobal} from '../context/Global';
import {Layout} from '../components/Layout';
import {EmpaBtn} from '../components/EmpaBtn';
import {FormBtn} from '../components/FormBtn';

export const Home = () => {
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
      name: 'home',
    };
    global.onScreen(screenInfo);

    setLoading(false);
  }, []);

  const onEnter = () => {
    console.log('click enter');
  };

  return (
    <>
      <Layout>
        <View mt="9" zIndex={1}>
          <VStack space={4} pb="5">
            <EmpaBtn title="soul vision" />
            <EmpaBtn title="inner peace" />
            <EmpaBtn title="personal message" />
            <EmpaBtn title="self-inquiry journal" />
            <EmpaBtn title="mindful living" />
            <EmpaBtn title="meet ana" />
          </VStack>
          <Center>
            <Image
              source={require('../assets/imgs/image_doorway.png')}
              style={{width: 200, height: 140, resizeMode: 'stretch'}}
            />
            <FormBtn title="Enter" onBtnPress={onEnter} />
          </Center>
        </View>
      </Layout>
    </>
  );
};
