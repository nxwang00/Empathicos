import React, {useState, useEffect} from 'react';
import {FormControl, Text, Input} from 'native-base';

export const FormInput = props => {
  const {label, mt} = props;
  return (
    <FormControl mt={mt}>
      <Text color="light.50" fontFamily="CenturyGothic" fontSize="md">
        {label}
      </Text>
      <Input
        w="100%"
        type="text"
        focusOutlineColor="light.50"
        _focus={{color: 'white'}}
      />
    </FormControl>
  );
};
