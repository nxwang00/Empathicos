import React, {useState, useEffect} from 'react';
import {Button} from 'native-base';

export const FormBtn = props => {
  const {title, onBtnPress} = props;
  return (
    <Button
      bg="#9e3a95"
      px="5"
      py="1"
      borderRadius="3xl"
      borderColor="amber.300"
      borderWidth="1"
      _text={{
        fontSize: 18,
        fontFamily: 'CenturyGothic',
        fontWeight: 600,
      }}
      onPress={() => onBtnPress()}>
      {title}
    </Button>
  );
};
