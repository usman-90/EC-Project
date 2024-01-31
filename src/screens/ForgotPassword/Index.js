import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import CustomButton from "../../components/Button";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [reqSent, setReqSent] = useState(false);

  const onEmailChannelChanged = (e, value) => {
    setEmail(value);
  };

  const onResetPasswordButtonPress = () => {
    setReqSent(true);
  }
  return (
    <>
      <View className="italic bg-white" style={styles.container}>
        <Heading text="Enter your Email" />
        <Text className="ml-[32px] mr-[32px] my-[15px]">
          Enter email associated with your account and we will send an email
          with code to reset your password
        </Text>
        <View>
          <InputField
            placeholder="Email"
            name="email"
            classNames="bg-white-200 text-black ml-[30px] mt-[40px]  mr-[30px]"
            keyboardType="email-address"
            onChange={onEmailChannelChanged}
          />
          <TouchableOpacity className="bg-primary mt-10 mx-6 rounded-lg py-2" onPress={onResetPasswordButtonPress}>
            <Text className="text-white text-lg text-center">
              Send OTP
            </Text>
          </TouchableOpacity>
          {reqSent && <Text className="m-8 text-red-600">An email has been sent to this address if there is an existing account registered with this email</Text>}
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
