import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {Profile} from '../screens/Profile';
import {Invite} from '../screens/Invite';
import {Journey} from '../screens/Journey';
import {View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const AuthStack = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="invite" component={Invite} />
      <Drawer.Screen name="journey" component={Journey} />
    </Drawer.Navigator>
  );
};
