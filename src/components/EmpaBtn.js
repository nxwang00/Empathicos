import React, {useState, useEffect} from 'react';
import {Pressable, Text, Center, WarningOutlineIcon} from 'native-base';
import {StyleSheet, Image} from 'react-native';

export const EmpaBtn = props => {
  const {title} = props;

  return (
    <Pressable alignItems="center">
      <Center>
        <Image
          source={require('../assets/imgs/rectangle_btn.png')}
          style={{width: 235, height: 35, resizeMode: 'stretch'}}
        />
        <Text fontSize="lg" color="white" style={styles.btn} mt={-8}>
          {title}
        </Text>
        <WarningOutlineIcon color="amber.300" style={styles.warningIcon} />
      </Center>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    fontFamily: 'CenturyGothic',
    textTransform: 'capitalize',
  },
  warningIcon: {
    marginTop: -22,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
});
