import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Animated} from 'react-native';
import Toast from 'react-native-toast-message';
import {baseUrl} from '../../utils/util';
import {useUser} from '../../context/User';
import {Layout} from '../../components/Layout';
import {Template} from './components/Template';

export const JourneyGo = props => {
  const id = props.route.params.id;

  const screenInfo = {
    title: 'Journey',
    subTitle: '',
    header: '2',
    footer: '2',
  };

  const scrollX = new Animated.Value(0);

  const {userData} = useUser();

  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    onTemplatesLoad();
  }, []);

  const onTemplatesLoad = async () => {
    const token = userData.access_token;
    const url = `${baseUrl}/badge-templates/${id}`;
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
        setTemplates(resResult.results);
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
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: true,
              },
            )}
            // onScrollEndDrag={event => {
            //   console.log(event.nativeEvent.contentOffset.x);
            // }}
          >
            {templates.map(temp => (
              <Template
                key={temp.id}
                image={temp.value.image}
                title={temp.value.title}
                description={temp.value.description}
              />
            ))}
          </Animated.ScrollView>
        )}
      </Layout>
    </>
  );
};
