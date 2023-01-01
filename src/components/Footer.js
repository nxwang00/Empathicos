import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, useWindowDimensions} from 'react-native';
import {Pressable, HStack} from 'native-base';

export const Footer = props => {
  const {height, width} = useWindowDimensions();

  let footerEle = (
    <Image
      source={require('../assets/imgs/footer_home_bg.png')}
      style={[styles.footerBg(width, height)]}
    />
  );

  if (props.type === '1') {
    footerEle = (
      <>
        <Image
          source={require('../assets/imgs/footer_bg.png')}
          style={[styles.footerBg(width, height)]}
        />
        <HStack
          space="3"
          alignItems="center"
          justifyContent="space-between"
          px="4"
          pb="2">
          <Pressable onPress={() => navigation.navigate('home')}>
            <Image
              source={require('../assets/imgs/visit_shop.png')}
              style={{width: width * 0.3, height: height * 0.15}}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('home')}>
            <Image
              source={require('../assets/imgs/ask_ana.png')}
              style={{width: width * 0.32, height: height * 0.16}}
            />
          </Pressable>
        </HStack>
      </>
    );
  } else if (props.type === '2') {
    footerEle = (
      <Image
        source={require('../assets/imgs/new_footer_2.png')}
        style={[styles.footerBg(width, height)]}
      />
    );
  }
  return <View style={styles.footer}>{footerEle}</View>;
};

const styles = StyleSheet.create({
  footerBg: (width, height) => ({
    position: 'absolute',
    height: Math.round(height * 0.33),
    width: width,
    bottom: -60,
  }),
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
