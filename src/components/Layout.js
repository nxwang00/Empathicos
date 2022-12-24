import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  HStack,
  VStack,
  Pressable,
  HamburgerIcon,
  Text,
  Menu,
  Flex,
} from 'native-base';

export const Layout = props => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/imgs/image_bgstars.png')}
        resizeMode="cover"
        style={styles.image}>
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
              borderColor="white">
              <Menu.Item>
                <Flex>
                  <Text>My Profie</Text>
                </Flex>
              </Menu.Item>
              <Menu.Item>Nunito Sans</Menu.Item>
              <Menu.Item>Roboto</Menu.Item>
              <Menu.Item>Poppins</Menu.Item>
            </Menu>
            {/* <Image
              source={require('../assets/imgs/icon_profile.png')}
              style={{width: width * 0.1, height: width * 0.1}}
            /> */}
          </HStack>
          <VStack alignItems="center">
            <Text style={styles.title}>Empathicos</Text>
            <Text style={styles.subtitle}>Discover Your Magic!</Text>
          </VStack>
        </View>
        {props.children}
        <View>
          <Image
            source={require('../assets/imgs/footer_home_bg.png')}
            style={[styles.footerBg(width, height)]}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#24b5d5',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
  footerBg: (width, height) => ({
    position: 'absolute',
    height: Math.round(height * 0.33),
    width: width,
    bottom: -60,
  }),
  menuItem: {
    color: 'white !important',
  },
});
