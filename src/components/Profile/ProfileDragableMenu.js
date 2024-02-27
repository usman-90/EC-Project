import React, { useState, useRef, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import EditIcon from "../../../Asset/Images/Profile/edit-line.png";

const ProfileDragableMenu = ({ setData, query, refetchProperties }) => {
  const bottomSheet = useRef();

  useEffect(() => {
    console.log("DragableMenu");
  }, [])

  const closePanel = () => {
    bottomSheet.current.close();
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet ref={bottomSheet} height={300} >
        <TouchableOpacity onPress={closePanel} className="absolute pl-7 pt-11">
          <Icon name="close" style={{ fontSize: 30 }} />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <View className="pb-6">
            <Text className="text-lg font-bold">Change photo profile</Text>
          </View>
          <View className="p-4 border-b-[1px] border-gray-300 w-60 items-center">
            <TouchableOpacity>
              <Text className="text-primary">Delete</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 border-b-[1px] border-gray-300 w-60 items-center">
            <TouchableOpacity>
              <Text className="text-primary">Take A photo</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 w-60 items-center">
            <TouchableOpacity>
              <Text className="text-primary">Select from albums</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <TouchableOpacity onPress={() => bottomSheet.current.show()}>
        <Image source={EditIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pe_2: {
    paddingEnd: 10,
  },
  me_2: {
    marginEnd: 10,
  },
  iconStyleYellow: {
    fontSize: 20,
    color: "#FFC70F",
  },

  iconStyleGray: {
    fontSize: 20,
    color: "gray",
  },
  graph: {
    fontSize: 150,
    color: "#FFC70F",
    marginHorizontal: 1,
  },
});

export default React.memo(ProfileDragableMenu);
