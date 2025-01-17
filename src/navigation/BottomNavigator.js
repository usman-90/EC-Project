import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Loginpage from "../screens/Login";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ProfileStack from "./ProfileStack";
import SaveStack from "./SaveStack";
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CreatePropertyStack from "./CreatePropertyStack";


function MyTabBar(props) {
  const { state, descriptors, navigation } = props
  let hideTabBar = false;
  if (state?.history) {
    for (const obj of state?.history) {
      const key = obj.key; // Assuming the property name is "key"
      if (typeof key === 'string' && key.includes("CreatePropertyStack")) {
        hideTabBar = true;
        break;
      }
    }
  }
  console.log("hide tabBar", hideTabBar);
  return (
    <View style={{ flexDirection: "row", display: hideTabBar? 'none': 'flex' }}>
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
            key={index}
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
                      : label === "CreatePropertyStack"
                        ? "plus"
                        : "user"
              }`}
              style={{
                fontSize: 22,
                color: isFocused ? "#FFC70F" : "black",
                backgroundColor:
                  label === "CreatePropertyStack" ? "#FFF5D3" : "transparent",
                borderRadius: 20,
                padding: 5,
              }}
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
        key={1111}
      />
      <BottomNavigation.Screen
        name="SearchStack"
        component={SearchStack}
        options={{ headerShown: false }}
        key={2222}
      />
      <BottomNavigation.Screen
        name="CreatePropertyStack"
        component={CreatePropertyStack}
        options={{ headerShown: false }}
        key={3333}
      />
      <BottomNavigation.Screen
        name="SaveStack"
        component={SaveStack}
        options={{ headerShown: false }}
        key={4444}
      />
      <BottomNavigation.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
        key={5555}
      />
    </BottomNavigation.Navigator>
  );
}
