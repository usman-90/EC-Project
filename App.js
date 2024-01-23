import React from 'react';
import {SafeAreaView, StyleSheet,Platform,StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/AppNavigator';
import Profile from './src/screens/Profile';



export default function App() {

  return (
      <NavigationContainer>
<SafeAreaView style={styles.container}>
      <RootStack />
</ SafeAreaView>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});

