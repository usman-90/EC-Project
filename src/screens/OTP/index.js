import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Heading from '../../components/Heading';
import CustomButton from '../../components/Button';
import OTP from 'react-native-otp-form';
import CountDown from 'react-native-countdown-component';

const Otp11 = () => {
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          // Handle timer expiration logic here
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleButtonPress = () => {
    // Your button press logic goes here
    console.log('Button pressed!');
  };

  return (
    <View className="italic p-6 " style={styles.container}>
      <Heading text="Verify OTP" />
      <Text className="font-light text-xs mt-2">
        Enter your OTP which has been sent to your email and complete verify your account.
      </Text>

      <View className="mb-8">
        <OTP codeCount={5} containerStyle={{ marginTop: 50 }} otpStyles={{ backgroundColor: '#eee'  }} />
      </View>

      <Text className="text-slate-500 font-light text-sm text-center">A code has been sent to your phone</Text>
      
      <View className="mt-12 pt-4  flex flex-row justify-center gap-2">
        <Text className="font-bold text-md">Resend in</Text>
        <Text className="font-bold  text-md">{formatTime(timer)}</Text>
      </View>

      <View className="w-[100%] h-[100%] my-10">
        <CustomButton width={'100%'} text={'Continue'} backgroundColor={'#FFC70F'} textColor={'white'} height={'3%'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
});

export default Otp11;
