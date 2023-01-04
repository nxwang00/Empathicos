import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ActivityIndicator,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {View, HStack, Button, Icon} from 'native-base';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {baseUrl} from '../../utils/util';
import {useUser} from '../../context/User';
import {Layout} from '../../components/Layout';
import {Course} from './components/Course';

export const AudioCourse = props => {
  const id = props.route.params.id;
  const title = props.route.params.title;

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
    getCourse();
  }, [id]);

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
        // console.log(resResult.results);
        setCourses(resResult.results);
        setScreenInfo({
          ...screenInfo,
          ...{title: title, subTitle: resResult.results[0].title},
        });
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

  const onNextBtnPress = () => {
    const newScreenIndex = screenIndex + 1;
    setScreenInfo({
      ...screenInfo,
      ...{subTitle: courses[newScreenIndex].title},
    });

    scrollViewRef.current?.scrollTo({
      x: width * newScreenIndex,
      animated: true,
    });

    if (newScreenIndex >= courses.length - 1) {
      setNextBtnDisable(true);
    }
    setBackBtnDisable(false);

    setScreenIndex(newScreenIndex);
  };

  const onBackBtnPress = () => {
    const newScreenIndex = screenIndex - 1;

    setScreenInfo({
      ...screenInfo,
      ...{subTitle: courses[newScreenIndex].title},
    });
    scrollViewRef.current?.scrollTo({
      x: width * newScreenIndex,
      animated: true,
    });

    if (newScreenIndex < 1) {
      setBackBtnDisable(true);
    }
    setNextBtnDisable(false);

    setScreenIndex(newScreenIndex);
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
                  image={course.image}
                  description={course.description}
                  audio={course.audio}
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
