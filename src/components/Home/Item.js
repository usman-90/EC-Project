import { styled } from 'nativewind';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Item(props) {
  const { item } = props
  // const { Item } = data;
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledImage = styled(Image);
  const StyledButton = styled(TouchableOpacity);
  // console.log("Item got", props);
  return (
    <StyledView className='bg-zinc-400 w-64 h-64 m-4' >
      <StyledText className='absolute z-10 top-6 left-6 text-white text-xs'>{item.propertiesNo}</StyledText>
      <StyledText className='absolute z-10 top-12 left-6 text-white text-xl'>{item.rentType}</StyledText>
      <StyledImage source={item.Image} className='h-full w-full' />
      <StyledButton>
        <StyledText className='absolute z-10 bottom-9 left-6 text-white text-sm'>MORE DETAILS</StyledText>
      </StyledButton>
    </StyledView>
  )
}
