import React, {useState, useEffect} from 'react';
import {
  Image,
  ActivityIndicator,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {View} from 'native-base';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../utils/util';
import {useUser} from '../../context/User';
import {Layout} from '../../components/Layout';
import {Course} from './components/Course';
import {EmpaPlainBtn} from '../../components/EmpaPlainBtn';
import {FormBtn} from '../../components/FormBtn';

export const AudioCourse = props => {
  const id = props.route.params.id;
  const {height, width} = useWindowDimensions();
  const {userData} = useUser();

  const scrollX = new Animated.Value(0);

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const screenInfo = {
    title: 'Audio Course',
    subTitle: '',
    header: '2',
    footer: '1',
  };

  useEffect(() => {
    getCourse();
  }, []);

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
        console.log(resResult.results);
        setCourses(resResult.results);
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
            <View mt="4">
              <RNAnimatedScrollIndicators
                numberOfCards={courses.length}
                scrollWidth={width}
                activeColor={'blue'}
                inActiveColor={'white'}
                scrollAnimatedValue={scrollX}
              />
            </View>
          </View>
        )}
      </Layout>
    </>
  );
};
