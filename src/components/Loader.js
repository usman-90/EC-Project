import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const Loader = ({ message, percent }) => {
  console.log("Message", message);
  return (
    <View className="" style={styles.loader}>
      <ActivityIndicator size="large" color={"#FFC70F"} />
      {message && <Text>{message}...</Text>}
      {percent > 0 && <Text>{percent}% completed</Text>}
    </View>
  );
};
export default Loader;

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    zIndex: 19,
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
