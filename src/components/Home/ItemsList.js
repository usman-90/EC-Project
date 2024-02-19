import React from "react";
import Item from "./Item";
import { styled } from "nativewind";
import { View, FlatList, SafeAreaView } from "react-native";

export default function ItemsList({ Items }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        scrollEnabled={false}
        data={Items}
        renderItem={(prop, i) => <Item {...prop} key={i} />}
      />
    </SafeAreaView>
  );
}
