import React, {useState, useEffect} from 'react';
import {StyleSheet, useWindowDimensions, Image} from 'react-native';
import {Center, VStack, Pressable, View} from 'native-base';
// import {useGlobal} from '../context/Global';
import {Layout} from '../components/Layout';
import {EmpaBtn} from '../components/EmpaBtn';

export const Home = props => {
  const {height, width} = useWindowDimensions();

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
    setLoading(false);
  }, []);

  // const onLangBtnClicked = language => {
  //   const langInfo = {
  //     lang: language,
  //   };
  //   global.onLang(langInfo);
  //   props.navigation.navigate('channel');
  // };

  return (
    <>
      <Layout>
        <View pb="12">
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
            <Pressable>
              <Image
                source={require('../assets/imgs/rectangle_enter_btn.png')}
                style={{width: 100, height: 35, resizeMode: 'stretch'}}
              />
            </Pressable>
          </Center>
        </View>
      </Layout>
    </>
  );
};
