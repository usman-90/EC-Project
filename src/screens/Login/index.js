import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
// import CheckBox from "../../components/Login/checkbox";
// import CustomButton from "../../components/Button";
import ContinueWithGoogle from "../../components/Login/ContinueWithGoogle";
import { login } from "../../apiFunctions/register";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { onGoogleButtonPress } from "../../apiFunctions/signInWithGoogle";
import store from "../../app/store";
import { setUserData } from "../../features/user/userSlice";
import { setPropertyData } from "../../features/property/propertySlice";

const Loginpage = ({ navigation }) => {
  const { userData } = useSelector((state) => state?.user?.data);
  const propertyInformation = useSelector((state) => state?.property?.data);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("useData on login page", userData);
  // }, []);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { userData } = data?.data.data;
      // console.log("Success on login");
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Logged In successfully! 👋",
      });
      store.dispatch(setUserData(data?.data.data));
      store.dispatch(setPropertyData({
        ...propertyInformation,
        contactDetails: {
          ListingOwner: userData.name,
          contactPerson: userData.name,
          email: userData.email,
          phone: userData.phoneNumber,
        }
      }));
      console.log("Login user data", data?.data.data);
      navigation.navigate("BottomTabStack");
    },
    onError: (error) => {
      // console.log("Error on login");
      Toast.show({
        type: "error",
        text1: "Error !",
        text2: error?.response?.data?.message,
      });
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleDataChange = (name, val) => {
    setData({ ...data, [name]: val });
  };



  return (
    <>
      <View className="italic" style={styles.container}>
        <Heading text="Login for Discover" />
        <View>
          <InputField
            placeholder="Email"
            name="email"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            keyboardType="email-address"
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
            className="ml-[28px] mr-[30px] mt-[30px]"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                if (!userData?._id) {
                  Toast.show({
                    type: "error",
                    text1: "Request Failed!",
                    text2: "Kindly register with an email first.",
                  });
                  return;
                }
                navigation.navigate("OTP", {
                  comingFrom: "NewUser",
                  email: data.email,
                });
              }}
            >
              <Text style={{ color: "#FFC70F", textDecorationLine: "none" }}>
                Verify OTP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "#FFC70F", textDecorationLine: "none" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (data.email === "" || data.password === "") {
                console.log("noo");
                return;
              }
              loginMutation.mutate(data);
            }}
          >
            <View className="my-2 bg-primary mx-6 rounded-lg py-3 items-center">
              <Text className="text-white text-lg">Login</Text>
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
              onPress={() =>
                onGoogleButtonPress(dispatch, navigation).then(() =>
                  console.log("Signed in with Google!"),
                )
              }
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
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="ml-[4px] text-base" style={{ color: "#FFC70F" }}>
                Register
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
export default Loginpage;
