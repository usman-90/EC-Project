import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ width, height, backgroundColor, text, textColor,  }) => {
    const handleButtonPress = () => {
       
        console.log('Button pressed!');
      };
  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderRadius:"10px"
      }}
      onPress={handleButtonPress}
    >
      <Text  style={{ color: textColor, fontWeight:"500"  }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
