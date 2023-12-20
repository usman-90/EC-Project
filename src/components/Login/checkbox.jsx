import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CheckBox = ({ text, isChecked, setIsChecked }) => {
  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={handlePress}
    >
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: isChecked ? "#FFC70F" : "transparent",
          borderWidth: 1,
          borderColor: "#FFC70F",
          marginRight: 5,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        {isChecked && <Text style={{ color: "white", fontSize: 16 }}>✓</Text>}
      </View>
      <Text className="font-semibold ml-[4px] w-80 mt-[4px]">{text}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
