import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Heading from "../../components/Heading";
import InputField from "../../components/InputField";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../../components/Button";
import Toast from "react-native-toast-message";
import { updateResetPassword } from "../../apiFunctions/register";
import { useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

const CreatePassword = ({ navigation }) => {
  const { userData } = useSelector((state) => state?.data);
  const [newPassword, setNewPassword] = useState("");
  const [pwHasStrongChar, setPwHasStrongChar] = useState(false);
  const [pwHasSpecialChar, setPwHasSpecialChar] = useState(false);
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  useEffect(() => {
    const isLengthValid = newPassword.length >= 8 && newPassword.length <= 20;

    // Check if the password contains at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(newPassword);

    // Check if the password contains at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(newPassword);

    // Check if the password contains at least one digit
    const hasNumber = /\d/.test(newPassword);

    // Check if the password contains at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword);

    if (hasUpperCase && isLengthValid) {
      setPwHasStrongChar(true);
    } else {
      setPwHasStrongChar(false);
    }

    if (hasLowerCase && hasNumber && hasSpecialChar) {
      setPwHasSpecialChar(true);
    } else {
      setPwHasSpecialChar(false);
    }

    console.log(
      "Rules cleared",
      isLengthValid,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    );
  }, [newPassword]);

  const handleButtonPress = async () => {
    // Your button press logic goes here
    if (newPassword !== newConfirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error !",
        text2: "Password mismatch",
      });
      return;
    }
    const response = await updateResetPassword({
      userId: userData._id,
      newPassword: newPassword,
    });
    if (response.status === 200) {
      console.log("Response", navigation);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'LoginStack' }
          ],
        })
      );     
    }else{
      Toast.show({
        type: "error",
        text1: "Error !",
        text2: "Seems like we got into an error",
      });
    }
  };

  const onNewPasswordChange = (name, text) => {
    console.log("new password", text);
    setNewPassword(text);
  };
  const onNewConfirmPasswordChange = (name, value) => {
    console.log("new confirm password", value);
    setNewConfirmPassword(value);
  };
  return (
    <>
      <View className="italic" style={styles.container}>
        <Heading text="Create Password" />
        <Text className="font-light text-xs px-7">
          Enter your password which has been sent to your email and complete
          verify your account.
        </Text>
        <KeyboardAvoidingView>
          <View className="my-6 px-6">
            <InputField
              placeholder="Create new password"
              name="new password"
              classNames={"my-10"}
              onChange={onNewPasswordChange}
              secureTextEntry={true}
            />
            <InputField
              placeholder="Confirm new password"
              name="confirm password"
              onChange={onNewConfirmPasswordChange}
              secureTextEntry={true}
            />
          </View>
        </KeyboardAvoidingView>
        <Text className="font-bold text-lg px-6">Password must have:</Text>
        <View className="flex flex-row items-center gap-2 my-4 px-6">
          <Icon
            name="check-circle"
            size={20}
            color={pwHasStrongChar ? "green" : "black"}
          />
          <Text className="text-xs font-light">8 to 20 strong characters</Text>
        </View>
        <View className="flex flex-row items-center gap-2 w-full text-sm px-6">
          <Icon
            name="check-circle"
            size={20}
            color={pwHasSpecialChar ? "green" : "black"}
          />
          <Text className="text-xs font-light">
            Strong letters, numbers and special characters
          </Text>
        </View>
        <View className="w-[100%] h-[100%] my-10 px-6">
          <CustomButton
            width={"100%"}
            text={"Continue"}
            backgroundColor={"#FFC70F"}
            textColor={"white"}
            height={"3%"}
            handlePress={handleButtonPress}
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
