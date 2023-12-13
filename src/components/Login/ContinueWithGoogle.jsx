import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const ContinueWithGoogle = ({ imageWidth, imageHeight, text, textColor, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Image
        source={require('../../../Asset/LoginAsset/Google.png')} 
        style={{ width: imageWidth, height: imageHeight, marginRight: 10 }}
      />
      <Text style={{ color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ContinueWithGoogle;
