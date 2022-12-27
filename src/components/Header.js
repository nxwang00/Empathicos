import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet, View, Image, useWindowDimensions} from 'react-native';
import {
  HStack,
  VStack,
  Pressable,
  HamburgerIcon,
  Text,
  Menu,
  Icon,
  Divider,
} from 'native-base';
import Toast from 'react-native-toast-message';
import {useGlobal} from '../context/Global';
import {useUser} from '../context/User';
import {AvatarMenuItem} from './AvatarMenuItem';
import {baseUrl} from '../utils/util';

export const Header = () => {
  const navigation = useNavigation();
  const {globalData} = useGlobal();
  const {userData, onLogout} = useUser();
  const {height, width} = useWindowDimensions();

  const [loading, setLoading] = useState(false);

  const onProfileMenuPress = () => {
    navigation.navigate('profile');
  };

  const onInviteMenuPress = () => {
    navigation.navigate('invite');
  };

  const onJourneysMenuPress = () => {
    navigation.navigate('journey');
  };

  const onLogoutPress = async () => {
    const token = userData.access_token;

    const url = `${baseUrl}/auth/signout`;
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      setLoading(true);
      const result = await fetch(url, options);
      const resResult = await result.json();
      console.log(resResult);
      setLoading(false);
      if (!resResult.status) {
        Toast.show({
          type: 'error',
          text1: resResult.message,
        });
      } else {
        onLogout();
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Network not working',
      });
    }
  };

  const justifyContentStyle =
    globalData?.name !== 'login' && globalData?.name !== 'register'
      ? 'space-between'
      : 'center';

  return (
    <View>
      <Image
        source={require('../assets/imgs/header_bg.png')}
        style={[styles.headerBg(width, height)]}
      />
      <HStack justifyContent={justifyContentStyle} alignItems="center" px="3">
        {globalData?.name !== 'login' && globalData?.name !== 'register' && (
          <Pressable onPress={() => navigation.openDrawer()}>
            <HamburgerIcon size="7" color="white" />
          </Pressable>
        )}
        <Image
          source={require('../assets/imgs/icon_app.png')}
          style={{width: width * 0.15, height: width * 0.15}}
        />
        {globalData?.name !== 'login' && globalData?.name !== 'register' && (
          <Menu
            trigger={triggerProps => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}>
                  <Image
                    source={require('../assets/imgs/icon_profile.png')}
                    style={{width: width * 0.1, height: width * 0.1}}
                  />
                </Pressable>
              );
            }}
            bg="#98338c"
            borderWidth="2"
            borderColor="amber.300"
            borderRadius="md"
            mt="7">
            <AvatarMenuItem
              title="My Profie"
              icon="account"
              onItemPress={onProfileMenuPress}
            />
            <AvatarMenuItem
              title="Invite Friends"
              icon="account-multiple"
              onItemPress={onInviteMenuPress}
            />
            <AvatarMenuItem
              title="Journeys"
              icon="seal"
              onItemPress={onJourneysMenuPress}
            />
            <AvatarMenuItem
              title="Favorites"
              icon="heart"
              onItemPress={() => console.log('click favorites')}
            />
            <Divider mt="2" w="100%" />
            <AvatarMenuItem
              title="Logout"
              icon="logout"
              onItemPress={onLogoutPress}
            />
          </Menu>
        )}
      </HStack>
      <VStack alignItems="center">
        <Text style={styles.title}>{globalData?.title}</Text>
        <Text style={styles.subtitle}>{globalData?.subTitle}</Text>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontFamily: 'CenturyGothic',
    color: 'white',
    paddingTop: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'CenturyGothic',
    color: 'white',
  },
  headerBg: (width, height) => ({
    position: 'absolute',
    height: Math.round(height * 0.21),
    width: width,
    top: -10,
  }),
});
