import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Entypo from "react-native-vector-icons/Entypo";
import { StyleSheet, Text, View } from "react-native";
const SimpleMenu = () => {
  return (
    <MenuProvider>
      <View className="bg-red-200">
        <Menu className="bg-yellow-300 ">
          <MenuTrigger>
            <Entypo name="dots-three-vertical" size={16} color="black" />
          </MenuTrigger>
          <MenuOptions className="bg-blue-200">
            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
            <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
    </MenuProvider>
  );
};

export default SimpleMenu;
