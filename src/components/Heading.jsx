import React from 'react'
import { View , Text } from 'react-native'
import { styled } from 'nativewind';
const StyledText = styled(Text)

export const Heading = ({text}) => {
  return (
    <StyledText className="mt-[99px]  text-3xl font-bold ">
        {text}
    </StyledText>
  );
};

export default Heading;