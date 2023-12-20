import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../../components/Button";

const CreatePassword = () => {
  const handleButtonPress = () => {
    // Your button press logic goes here
    console.log("Button pressed!");
  };
  return (
    <>
      <View className="italic p-6 " style={styles.container}>
        <Heading text="Create Password" />
        <Text className="font-light text-xs">
          Enter your password which has been sent to your email and complete
          verify your account.
        </Text>
        <KeyboardAvoidingView>
          <View className="my-6">
            <InputField
              placeholder="Create new password"
              name="new password"
              keyboardType="password"
              classNames={"my-10"}
            />
            <InputField
              placeholder="Confirm new password"
              name="confirm password"
              keyboardType="password"
            />
          </View>
        </KeyboardAvoidingView>
        <Text className="font-bold text-lg">Password must have:</Text>
        <View className="flex flex-row items-center gap-2 my-4 ">
          <Icon name="check-circle" size={20} />
          <Text className="text-xs font-light">8 t0 20 strong characters</Text>
        </View>
        <View className="flex flex-row items-center gap-2 w-full text-sm">
          <Icon name="check-circle" size={20} />
          <Text className="text-xs font-light">
            Strong letters, numbers and special characters
          </Text>
        </View>
        <View className="w-[100%] h-[100%] my-10">
          <CustomButton
            width={"100%"}
            text={"Continue"}
            backgroundColor={"#FFC70F"}
            textColor={"white"}
            height={"2%"}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
});
export default CreatePassword;
