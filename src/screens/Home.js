import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {Image, ActivityIndicator} from 'react-native';
import {Center, VStack, Pressable, View} from 'native-base';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../utils/util';
import {useUser} from '../context/User';
import {Layout} from '../components/Layout';
import {EmpaBtn} from '../components/EmpaBtn';
import {FormBtn} from '../components/FormBtn';

export const Home = props => {
  const isFocused = useIsFocused();
  const {userData} = useUser();

  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [btnEnter, setBtnEnter] = useState({});

  const screenInfo = {
    title: 'Empathicos',
    subTitle: 'Discover Your Magic',
    header: '1',
    footer: '0',
  };

  useEffect(() => {
    getHomeMenus();
  }, [isFocused]);

  const getHomeMenus = async () => {
    const token = userData.access_token;
    const url = `${baseUrl}/dashboard-category`;
    var options = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      const result = await fetch(url, options);
      const resResult = await result.json();
      if (!resResult.status) {
        Toast.show({
          type: 'error',
          text1: resResult.message,
        });
      } else {
        const btnMenus = resResult.results.filter(
          menu => menu.is_enter_magic_door === null,
        );
        setMenus(btnMenus);
        const btnMagic = resResult.results.find(
          menu => menu.is_enter_magic_door === 1,
        );
        setBtnEnter(btnMagic);
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Network not working',
      });
    } finally {
      setLoading(false);
    }
  };

  const onEnter = () => {
    props.navigation.navigate('magic_door', {id: btnEnter.id});
  };

  const onEmpaBtnPress = id => {
    const selectedMenuTitle = menus.find(menu => menu.id === id).title;
    if (selectedMenuTitle === 'Soul Vision') {
      props.navigation.navigate('soul_vision', {
        id: id,
      });
    } else if (selectedMenuTitle === 'Personal Message') {
      props.navigation.navigate('content_personal_message');
    } else {
      props.navigation.navigate('sub_menus', {
        id: id,
        title: selectedMenuTitle,
      });
    }
  };

  return (
    <>
      <Layout screenInfo={screenInfo}>
        {loading ? (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{marginTop: '50%'}}
          />
        ) : (
          <View mt="9" zIndex={1}>
            <VStack space={4} pb="5">
              {menus.map(menu => (
                <EmpaBtn
                  title={menu.title}
                  key={menu.id}
                  info={menu.description}
                  onBtnPress={() => onEmpaBtnPress(menu.id)}
                  ht={35}
                  textMT={-8}
                  iconMT={-22}
                />
              ))}
            </VStack>
            <Center>
              <Image
                source={require('../assets/imgs/image_doorway.png')}
                style={{width: 200, height: 140, resizeMode: 'stretch'}}
              />
              <FormBtn title={btnEnter.title} onBtnPress={onEnter} />
            </Center>
          </View>
        )}
      </Layout>
    </>
  );
};
