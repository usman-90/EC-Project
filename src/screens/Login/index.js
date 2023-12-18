import React from "react";
import { StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import CheckBox from "../../components/Login/checkbox";
import CustomButton from "../../components/Button";
import ContinueWithGoogle from "../../components/Login/ContinueWithGoogle";

const Loginpage = ({navigation}) => {
  const handleButtonPress = () => {
    // Your button press logic goes here
    console.log("Button pressed!");
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
          />
          <InputField
            placeholder="Password"
            name="password"
            classNames="bg-white-200 text-black ml-[25px] mt-[30px]  mr-[30px]"
            secureTextEntry
          />

          <View
            className="ml-[28px] mr-[30px] mt-[30px]"
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
	  <View className="w-20">
            <CheckBox text="Remember me" />
	  </View>
	  <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={{ color: "#FFC70F", textDecorationLine: "none" }}>
              Forgot Password?
            </Text>
	  </TouchableOpacity>
          </View>
          <View className="ml-[32px] mt-[40px]">
            <CustomButton
              width={350}
              height={50}
              backgroundColor="#FFC70F"
              text="Login"
              textColor="white"
	  handlePress={() => navigation.navigate("HomeStack")}
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
	  Don't have an account?
            </Text>
            <Text
              className="ml-[4px] text-base"
              style={{ color: "#FFC70F", }} 
            >
              Register
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
export default Loginpage;
