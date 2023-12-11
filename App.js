import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';


export default function App() {
  return (
    <View className="italic flex-1 justify-center items-center" >
      <Text className="italic">hello World</Text>
      <CustomButton />
      <StatusBar style="auto" />
    </View>
  );
}


