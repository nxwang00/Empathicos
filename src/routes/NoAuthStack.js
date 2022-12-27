import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/Login';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export const NoAuthStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};
