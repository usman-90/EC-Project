import React from "react";
import { StyleSheet , View , Text , Image , ImageBackground } from "react-native";
import ProfilePic from "../../../Asset/Images/Profile/default-profile.png"

const Profile = () => {
  return (
    <>
    <View className="italic p-6 justify-center items-center h-full " style={styles.container}>

        <ImageBackground source={ProfilePic}></ImageBackground>
       <View className="w-40 h-40 bg-pink-400 rounded-full">
     
       </View>
         <Image source={ProfilePic} />
       
       
    </View>
</>
   
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        
    },
});

export default Profile;