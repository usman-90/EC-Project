import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/Button";
import OTP from "react-native-otp-form";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { resetPassword, sendOTP } from "../../apiFunctions/register";
import { setUserData } from "../../features/user/userSlice";

const Otp11 = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [intervals, setIntervals] = useState(null);
  const { params } = route;
  const otpMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      console.log("OTP submit response", data);
      if (
        data?.data?.message === "Invalid Otp" ||
        data?.data?.message === "Must be only digits" ||
        data?.data?.message === "Otp is required."
      ) {
        Toast.show({
          type: "error",
          text1: "Error !",
          text2: "Invalid Otp",
        });
        return;
      }
      if (data?.data?.message === "User Id is required.") {
        Toast.show({
          type: "error",
          text1: "Error !",
          text2: "Invalid UserId",
        });
        return;
      }
      if (params) {
        if (params.comingFrom === "NewUser") {
          navigation.navigate("BottomTabStack");
          Toast.show({
            type: "success",
            text1: "Success!",
            text2: "Logged In successfully! 👋",
          });
        } else {
          navigation.navigate("CreateNewPassword");
          Toast.show({
            type: "success",
            text1: "Success!",
            text2: "OTP Verified! 👋",
          });
        }
      }
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
  const { userData } = useSelector((state) => state?.data);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [otpResend, setOtpResend] = useState(false); // 3 minutes in seconds

  useEffect(() => {
    setIntervals(startOtpResendTimer());

    return () => {
      clearInterval(intervals);
    };
  }, []);
  
  useEffect(() => {
    console.log("Coming from ", route.params)
  }, [])
  

  const startOtpResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        console.log("Timer Called", prevTimer);
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          // Handle timer expiration logic here
        }
      });
    }, 1000);

    return interval;
  }

  const resendOTP = async () => {
    const {email} = route.params;
    setTimer(180);
    setIntervals(startOtpResendTimer());

    if (email) {
      const response = await resetPassword({
        email: email,
      });
      console.log("Response on request reset", response);
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(
          setUserData({
            userData: {
              _id: data,
            },
          }),
        );
      }
    }
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const submit = () => {
    // console.log(otp);
    console.log("OTP val", otp, userData);
    if (otp) {
      otpMutation.mutate({
        otp,
        userId: userData?._id,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error !",
        text2: "No OTP was entered",
      });
    }
  };

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

      {timer >= 1 ? (
        <View className="mt-12 pt-4  flex flex-row justify-center gap-2">
          <Text className="font-bold text-md">Resend in</Text>
          <Text className="font-bold  text-md">{formatTime(timer)}</Text>
        </View>
      ) : (
        <View className="mt-12 pt-4  flex flex-row justify-center gap-2">
          <TouchableOpacity onPress={resendOTP}>
            <Text className="text-primary font-bold">Resend OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="w-[100%] h-[100%] my-10">
        <CustomButton
          handlePress={submit}
          width={"100%"}
          text={"Continue"}
          backgroundColor={"#FFC70F"}
          textColor={"white"}
          height={40}
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
