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

export const Header = props => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();

  return (
    <View>
      <Image
        source={require('../assets/imgs/header_bg.png')}
        style={[styles.headerBg(width, height)]}
      />
      <HStack justifyContent="space-between" alignItems="center" px="3">
        <Pressable onPress={() => navigation.openDrawer()}>
          <HamburgerIcon size="7" color="white" />
        </Pressable>
        <Image
          source={require('../assets/imgs/icon_app.png')}
          style={{width: width * 0.15, height: width * 0.15}}
        />
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
          <Menu.Item alignItems="flex-end">
            <HStack space={3}>
              <Text color="white" style={{fontSize: 18}}>
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
          <Menu.Item alignItems="flex-end">
            <HStack justifyContent="space-between" space={3}>
              <Text color="white" style={{fontSize: 18}}>
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
          <Menu.Item alignItems="flex-end">
            <HStack justifyContent="space-between" space={3}>
              <Text color="white" style={{fontSize: 18}}>
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
            <HStack justifyContent="space-between" space={3}>
              <Text color="white" style={{fontSize: 18}}>
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
      </HStack>
      <VStack alignItems="center">
        <Text style={styles.title}>Empathicos</Text>
        <Text style={styles.subtitle}>Discover Your Magic!</Text>
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
