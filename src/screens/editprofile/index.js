import React, { useState } from "react";
import { StyleSheet,TouchableOpacity, Text, View } from "react-native";
import Heading2 from "../../components/heading2";
import EditPageInputField from "../../components/EditPageInputField";
import CheckBox from "../../components/Login/checkbox";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../../apiFunctions/profileSettings";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const userData = useSelector((state) => state?.data);
    const editProfileMutation = useMutation({
        mutationFn: editProfile,
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })
  const [data, setData] = useState({ firstName: "", lastName: "", email: "" });

  const handleDataChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
    const handleEditProfile = () => {
      console.log("User data", userData);
        const obj = {
            name: data?.firstName + " " + data?.lastName,
            email: data?.email,
            id: userData?.userId
        }
        editProfileMutation.mutate(obj)
    }

  return (
    <>
      <View className=" bg-white basis-full" style={styles.container}>
        <Heading2 text="Edit Profile" />
        
        <Text style={{ color: "gray" }} className=" ml-[30px] mt-[30px]">
          First Name
        </Text>
        <EditPageInputField
          placeholder="First Name"
          text={data.firstName}
          onChangeText={(val) => handleDataChange("firstName", val)}
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
          Last Name
        </Text>
        <EditPageInputField
          placeholder="Last Name"
          text={data.lastName}
          onChangeText={(val) => handleDataChange("lastName", val)}
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
        <Text style={{ color: "gray" }} className=" ml-[30px] mt-[10px]">
          Change Email address
        </Text>
        <EditPageInputField
          placeholder="Email Address"
          text={data.email}
          onChangeText={(val) => handleDataChange("email", val)}
          textStyle={{ flex: 1, fontSize: 18 }}
          imageSource={require("../../../Asset/EditProfile/mail-line.png")}
          imageStyle={{
            width: "full",
            height: "100%",
            marginRight: 10,
            resizeMode: "cover",
          }}
          keyboardType="default"
        />
        <View
          className="ml-[30px] mr-[30px] mt-[30px]"
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
        </View>
      <TouchableOpacity className="bg-primary items-center py-2 mt-10 rounded-lg mx-6" onPress={() => handleEditProfile()}>
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
export default EditProfile;
