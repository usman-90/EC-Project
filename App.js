import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Heading from './src/components/Heading';
import Loginpage from './src/screens/Login';
import Register from './src/screens/Register/Index';

export default function App() {
  return (
    <View className="italic" style={styles.container}>
      {/* <Loginpage/> */}
      <Register/>

       {/* <Heading className="italic" text="Login for Discover"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
