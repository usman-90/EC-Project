import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import CheckBox from "../../components/Login/checkbox";
import CustomButton from "../../components/Button";
import ContinueWithGoogle from "../../components/Login/ContinueWithGoogle";

const Register = () => {
  const handleButtonPress = () => {
    console.log("Button pressed!");
  };
  return (
    <>
      <View className="italic" style={styles.container}>
        <Heading text="Create an account" />
        <View>
          <InputField
            placeholder="Name"
            name="name"
            classNames="bg-white text-black  ml-[25px]  mt-[30px] mr-[30px]"
            keyboardType="default"
            placeholderSize={16}
          />

          <InputField
            placeholder="Email"
            name="email"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            keyboardType="email-address"
          />
          <InputField
            placeholder="Password"
            name="password"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            secureTextEntry
          />

          <View
            className="ml-[30px] mr-[30px] mt-[30px]"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CheckBox text="I agree to Terms and condition" />
          </View>
          <View className="ml-[30px] mt-[40px]">
            <CustomButton
              width={360}
              height={50}
              backgroundColor="#FFC70F"
              text="Signup"
              textColor="white"
            />
          </View>
          <View
            className="mt-[30px]"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContinueWithGoogle
              imageWidth={25}
              imageHeight={25}
              text="Continue With Google"
              textColor="black"
              onPress={handleButtonPress}
            />
          </View>
          <View
            className="mt-[30px]"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#838383"}} className="text-base">
              Already have an account?
            </Text>
            <Text
              className="ml-[4px]"
              style={{ color: "#FFC70F",marginLeft:5}} className="text-base"
            >
             Login 
            </Text>
          </View>
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
export default Register;
