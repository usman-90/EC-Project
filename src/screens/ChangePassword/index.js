
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Heading2 from '../../components/heading2';
import EditPageInputField from '../../components/EditPageInputField';
import CheckBox from '../../components/Login/checkbox';




const ChangePassword = () => {
    const [data, setData] = useState({oldPassword:"",newPassword:""});

    const handleDataChange = (name,value) => {
        setData({...data,[name]:value});
    };

    return (
        <>
            <View className="basis-full" style={styles.container}>
                <Heading2 text="Change Password" />
                <Text style={{ color: "gray" }} className=" ml-[30px] mt-[30px]">Old password</Text>
                <EditPageInputField placeholder="Old password"
                    text={data.oldPassword}
                    onChangeText={(val) => handleDataChange("oldPassword",val)}
                    textStyle={{ flex: 1, fontSize: 18 }}
                    imageSource={require('../../../Asset/EditProfile/Vector.png')}
                    imageStyle={{ width: "full", height: "100%", marginRight: 10 ,resizeMode: 'cover' }}
                    keyboardType="default"
                />
                <Text style={{ color: "gray" }} className=" ml-[30px] mt-[10px]">New Password</Text>
                <EditPageInputField placeholder="New Password"
                    text={data.oldPassword}
                    onChangeText={(val) => handleDataChange("newPassword", val)}
                    textStyle={{ flex: 1, fontSize: 18 }}
                    imageSource={require('../../../Asset/EditProfile/grayVector.png')}
                    imageStyle={{ width: "full", height: "100%", marginRight: 10 ,resizeMode: 'cover' }}
                    keyboardType="default"
                />
                  
                 

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',

    },
});
export default ChangePassword