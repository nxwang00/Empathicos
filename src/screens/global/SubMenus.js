import React, {useState, useEffect} from 'react';
import {Image, ActivityIndicator, useWindowDimensions} from 'react-native';
import {Center, VStack, Pressable, View, ScrollView} from 'native-base';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../utils/util';
import {useUser} from '../../context/User';
import {Layout} from '../../components/Layout';
import {EmpaPlainBtn} from '../../components/EmpaPlainBtn';
import {FormBtn} from '../../components/FormBtn';

export const SubMenus = props => {
  const id = props.route.params.id;
  const title = props.route.params.title;

  const {height, width} = useWindowDimensions();
  const {userData} = useUser();

  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  const screenInfo = {
    title: title,
    subTitle: '',
    header: '2',
    footer: '1',
  };

  useEffect(() => {
    setLoading(true);
    getSubCategoryMenus();
  }, [id]);

  const getSubCategoryMenus = async () => {
    const token = userData.access_token;
    const url = `${baseUrl}/dashboard-subcategory/${id}`;
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
        setMenus(resResult.results);
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

  const onEmpaPlainBtnPress = menu => {
    props.navigation.navigate('content', {menu: JSON.stringify(menu)});
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
          <View zIndex={1} style={{marginTop: height * 0.07}}>
            <ScrollView style={{height: height * 0.6}}>
              <VStack space={4} pb="6">
                {menus.map(menu => (
                  <EmpaPlainBtn
                    title={menu.title}
                    key={menu.id}
                    onBtnPress={() => onEmpaPlainBtnPress(menu)}
                    ht={45}
                    textMT={-9}
                  />
                ))}
              </VStack>
            </ScrollView>
          </View>
        )}
      </Layout>
    </>
  );
};
