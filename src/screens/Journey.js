import React, {useState, useEffect} from 'react';
import {
  Image,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Center,
  View,
  Text,
  ScrollView,
  FormControl,
  TextArea,
  Pressable,
  KeyboardAvoidingView,
} from 'native-base';
import {useGlobal} from '../context/Global';
import {Layout} from '../components/Layout';
import {FormBtn} from '../components/FormBtn';
import {FormInput} from '../components/FormInput';
import {baseUrl} from '../utils/util';

const Badges = [
  {
    id: 7,
    name: 'Caterpillar',
    description:
      '<p>I am the Caterpillar. You may rarely see me. I can easily be crushed so I blend in to survive. You will only see me someday when I begin to fly. Until then I hold only within me the mysteries of all I am and know.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074022.png',
    favorite: false,
    save: false,
    created_at: 'December 30, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 8,
    name: 'Butterfly',
    description:
      '<p>I am the Butterfly. I am whispered by the Divine into joy, color and flight. I love flowers and light. I follow my wings wherever they take me on the breath of the Divine. In my flight, I increase the abundance of the world.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074052.png',
    favorite: true,
    save: false,
    created_at: 'December 31, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 11,
    name: 'Hornet',
    description:
      '<p>I am the Hornet. I love the sweetness of flowers and the freedom of flight. I love my family and the castle we built together to protect us from storms and enemies. I seek to provide and protect, and I am blessed with the power to create and destroy. When storms come, and when invaders threaten our world, I flair up, enflame and begin to think and feel protectively. I first declare my love for my loved ones, then I set to defend. If I am called to sting and destroy an enemy, so be it. I live to love and will protect that love with all my might.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074084.png',
    favorite: false,
    save: false,
    created_at: 'December 30, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 12,
    name: 'Adventurer',
    description:
      '<p>I am the Adventurer. I seek the unknown and delight in the unexpected. My courage comes not from my size or the cleverness of my mind, but from the joy in my heart as I step onto a new path. I seek the wholeness of experiences to reveal the mysteries of life within me. With each new step that I take, new life springs in me. Each new step is full of endless possibilities. My past does not define me and my future is not yet known. As I live so I learn. You may find me on top of a mountain listening to the stars, or in a friend&rsquo;s home. It is the heart that defines my adventures.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074111.jpg',
    favorite: false,
    save: false,
    created_at: 'December 31, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 13,
    name: 'Fairy',
    description:
      '<p>I am the Fairy. I open secret doors to magic and light up the darkest paths. To the weary heart, I prescribe some joy. If you can see me, even if in your mind&rsquo;s eye, you will surely smile.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074144.png',
    favorite: false,
    save: false,
    created_at: 'December 30, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 14,
    name: 'Dragonfly',
    description:
      '<p>I am the Dragonfly. You may see me only for a finite second, seemingly a fleeting visitor, yet an ancient dweller. I belong to all times and no time at all. My magical color and perfect flight inspire awe and wonder.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074177.png',
    favorite: false,
    save: false,
    created_at: 'December 31, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 15,
    name: 'Manifestor',
    description:
      '<p>I am the Manifestor. Through me, the Universe creates what lies beyond the limit of time, space and thought. I do not know the destination, but I trust the journey. My heart is a vessel for the Universe. I continuously purify my heart to paint the world in the purest light and love. As I create myself, so I create.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074203.png',
    favorite: false,
    save: false,
    created_at: 'December 30, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 16,
    name: 'Puppy',
    description:
      '<p>I am the Puppy. I am in wonder at everything and I always expect the best. I am very loyal even though I get distracted easily: there is so much wonder around me, I simply can&rsquo;t help it! Everything is fun and magical. I love everyone and I want everyone to play with me. Come play with me!</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074241.png',
    favorite: false,
    save: false,
    created_at: 'December 31, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 17,
    name: 'Lover',
    description:
      '<p>I am the Lover. I love you and accept you just as you are. I show you your strength, and comfort you through your pain. I rejoice in your victories whether they take you far or bring you near. I listen to the tears, celebrate the laughter, and hold your hand lightly until you are ready to let go. I rejoice in your victories more than your presence, your joy more than my own, your unbridled expression more than your agreement.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074263.png',
    favorite: false,
    save: false,
    created_at: 'December 30, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 18,
    name: 'Healer',
    description:
      '<p>&nbsp;</p>\r\n\r\n<p>I am the Healer. I bring forth the power of Divine love and the truths of Universal laws. I bow with love for the Divine in every creature and I serve all who seek me. I honor ancient wisdom and seek the truths of life. As I serve the healing of others, I reach beyond time and space to know what needs to be revealed for the healing of wounds of the body, mind or heart. As I embody my own Divinity, I help restore others in the truth of their own divine nature, perfect and whole.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074282.png',
    favorite: false,
    save: false,
    created_at: 'December 31, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 19,
    name: 'Empath',
    description:
      '<p>I am the Empath. I see and feel all the colors of joy and pain in all beings. Your joy adds to my joy, your pain I wish to heal. Beyond all notions of right or wrong, I hold everyone in the same love. I speak the silent language of our eternal nature. I listen not for your words, but your heart. I see not your limits, but the endless beauty of your soul that you may have forgotten. Through the eyes of love, I bring forth truths to help empower and uplift you.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074345.png',
    favorite: false,
    save: false,
    created_at: 'December 30, 2020',
    updated_at: 'June 07, 2021',
  },
  {
    id: 20,
    name: 'Transcended',
    description:
      '<p>I am the Transcendent. I illuminate what lies in the dark and I remain unchanged by the ebb and flow around me. Perfectly aware of my nature, I am at peace with all that is, allowing life to live me just as a flower allows itself to be. And just as a flower trusts to be and become all that it needs to be, so I trust that I am all that I need to be.</p>',
    image: 'https://app.andreaplesha.com/storage/badges/1623074342.png',
    favorite: true,
    save: false,
    created_at: 'December 31, 2020',
    updated_at: 'June 07, 2021',
  },
];

export const Journey = () => {
  const {height, width} = useWindowDimensions();

  const global = useGlobal();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch(`${baseUrl}/badges/`)
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   .finally(() => setLoading(false));

    const screenInfo = {
      title: 'Profile',
      subTitle: '',
    };
    global.onScreen(screenInfo);

    setLoading(false);
  }, []);

  const onProfileSave = () => {};

  const badgeItem = ({item}) => (
    <TouchableOpacity style={{margin: 6}}>
      <Image
        source={require('../assets/imgs/image_slider_border.png')}
        style={{
          width: (width - 70) / 3,
          height: (width - 80) / 3,
          borderRadius: 15,
        }}
      />
      <Image
        source={{
          uri: item.image,
        }}
        style={{
          width: (width - 130) / 3,
          height: (width - 140) / 3,
          position: 'absolute',
          top: 10,
          left: 10,
          borderRadius: 10,
        }}
      />
      <Center
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          width: (width - 130) / 3,
        }}
        bg="light.50"
        opacity="70">
        <Text fontFamily="CenturyGothic" fontWeight={700}>
          {item.name}
        </Text>
      </Center>
    </TouchableOpacity>
  );

  return (
    <>
      <Layout>
        <View
          w={width}
          h={height * 0.52}
          ml="4"
          mt="10"
          zIndex={1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <FlatList
            key={'*'}
            data={Badges}
            renderItem={badgeItem}
            keyExtractor={item => item.id}
            numColumns={3}
            style={{height: '43%'}}
          />
        </View>
        <View></View>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'CenturyGothic',
    color: '#fff',
  },
});
