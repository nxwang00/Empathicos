import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ActivityIndicator,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {View, HStack, Button, Icon} from 'native-base';
import Toast from 'react-native-toast-message';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  Capability,
} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {baseUrl} from '../../utils/util';
import {useUser} from '../../context/User';
import {Layout} from '../../components/Layout';
import {Course} from './components/Course';
import {tr} from 'date-fns/locale';

export const AudioCourse = props => {
  const id = props.route.params.id;
  const title = props.route.params.title;
  const isFocused = useIsFocused();

  const scrollViewRef = useRef(null);
  const {height, width} = useWindowDimensions();
  const {userData} = useUser();

  const scrollX = new Animated.Value(0);

  const [screenInfo, setScreenInfo] = useState({
    title: 'Audio Course',
    subTitle: '',
    header: '2',
    footer: '1',
  });
  const [loading, setLoading] = useState(true);
  const [screenIndex, setScreenIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [nextBtnDisable, setNextBtnDisable] = useState(false);
  const [backBtnDisable, setBackBtnDisable] = useState(true);

  useEffect(() => {
    setLoading(true);
    setScreenIndex(0);
    setNextBtnDisable(false);
    setBackBtnDisable(true);
    getCourse();
    updateTrackPlayer();
  }, [id, isFocused]);

  const getCourse = async () => {
    const token = userData.access_token;
    const url = `${baseUrl}/audio-course/by-category/${id}`;
    var options = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      const result = await fetch(url, options);
      const resResult = await result.json();
      if (!resResult.status) {
        Toast.show({
          type: 'error',
          text1: resResult.message,
        });
      } else {
        const courselist = resResult.results;
        const rst = courselist.map(item => {
          return {...item, status: 'none', url: item.audio};
        });
        setCourses(rst);

        await TrackPlayer.reset();
        await TrackPlayer.add(rst);

        setScreenInfo({
          ...screenInfo,
          ...{title: title, subTitle: courselist[0].title},
        });
        if (courselist.length === 1) {
          setNextBtnDisable(true);
        }
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Network not working',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTrackPlayer = async () => {
    try {
      await TrackPlayer.updateOptions({
        forwardJumpInterval: 30,
        jumpInterval: 30,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onNextBtnPress = async () => {
    const newScreenIndex = screenIndex + 1;

    // validation if next course exist
    if (newScreenIndex >= courses.length - 1) {
      setNextBtnDisable(true);
    }
    setBackBtnDisable(false);

    // upgrade the screen information on header
    setScreenInfo({
      ...screenInfo,
      ...{subTitle: courses[newScreenIndex].title},
    });

    // trigger the screen horizontal scroll
    scrollViewRef.current?.scrollTo({
      x: width * newScreenIndex,
      animated: true,
    });

    // upgrade current track
    TrackPlayer.pause();
    await TrackPlayer.skip(newScreenIndex);

    setScreenIndex(newScreenIndex);
  };

  const onBackBtnPress = async () => {
    const newScreenIndex = screenIndex - 1;

    if (newScreenIndex < 1) {
      setBackBtnDisable(true);
    }
    setNextBtnDisable(false);

    setScreenInfo({
      ...screenInfo,
      ...{subTitle: courses[newScreenIndex].title},
    });

    scrollViewRef.current?.scrollTo({
      x: width * newScreenIndex,
      animated: true,
    });

    TrackPlayer.pause();
    await TrackPlayer.skip(newScreenIndex);

    setScreenIndex(newScreenIndex);
  };

  const onPlayPause = val => {
    if (val === 'play') {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };

  const playForwardBackward = async val => {
    if (val === 'next') {
      let position = await TrackPlayer.getPosition();
      let newPosition = position + 10;
      await TrackPlayer.seekTo(newPosition);
    } else {
      let position = await TrackPlayer.getPosition();
      let newPosition = position > 10 ? position - 10 : 0;
      await TrackPlayer.seekTo(newPosition);
    }
  };

  return (
    <>
      <Layout screenInfo={screenInfo}>
        {loading ? (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{marginTop: '50%'}}
          />
        ) : (
          <View>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}>
              {courses.map(course => (
                <Course
                  key={course.id}
                  selectedIdx={screenIndex}
                  image={course.image}
                  description={course.description}
                  onPlayPause={val => onPlayPause(val)}
                  onForwardBackward={val => playForwardBackward(val)}
                />
              ))}
            </Animated.ScrollView>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              mx="12"
              mt="4">
              <Button
                py="1"
                bg="#a73d96"
                isDisabled={backBtnDisable}
                onPress={onBackBtnPress}
                leftIcon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name="chevron-left"
                    size="md"
                  />
                }>
                Back
              </Button>
              <Button
                py="1"
                bg="#a73d96"
                isDisabled={nextBtnDisable}
                onPress={onNextBtnPress}
                rightIcon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name="chevron-right"
                    size="md"
                  />
                }>
                Next
              </Button>
            </HStack>
          </View>
        )}
      </Layout>
    </>
  );
};
