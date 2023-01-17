import React, {useState, useEffect, useRef} from 'react';
import {useWindowDimensions, Keyboard} from 'react-native';
import {
  View,
  VStack,
  HStack,
  Button,
  Icon,
  Text,
  ScrollView,
  TextArea,
  Input,
  Pressable,
} from 'native-base';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {baseUrl} from '../../utils/util';
import {useUser} from '../../context/User';
import {Layout} from '../../components/Layout';

export const MyJournal = props => {
  const {height, width} = useWindowDimensions();
  const {userData} = useUser();
  const descInputRef = useRef();
  const titleInputRef = useRef();

  const screenInfo = {
    title: 'My Journal',
    subTitle: '',
    header: '2',
    footer: '1',
  };

  const [journal, setJournal] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideCallback,
    );

    const keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShowCallback,
    );

    return () => {
      keyboardDidHideSubscription?.remove();
      keyboardDidShowSubscription?.remove();
    };
  }, []);

  const keyboardDidHideCallback = () => {
    setHideFooter(false);
    descInputRef.current.blur?.();
    titleInputRef.current.blur?.();
  };

  const keyboardDidShowCallback = () => {
    setHideFooter(true);
  };

  const onJounalChange = txt => {
    setJournal(txt);

    if (txt && title) setIsDisable(false);
    else setIsDisable(true);
  };

  const onTitleChange = txt => {
    setTitle(txt);
    if (txt && journal) setIsDisable(false);
    else setIsDisable(true);
  };

  const onJournalSave = () => {};

  const onAddJourneyPress = () => {};

  return (
    <Layout screenInfo={screenInfo} bgIdx="6" hideFooter={hideFooter}>
      <ScrollView style={{marginTop: height * 0.05}}>
        <VStack space={3} alignItems="center" px="6">
          <Text
            fontSize="md"
            fontFamily="CenturyGothic"
            color="white"
            textAlign="center">
            Journaling helps us commune with our deeper selves and discover.
            Enjoy the prompts below or come up with new ones!
          </Text>
          <Text
            fontSize="xl"
            fontFamily="CenturyGothic"
            color="white"
            textAlign="center">
            I am thankful... I love...
          </Text>
          <Text
            mt="-3"
            fontSize="xl"
            fontFamily="CenturyGothic"
            color="white"
            textAlign="center">
            I dream... I feel... I know...
          </Text>
          <View bg="white" style={{width: width * 0.85}} opacity="0.8">
            <Input
              placeholder="Title"
              placeholderTextColor="gray.700"
              value={title}
              onChangeText={onTitleChange}
              ref={ref => {
                titleInputRef && (titleInputRef.current = ref);
              }}
            />
            <TextArea
              ref={ref => {
                descInputRef && (descInputRef.current = ref);
              }}
              focusOutlineColor="primary.400"
              fontFamily="CenturyGothic"
              fontSize="12"
              numberOfLines={10}
              placeholder="Description..."
              placeholderTextColor="gray.700"
              h="150"
              value={journal}
              onChangeText={txt => onJounalChange(txt)}
            />
          </View>
          <HStack alignItems="center">
            <Button
              bg="#9e3a95"
              px="4"
              py="0.3"
              borderRadius="4"
              borderColor="amber.300"
              borderWidth="1"
              isLoading={loading}
              isLoadingText="Saving"
              _text={{
                fontSize: 18,
                fontFamily: 'CenturyGothic',
                fontWeight: 600,
              }}
              isDisabled={isDisable}
              onPress={onJournalSave}>
              Save
            </Button>
            <Pressable px="3" borderRadius="50" onPress={onAddJourneyPress}>
              <Icon
                as={MaterialCommunityIcons}
                name="plus-thick"
                color="amber.400"
                size={8}
              />
            </Pressable>
          </HStack>
        </VStack>
      </ScrollView>
    </Layout>
  );
};
