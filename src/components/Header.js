import React, {useState, useEffect} from 'react';
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
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGlobal} from '../context/Global';

export const Header = props => {
  const navigation = useNavigation();
  const {globalData} = useGlobal();
  const {height, width} = useWindowDimensions();

  const onProfileMenuPress = () => {
    navigation.navigate('profile');
  };

  const onInviteMenuPress = () => {
    navigation.navigate('invite');
  };

  const onJourneysMenuPress = () => {
    navigation.navigate('journey');
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
            <Menu.Item alignItems="flex-end" onPress={onProfileMenuPress}>
              <HStack space={2}>
                <Text color="white" style={styles.menu}>
                  My Profie
                </Text>
                <Icon
                  as={MaterialCommunityIcons}
                  name="account"
                  color="white"
                  size={5}
                />
              </HStack>
            </Menu.Item>
            <Menu.Item alignItems="flex-end" onPress={onInviteMenuPress}>
              <HStack space={2}>
                <Text color="white" style={styles.menu}>
                  Invite Friends
                </Text>
                <Icon
                  as={MaterialCommunityIcons}
                  name="account-multiple"
                  color="white"
                  size={5}
                />
              </HStack>
            </Menu.Item>
            <Menu.Item alignItems="flex-end" onPress={onJourneysMenuPress}>
              <HStack space={2}>
                <Text color="white" style={styles.menu}>
                  Journeys
                </Text>
                <Icon
                  as={MaterialCommunityIcons}
                  name="seal"
                  color="white"
                  size={5}
                />
              </HStack>
            </Menu.Item>
            <Menu.Item alignItems="flex-end">
              <HStack space={2}>
                <Text color="white" style={styles.menu}>
                  Favorites
                </Text>
                <Icon
                  as={MaterialCommunityIcons}
                  name="heart"
                  color="white"
                  size={5}
                />
              </HStack>
            </Menu.Item>
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
  menu: {
    fontSize: 18,
    fontFamily: 'CenturyGothic',
  },
  headerBg: (width, height) => ({
    position: 'absolute',
    height: Math.round(height * 0.21),
    width: width,
    top: -10,
  }),
});
