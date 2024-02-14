import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyList = () => {
  return (
    <View style={styles.container} className="">
      <Text style={styles.text} className="mt-12 items-center justify-center">
        Ops! No properties to display
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#888",
  },
});

export default EmptyList;
