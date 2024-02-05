import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import ProfilePic from "../../../Asset/Images/Profile/default-profile.png";
import EditIcon from "../../../Asset/Images/Profile/edit-line.png";
import Icon from "react-native-vector-icons/AntDesign";
import PasswordIcon from "react-native-vector-icons/SimpleLineIcons";
import HeadPhones from "react-native-vector-icons/Feather";
// import SettingIcon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import store from "../../app/store";
import { setUserData } from "../../features/user/userSlice";

//const data = { name: "Hellooo", email: "hello@gmail.com" };

const Profile = ({ navigation }) => {
  const { userData } = useSelector((state) => state?.data);

  const onLogoutPress = () => {
    console.log("Logout Pressed.");
    store.dispatch(
      setUserData({
        token: "",
        userData: {},
      }),
    );
    navigation.navigate("LoginStack");
  };

  return (
    <>
      <View
        className="italic p-6 justify-center items-center h-full "
        style={styles.container}
      >
        <ImageBackground
          source={ProfilePic}
          className="w-[45%] h-[22%] flex justify-end items-end"
          imageStyle={styles.roundedFull}
        >
          <View className="w-[40%] h-[40%] bg-[#FFC70F] rounded-full items-center justify-center border-4 border-white">
            <TouchableOpacity>
              <Image source={EditIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View className=" my-4">
          <Text className="font-bold text-2xl">{userData?.name}</Text>
        </View>

        <View className=" bg-[#f2e1aa] py-2 px-6 rounded-full">
          <Text>{userData?.email}</Text>
        </View>
        <View className="items-center justify-center flex flex-col  w-full bg-white rounded-lg mt-8 shadow-2xl  shadow-stone-600">
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 "
          >
            <View className="flex flex-row gap-4">
              <Icon name="edit" size={30} style={styles.edit} />
              <Text className="text-base pt-1">Edit Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icon name="arrowright" size={25} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
            className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 "
          >
            <View className="flex flex-row gap-4">
              <PasswordIcon name="lock" size={30} style={styles.edit} />
              <Text className="text-base pt-1">Change Password</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Icon name="arrowright" size={25} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("contact")}
            className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 "
          >
            <View className="flex flex-row gap-4">
              <HeadPhones name="headphones" size={30} style={styles.edit} />
              <Text className="text-base pt-1">Contact Us</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Icon name="arrowright" size={25} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLogoutPress}
            className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 "
          >
            <View className="flex flex-row gap-4">
              <PasswordIcon name="logout" size={28} style={styles.logout} />
              <Text className="text-red-700 text-base pt-1">Logout</Text>
            </View>
            <TouchableOpacity onPress={onLogoutPress}>
              <Icon name="arrowright" size={25} style={styles.logout} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
  },
  roundedFull: {
    width: "100%",
    height: "100%",
    borderRadius: 80, // Set half of the width/height to make it a circle
  },
  edit: {
    width: "100px",
    height: "100px",
    color: "#FFC70F",
  },
  logout: {
    width: "100px",
    height: "100px",
    color: "red",
  },
});

export default Profile;
