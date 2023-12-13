import React from "react";
import { StyleSheet , View , Text , Image , ImageBackground , TouchableOpacity } from "react-native";
import ProfilePic from "../../../Asset/Images/Profile/default-profile.png"
import EditIcon from "../../../Asset/Images/Profile/edit-line.png"
import Icon from 'react-native-vector-icons/AntDesign';
import PasswordIcon from 'react-native-vector-icons/SimpleLineIcons';
import SettingIcon from 'react-native-vector-icons/Feather';



const data={name:"Hellooo" , email:"hello@gmail.com"};

const Profile = () => {
  return (
    <>
    <View className="italic p-6 justify-center items-center h-full " style={styles.container}>

        <ImageBackground source={ProfilePic} className="w-[45%] h-[22%] flex justify-end items-end" imageStyle={styles.roundedFull}>
         
          
           <View className="w-[40%] h-[40%] bg-[#FFC70F] rounded-full items-center justify-center border-4 border-white">
           <TouchableOpacity>
           <Image source={EditIcon}/>
           </TouchableOpacity>
           </View>
           
        </ImageBackground>
  
        <View className=" my-4"><Text className="font-bold text-2xl">{data.name}</Text></View>

        <View className=" bg-[#f2e1aa] py-2 px-6 rounded-full"><Text>{data.email}</Text></View>
        <View className="items-center justify-center flex flex-col  w-full bg-white rounded-lg mt-8 shadow-2xl  shadow-stone-600">
        <View className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 ">
          <View className="flex flex-row gap-4">
            <Icon name="edit" size={30} style={styles.edit}/>
            <Text>Edit Profile</Text>
            </View>
            <TouchableOpacity>
            <Icon name="arrowright" size={25}/>
            </TouchableOpacity>
          

          </View>
         
          <View className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 ">
          <View className="flex flex-row gap-4">
            <PasswordIcon name="lock" size={30} style={styles.edit}/>
            <Text>Change Password</Text>
            </View>
            <TouchableOpacity>
            <Icon name="arrowright" size={25}/>
            </TouchableOpacity>
          

          </View>
          <View className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 ">
          <View className="flex flex-row gap-4">
            <SettingIcon name="settings" size={30} style={styles.edit}/>
            <Text>Settings</Text>
            </View>
            <TouchableOpacity>
            <Icon name="arrowright" size={25}/>
            </TouchableOpacity>

          </View>
          <View className="flex flex-row justify-between w-full py-4 px-6 border-b border-gray-200 ">
          <View className="flex flex-row gap-4">
            <PasswordIcon name="logout" size={28} style={styles.logout}/>
            <Text className="text-red-700">Logout</Text>
            </View>
            <TouchableOpacity>
            <Icon name="arrowright" size={25} style={styles.logout}/>
            </TouchableOpacity>

          </View>
        </View>
        
       
       
    </View>
</>
   
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#FFF',
        
    },
    roundedFull: {
        width: "100%",
        height: "100%",
        borderRadius:80 // Set half of the width/height to make it a circle
      },
      edit:{
        width:"100px",
        height:"100px",
        color:"#FFC70F"
   
      },
      logout:{
        width:"100px",
        height:"100px",
        color:"red"
        
      }
});

export default Profile;