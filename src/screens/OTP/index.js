import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Heading from "../../components/Heading";
import CustomButton from "../../components/Button";
import OTP from "react-native-otp-form";
import CountDown from "react-native-countdown-component";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { sendOTP } from "../../apiFunctions/register";

const Otp11 = ({ navigation }) => {
  const otpMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      if (
        data?.data?.message === "Invalid Otp" ||
        data?.data?.message === "Must be only digits"
      ) {
        Toast.show({
          type: "error",
          text1: "Error !",
          text2: "Invalid Otp",
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Logged In successfully! 👋",
      });
      console.log(data);
      navigation.navigate("HomeStack");
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error !",
        text2: "Invalid Otp",
      });
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });
  const userData = useSelector((state) => state?.data);
  const [otp, setOtp] = useState();
  const submit = () => {
    console.log(otp);
    otpMutation.mutate({
      otp,
      userId: userData?.userId,
    });
  };

  console.log(otp);
  return (
    <View className="italic p-6 " style={styles.container}>
      <Text className="text-5xl mt-10 ont-bold">Verify OTP</Text>
      <Text className="font-light text-xs mt-2">
        Enter your OTP which has been sent to your email and complete verify
        your account.
      </Text>

      <View className="mb-8">
        <OTP
          codeCount={5}
          containerStyle={{ marginTop: 50 }}
          otpStyles={{ backgroundColor: "#eee" }}
          onFinish={(val) => {
            setOtp(val);
          }}
        />
      </View>

      <Text className="text-slate-500 font-light text-sm text-center">
        A code has been sent to your email
      </Text>

      <View className="w-[100%] h-[100%] my-10">
        <CustomButton
          handlePress={submit}
          width={"100%"}
          text={"Continue"}
          backgroundColor={"#FFC70F"}
          textColor={"white"}
          height={"3%"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
});

export default Otp11;
