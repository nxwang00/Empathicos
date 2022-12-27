import React, {useEffect, useRef, useState} from 'react';
import {GlobalProvider} from './src/context/Global';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/context/User';
import {Router} from './src/routes/Router';
// import TrackPlayer from 'react-native-track-player';
import {WithSplashScreen} from './src/screens/Splash';
import {NativeBaseProvider, Text, Box} from 'native-base';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);

  // const setUpTrackPlayer = async () => {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   setUpTrackPlayer();
  // }, []);

  return (
    <GlobalProvider>
      <UserProvider>
        <WithSplashScreen isAppReady={isAppReady}>
          <NativeBaseProvider>
            <Router />
            <Toast />
          </NativeBaseProvider>
        </WithSplashScreen>
      </UserProvider>
    </GlobalProvider>
  );
};

export default App;
