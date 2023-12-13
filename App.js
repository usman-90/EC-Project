import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Heading from './src/components/Heading';
import Loginpage from './src/screens/Login';
import Register from './src/screens/Register/Index';
import CreatePassword from './src/screens/CreatePassword';
import Otp11 from './src/screens/OTP';
import Profile from './src/screens/Profile';

export default function App() {
  return (
    <View className="italic" style={styles.container}>
      <Profile/>
      {/* <CreatePassword/> */}
      {/* <Otp11/> */}
    
      {/* <Loginpage/> */}
      {/* <Register/> */}

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
