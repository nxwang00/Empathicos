import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {Profile} from '../screens/Profile';
import {View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const NoAuthStack = () => {
  const navigation = useNavigation();

  return (
    // <>
    //   <Stack.Navigator
    //     initialRouteName="home"
    //     screenOptions={{
    //       headerShown: false,
    //     }}>
    //     <Stack.Screen name="home" component={Home} />
    //   </Stack.Navigator>
    // </>
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="profile" component={Profile} />
    </Drawer.Navigator>
  );
};
