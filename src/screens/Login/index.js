import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Heading from '../../components/Heading';

const Loginpage = () => {
  return (
    <>
     <View className="italic" style={styles.container}>
       <Heading className="italic" text="Login for Discover"/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });
export default Loginpage