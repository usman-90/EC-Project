import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  width,
  height,
  backgroundColor,
  text,
  textColor,
  handlePress,
  disabled,
}) => {
  const bg = disabled ? "#A2A5B1" : backgroundColor;
  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        backgroundColor: bg,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }}
      disabled={disabled}
      onPress={handlePress}
    >
      <Text className={`text-lg `} style={{ color: textColor }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
