import React, {useState, useEffect} from 'react';
import {
  Image,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Center,
  View,
  Text,
  HStack,
  Pressable,
  Icon,
  ScrollView,
} from 'native-base';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../utils/util';
import {useUser} from '../context/User';
import {Layout} from '../components/Layout';
import {FormBtn} from '../components/FormBtn';

export const JourneyDetail = props => {
  const detail = props.route.params.journey;
  const detailObj = JSON.parse(detail);
  console.log(detailObj);

  const screenInfo = {
    title: 'Journey',
    subTitle: '',
    name: 'journey detail',
  };

  const {height, width} = useWindowDimensions();

  const {userData} = useUser();

  const [loading, setLoading] = useState(true);
  const [showStatus, setShowStatus] = useState('thumbnail');

  const onToJourneyPress = () => {};

  const onListViewPress = () => {
    setShowStatus('listview');
  };

  const onThumbnailPress = () => {
    setShowStatus('thumbnail');
  };

  return (
    <>
      <Layout screenInfo={screenInfo}>
        <Center mt="8" zIndex="1">
          <HStack>
            <Pressable onPress={onListViewPress}>
              {showStatus === 'listview' ? (
                <Image
                  source={require('../assets/imgs/btn_listview_press.png')}
                  style={{width: 40, height: 30, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={require('../assets/imgs/btn_listview.png')}
                  style={{width: 40, height: 30, resizeMode: 'contain'}}
                />
              )}
            </Pressable>
            <Pressable onPress={onThumbnailPress}>
              {showStatus === 'thumbnail' ? (
                <Image
                  source={require('../assets/imgs/btn_thumnailview_press.png')}
                  style={{width: 40, height: 30, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={require('../assets/imgs/btn_thumnailview.png')}
                  style={{width: 40, height: 30, resizeMode: 'contain'}}
                />
              )}
            </Pressable>
          </HStack>
          {showStatus === 'thumbnail' ? (
            <>
              <Text
                fontSize="lg"
                color="white"
                fontFamily="CenturyGothic"
                my="3">
                {detailObj.name}
              </Text>
              <View>
                <Image
                  source={require('../assets/imgs/image_slider_border.png')}
                  style={{
                    width: width * 0.55,
                    height: width * 0.45,
                    borderRadius: 15,
                  }}
                />
                <Image
                  source={{
                    uri: detailObj.image,
                  }}
                  style={{
                    width: width * 0.48,
                    height: width * 0.4,
                    position: 'absolute',
                    top: 10,
                    left: 14,
                    borderRadius: 10,
                  }}
                />
              </View>
              <Pressable mt="3" bg="primary.600" p="3" borderRadius="50">
                <Icon
                  as={MaterialCommunityIcons}
                  name="heart-outline"
                  color="white"
                  size={5}
                />
              </Pressable>
            </>
          ) : (
            <Pressable my="6" mx="6">
              <HStack space="3" alignItems="center" w="full">
                <Center
                  bg="black"
                  w="1/4"
                  style={{height: height * 0.13}}
                  p="1">
                  <Image
                    source={{
                      uri: detailObj.image,
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Center>
                <View bg="primary.600" w="3/4">
                  <Text>{detailObj.name}</Text>
                  <View style={{height: height * 0.1}}>
                    <Text>{detailObj.description}</Text>
                  </View>
                </View>
              </HStack>
            </Pressable>
          )}

          <View mt="4">
            <FormBtn
              title="Go to your Journey"
              onBtnPress={() => onToJourneyPress()}
            />
          </View>
        </Center>
      </Layout>
    </>
  );
};
