import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import CustomButton from "../../components/Button";
import { resetPassword } from "../../apiFunctions/register";
import Toast from "react-native-toast-message";
import store from "../../app/store";
import { setUserData } from "../../features/user/userSlice";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [reqSent, setReqSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onEmailChannelChanged = (e, value) => {
    setEmail(value);
  };

  const onResetPasswordButtonPress = async () => {
    if (email) {
      setReqSent(true);

      const response = await resetPassword({
        email: email,
      });
      console.log("Response on request reset", response);
      if (response.status === 200) {
        const { data } = response.data;
        store.dispatch(
          setUserData({
            userData: {
              _id: data,
            },
          }),
        );
        setEmailSent(true);
      }
    }
  };

  return (
    <>
      <View className="italic" style={styles.container}>
        <Heading text="Enter your Email" />
        <Text className="ml-[32px] mr-[32px] my-[15px]">
          Enter email associated with your account and we will send an email
          with code to reset your password
        </Text>
        <View>
          <InputField
            placeholder="Email"
            name="email"
            classNames="bg-white-200 text-black ml-[30px]   mr-[30px] mt-[40px]"
            keyboardType="email-address"
            onChange={onEmailChannelChanged}
          />
          <TouchableOpacity
            className="bg-primary mt-10 mx-6 rounded-lg py-2"
            onPress={onResetPasswordButtonPress}
          >
            <Text className="text-white text-lg text-center">Send OTP</Text>
          </TouchableOpacity>
          {reqSent && (
            <Text className="mx-6 my-8 text-red-600">
              An OTP will be sent to this address if it exists on our database
            </Text>
          )}

          {emailSent && (
            <View className="mx-6 flex-row">
              <Text>Received an OTP? </Text>
              <Text
                className="mx-1 text-primary"
                onPress={() => {
                  if (!reqSent) {
                    Toast.show({
                      type: "error",
                      text1: "Request Failed!",
                      text2: "Kindly register with an email first.",
                    });
                    return;
                  }
                  navigation.navigate("OTP", { comingFrom: "ForgotPassword" });
                }}
              >
                Click here
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default ForgotPassword;
