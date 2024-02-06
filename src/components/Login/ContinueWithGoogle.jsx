import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const ContinueWithGoogle = ({
  imageWidth,
  imageHeight,
  text,
  textColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-gray-100 py-2 w-full justify-center rounded-lg"
      onPress={onPress}
    >
      <Image
        source={require("../../../Asset/LoginAsset/Google.png")}
        style={{ width: imageWidth, height: imageHeight, marginRight: 10 }}
      />
      <Text style={{ color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ContinueWithGoogle;
