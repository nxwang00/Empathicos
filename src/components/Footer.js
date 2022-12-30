import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, useWindowDimensions} from 'react-native';

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
      <Image
        source={require('../assets/imgs/footer_bg.png')}
        style={[styles.footerBg(width, height)]}
      />
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
