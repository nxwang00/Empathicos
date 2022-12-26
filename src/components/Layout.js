import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import {Header} from './Header';
import {Footer} from './Footer';

export const Layout = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/imgs/image_bgstars.png')}
        resizeMode="cover"
        style={styles.image}>
        <Header />
        {props.children}
        <Footer />
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
});
