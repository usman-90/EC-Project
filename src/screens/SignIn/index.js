import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginBg from "../../../assets/LoginImages/LoginBg.png";

const SignIn = () => {
  return (
    <View className="bg-black" style={styles.container}>
      <Image source={LoginBg} style={{ flex: 1.8 }} />
      <View
        className="flex bg-white"
        style={[styles.container, styles.rounded_t_xl]}
      ></View>
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
