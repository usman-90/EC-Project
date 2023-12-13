import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Heading from './src/components/Heading';
import Loginpage from './src/screens/Login';
import Register from './src/screens/Register/Index';
import ForgotPassword from './src/screens/ForgotPassword/Index';
import EditProfile from './src/screens/editprofile';
import ChangePassword from './src/screens/ChangePassword';

export default function App() {
  return (
    <View className="italic" style={styles.container}>
      {/* <Loginpage/> */}
      {/* <Register/> */}
      {/* <ForgotPassword/> */}
      <EditProfile/>
      {/* <ChangePassword/> */}

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
