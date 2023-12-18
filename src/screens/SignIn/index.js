import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import LoginBg from "../../../assets/LoginImages/LoginBg.png";
import ContinueWithGoogle from "../../components/Login/ContinueWithGoogle";

const SignIn = ({ navigation }) => {
  return (
    <View className="bg-black" style={styles.container}>
      <Image source={LoginBg} style={{ flex: 1.8 }} />
      <View
        className="flex bg-white px-6"
        style={[styles.container, styles.rounded_t_xl]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeStack")}
          className="mt-8"
        >
          <Text className="bg-primary text-center py-3 rounded-xl text-white text-base ">
            Countinue with Mobile Number
          </Text>
        </TouchableOpacity>
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
            text="Continue With Facebook"
            textColor="black"
          />
        </View>
	  <View 
          className="mt-[20px]"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
	  >
	  <TouchableOpacity>
	  <Text className="text-gray-500">
	  Already have an account? <Text className="text-primary">Register</Text>
	  </Text>
	  </TouchableOpacity>
	  </View>
      </View>
    </View>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rounded_t_xl: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
