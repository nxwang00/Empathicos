import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {Profile} from '../screens/user/Profile';
import {Invite} from '../screens/user/Invite';
import {Journey} from '../screens/journey/Journey';
import {JourneyDetail} from '../screens/journey/JourneyDetail';
import {JourneyGo} from '../screens/journey/JourneyGo';
import {createDrawerNavigator} from '@react-navigation/drawer';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const AuthStack = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="home"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="invite" component={Invite} />
      <Drawer.Screen name="journey" component={Journey} />
      <Drawer.Screen name="journey_detail" component={JourneyDetail} />
      <Drawer.Screen name="journey_go" component={JourneyGo} />
    </Drawer.Navigator>
  );
};
