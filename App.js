import React from 'react';
import {SafeAreaView, StyleSheet,Platform,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/AppNavigator';



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
