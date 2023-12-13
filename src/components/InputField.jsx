import React from 'react';
import { TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledInput = styled(TextInput);

export const InputField = ({ placeholder, name, classNames,placeholderSize, ...rest }) => {
  return (
    <StyledInput
      className={`border-b border-gray-300 p-2 rounded-md ${classNames}`}
      placeholder={placeholder}
      placeholderTextColor="#999" 
      onChangeText={(text) => console.log(`${name}: ${text}`)} 
      {...rest} 
    />
  );
};

export default InputField;
