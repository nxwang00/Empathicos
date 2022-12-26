import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, useWindowDimensions} from 'react-native';

export const Footer = () => {
  const {height, width} = useWindowDimensions();

  return (
    <View>
      <Image
        source={require('../assets/imgs/footer_home_bg.png')}
        style={[styles.footerBg(width, height)]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerBg: (width, height) => ({
    position: 'absolute',
    height: Math.round(height * 0.33),
    width: width,
    bottom: -60,
  }),
});
