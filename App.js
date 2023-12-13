import React from 'react';
import {Image,SafeAreaView, StyleSheet, Text, View,Platform, StatusBar } from 'react-native';
import SignIn from './src/screens/SignIn/index'
import Properties from './src/screens/Properties/index'
import Search from './src/screens/Search/index'



export default function App() {
  return (
<SafeAreaView style={styles.container}>
	  <Search />
</ SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
