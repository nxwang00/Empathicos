import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {useGlobal} from '../context/Global';
// import {AuthStack} from './AuthStack';
import {NoAuthStack} from './NoAuthStack';

export const Router = () => {
  // const {globalData} = useGlobal();

  return (
    <NavigationContainer>
      {/* {globalData && globalData.lang ? <LangStack /> : <NoLangStack />} */}
      <NoAuthStack />
    </NavigationContainer>
  );
};
