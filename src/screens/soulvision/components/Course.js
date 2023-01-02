import React from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {Center, View, Text, ScrollView} from 'native-base';

export const Course = props => {
  const {image, description, aduio} = props;
  const {height, width} = useWindowDimensions();

  return (
    <ScrollView style={{height: height * 0.5}} mt="8" zIndex="1">
      <Center>
        <View>
          <Image
            source={{uri: image}}
            style={{
              width: width * 0.8,
              height: width * 0.45,
              borderRadius: 10,
              borderColor: 'white',
              borderWidth: 4,
            }}
          />
        </View>
        <View style={{width: width}} mt="2">
          <Text
            fontFamily="CenturyGothic"
            fontSize="14"
            mx="10"
            p="2"
            bg="primary.100"
            borderRadius="6">
            {description}
          </Text>
        </View>
      </Center>
    </ScrollView>
  );
};
