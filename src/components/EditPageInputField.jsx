import React from "react";
import { View, TextInput, Image } from "react-native";

const EditPageInputField = ({
  placeholder,
  text,
  textStyle,
  imageSource,
  imageStyle,
  ...rest
}) => {
  return (
    <View
      className="mt-[8px] ml-[28px]  mr-[30px] border border-gray-100 bg-gray-100 p-2 rounded-lg"
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <View className="w-7 h-6 overflow-hidden">
        <Image source={imageSource} style={imageStyle} />
      </View>
      <TextInput
        style={textStyle}
        placeholder={placeholder}
        value={text}
        {...rest}
      />
    </View>
  );
};

export default EditPageInputField;
