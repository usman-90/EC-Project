
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Heading from '../../components/Heading';
import InputField from '../../components/InputField';
import CustomButton from '../../components/Button';



const ForgotPassword = ({navigation}) => {

    return (
        <>
            <View className="italic" style={styles.container}>
                <Heading text="Enter your Email" />
                <Text className="ml-[32px] mr-[32px] my-[15px]">Enter email associated with your account and we will send an email with code to reset your password
                </Text>
                <View>
                    <InputField
                        placeholder="Email"
                        name="email"
                        classNames="bg-white-200 text-black ml-[30px] mt-[40px]  mr-[30px]"
                        keyboardType="email-address"
                    />




                    <View className="ml-[30px] mt-[50px]">
                        <CustomButton

                            width={360}
                            height={50}
                            backgroundColor="#FFC70F"
                            text="Send Code"
                            textColor="white"
	    			handlePress={() => navigation.navigate("OTP")}
                        /> 
                    </View>




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
export default ForgotPassword
