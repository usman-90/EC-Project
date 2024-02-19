import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import LoginBg from "../../../assets/LoginImages/LoginBg.png";
import ContinueWithGoogle from "../../components/Login/ContinueWithGoogle";
import { useSelector, useDispatch } from "react-redux";
import { onGoogleButtonPress } from "../../apiFunctions/signInWithGoogle";
import { onFacebookButtonPress } from "../../apiFunctions/signInWithFacebook";

const SignIn = ({ navigation }) => {
  let dispatch = useDispatch()
  const propertyInformation = useSelector((state) => state?.property?.data);
  
  return (
    <View className="bg-black" style={styles.container}>
      <Image source={LoginBg} style={{ flex: 1.8 }} />
      <View
        className="flex bg-white px-6"
        style={[styles.container, styles.rounded_t_xl]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-8"
        >
          <Text className="bg-primary text-center py-3 rounded-xl text-white text-base ">
            Login with Email And Password
          </Text>
        </TouchableOpacity>
        <View
          className="mt-[20px]"
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
            onPress={() => {
              onGoogleButtonPress(dispatch, navigation, propertyInformation)
              .then((e) => {
                console.log("Signed in with Google!",e);
              })
              .catch(error => {
                console.log("Error on Google sign in:", error);
              });
            }
            }
          />
        </View>
        <View
          className="mt-[10px]"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onFacebookButtonPress(dispatch, navigation).then(() =>
                console.log("Signed in with Facebook!"),
              );
            }}
            className="flex-row items-center bg-gray-100 py-2 w-full justify-center rounded-lg"
          >
            <AntDesignIcon
              name="facebook-square"
              style={{ marginHorizontal: 10, fontSize: 22, color: "#316FF6" }}
            />
            <Text className="text-black">Continue with facebook</Text>
          </TouchableOpacity>
        </View>
        <View
          className="mt-[20px] "
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-gray-500">
              Don't have an account?{" "}
              <Text className="text-primary">Register</Text>
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
