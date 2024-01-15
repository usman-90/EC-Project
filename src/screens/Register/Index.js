import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import CheckBox from "../../components/Login/checkbox";
import CustomButton from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import ContinueWithGoogle from "../../components/Login/ContinueWithGoogle";
import { register } from "../../apiFunctions/register";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../features/user/userSlice";
import { onGoogleButtonPress } from "../../apiFunctions/signInWithGoogle";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      Toast.show({
        type: "info",
        text1: "OTP",
        text2: "Kindly provide OTP below",
      });
      console.log(data?.data?.data);
      dispatch(
        setUserData({
          userId: data?.data?.data,
        }),
      );
      navigation.navigate("OTP");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
      Toast.show({
        type: "error",
        text1: "Request Failed!",
        text2: error?.response?.data?.message,
      });
    },
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: null,
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleDataChange = (name, val) => {
    setData({ ...data, [name]: val });
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
            onChange={handleDataChange}
          />

          <InputField
            placeholder="Email"
            name="email"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            keyboardType="email-address"
            onChange={handleDataChange}
          />
          <InputField
            placeholder="Phone Number"
            name="phoneNumber"
            placeholderSize={16}
            keyboardType="numeric"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            onChange={handleDataChange}
          />
          <InputField
            placeholder="Password"
            name="password"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            secureTextEntry
            onChange={handleDataChange}
          />

          <View
            className="ml-[30px] mr-[30px] mt-[30px]"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CheckBox
              text="I agree to Terms and condition"
              isChecked={isAgreed}
              setIsChecked={setIsAgreed}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              registerMutation.mutate(data);
            }}
            disabled={!isAgreed}
          >
            <View
              className={`${
                !isAgreed ? "bg-gray-400" : "bg-primary"
              }  my-2 mt-3  mx-6 rounded-lg py-3 items-center`}
            >
              <Text className="text-white text-lg">Signup</Text>
            </View>
          </TouchableOpacity>
          <View
            className="mt-[30px] px-6"
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
      onPress={() => onGoogleButtonPress(navigation).then(() => console.log('Signed in with Google!'))}
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
            <Text style={{ color: "#838383" }} className="text-base">
              Already have an account?
            </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              className="ml-[4px] text-base"
              style={{ color: "#FFC70F", marginLeft: 5 }}
            >
              Login
            </Text>
      </TouchableOpacity>
          </View>
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
export default Register;
