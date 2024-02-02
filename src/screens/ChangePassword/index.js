import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Heading2 from "../../components/heading2";
import EditPageInputField from "../../components/EditPageInputField";
import CheckBox from "../../components/Login/checkbox";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../apiFunctions/profileSettings";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state?.data);
  const [data, setData] = useState({ oldPassword: "", newPassword: "" });
  const changePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      const { status } = data;
      if (status === 200) {
        console.log("password update success", data);

        navigation.navigate('Profile');
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });
  const handleUpdatePassword = () => {
    const obj = {
      password: data?.oldPassword,
      newPassword: data?.newPassword,
      id: userData?._id
    };
    changePasswordMutation.mutate(obj);
  }
  const handleDataChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <View className="basis-full bg-white" style={styles.container}>
        <Heading2 text="Change Password" />
        <Text style={{ color: "gray" }} className=" ml-[30px] mt-[30px]">
          Old password
        </Text>
        <EditPageInputField
          placeholder="Old password"
          text={data.oldPassword}
          onChangeText={(val) => handleDataChange("oldPassword", val)}
          textStyle={{ flex: 1, fontSize: 18 }}
          imageSource={require("../../../Asset/EditProfile/Vector.png")}
          imageStyle={{
            width: "full",
            height: "100%",
            marginRight: 10,
            resizeMode: "cover",
          }}
          keyboardType="default"
        />
        <Text style={{ color: "gray" }} className=" ml-[30px] mt-[10px]">
          New Password
        </Text>
        <EditPageInputField
          placeholder="New Password"
          text={data.newPassword}
          onChangeText={(val) => handleDataChange("newPassword", val)}
          textStyle={{ flex: 1, fontSize: 18 }}
          imageSource={require("../../../Asset/EditProfile/grayVector.png")}
          imageStyle={{
            width: "full",
            height: "100%",
            marginRight: 10,
            resizeMode: "cover",
          }}
          keyboardType="default"
        />
        <TouchableOpacity className="bg-primary items-center py-2 mt-10 rounded-lg mx-6" onPress={() => handleUpdatePassword()}>
          <Text className="text-white text-lg">
            Save
          </Text>
        </TouchableOpacity>
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
export default ChangePassword;
