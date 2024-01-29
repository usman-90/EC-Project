import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Loginpage from "../screens/Login";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ProfileStack from "./ProfileStack";
import SaveStack from "./SaveStack";
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        console.log(label);
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            className="items-center bg-white py-4 justify-center"
          >
            <AntDesignIcon
              name={`${
                label === "HomeStack"
                  ? "home"
                  : label === "SearchStack"
                    ? "search1"
                    : label === "SaveStack"
                      ? "tago"
                      : "profile"
              }`}
              style={{ fontSize: 22, color: isFocused ? "#FFC70F" : "black" }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomNavigation = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <BottomNavigation.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <BottomNavigation.Screen
        options={{ headerShown: false }}
        name="HomeStack"
        component={HomeStack}
      />
      <BottomNavigation.Screen
        name="SearchStack"
        component={SearchStack}
        options={{ headerShown: false }}
      />
      <BottomNavigation.Screen
        name="SaveStack"
        component={SaveStack}
        options={{ headerShown: false }}
      />
      <BottomNavigation.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </BottomNavigation.Navigator>
  );
}
