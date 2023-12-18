import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledText = styled(Text);

export const Heading2 = ({ text }) => {
  return (
    <View className="flex items-center mt-[80px]">
      <StyledText style={{ color: 'gray' }} className="text-2xl">
        {text}
      </StyledText>
    </View>
  );
};

export default Heading2;
