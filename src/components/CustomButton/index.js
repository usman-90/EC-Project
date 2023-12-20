import React from "react";
import { Button, View, Text } from "react-native";
import { styled } from "nativewind";

const StyledButton = styled(Button);
const StyledText = styled(Text);

const CustomButton = () => {
  return (
    <View className="w-90 bg-yellow-400">
      <StyledText className="text-pink-500">Hello World</StyledText>
      <StyledButton title="Press Me" className="bg-red-500"></StyledButton>
      <Button title="Presssss" className="p-[40px]" />
    </View>
  );
};

export default CustomButton;
