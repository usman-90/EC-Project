
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Heading2 from '../../components/heading2';
import EditPageInputField from '../../components/EditPageInputField';
import CheckBox from '../../components/Login/checkbox';




const EditProfile = () => {
    const [data, setData] = useState({firstName:"",lastName:"",email:""});

    const handleDataChange = (name,value) => {
        setData({...data,[name]:value});
    };

    return (
        <>
            <View className="basis-full" style={styles.container}>
                <Heading2 text="Edit Profile" />
                <Text style={{ color: "gray" }} className=" ml-[30px] mt-[30px]">First Name</Text>
                <EditPageInputField placeholder="First Name"
                    text={data.firstName}
                    onChangeText={(val) => handleDataChange("firstName",val)}
                    textStyle={{ flex: 1, fontSize: 18 }}
                    imageSource={require('../../../Asset/EditProfile/Vector.png')}
                    imageStyle={{ width: "full", height: "100%", marginRight: 10 ,resizeMode: 'cover' }}
                    keyboardType="default"
                />
                <Text style={{ color: "gray" }} className=" ml-[30px] mt-[10px]">Last Name</Text>
                <EditPageInputField placeholder="Last Name"
                    text={data.lastName}
                    onChangeText={(val) => handleDataChange("lastName", val)}
                    textStyle={{ flex: 1, fontSize: 18 }}
                    imageSource={require('../../../Asset/EditProfile/grayVector.png')}
                    imageStyle={{ width: "full", height: "100%", marginRight: 10 ,resizeMode: 'cover' }}
                    keyboardType="default"
                />
                  <Text style={{ color: "gray" }} className=" ml-[30px] mt-[10px]">Change Email address</Text>
                <EditPageInputField placeholder="Email Address"
                    text={data.email}
                    onChangeText={(val) => handleDataChange("email", val)}
                    textStyle={{ flex: 1, fontSize: 18 }}
                    imageSource={require('../../../Asset/EditProfile/mail-line.png')}
                    imageStyle={{ width: "full", height: "100%", marginRight: 10 ,resizeMode: 'cover' }}
                    keyboardType="default"
                />
                 <View className="ml-[30px] mr-[30px] mt-[30px]" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CheckBox text="All information notifications, promos, data transmission, data downloads, payment recaps and user activities will be sent via this email" />


                    </View>


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
export default EditProfile
