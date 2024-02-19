import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search/index";
import LoginStack from "./LoginStackNavigator";
import BottomNavigator from "./BottomNavigator";
import { useSelector } from "react-redux";

const RootStack = () => {
  const RootNavigator = createStackNavigator();

  const { token } = useSelector((state) => {
    console.log("Redux values", state);
    return state?.user?.data;
  });

  if (token) {
    return (
      <RootNavigator.Navigator>
        <RootNavigator.Screen
          name="BottomTabStack"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <RootNavigator.Screen
          name="LoginStack"
          component={LoginStack}
          options={{ headerShown: false }}
        />
        <RootNavigator.Screen
          name="ModalStack"
          component={ModalStack}
          options={{ headerShown: false }}
        />
      </RootNavigator.Navigator>
    );
  } else {
    return (
      <RootNavigator.Navigator>
        <RootNavigator.Screen
          name="LoginStack"
          component={LoginStack}
          options={{ headerShown: false }}
        />
        <RootNavigator.Screen
          name="BottomTabStack"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <RootNavigator.Screen
          name="ModalStack"
          component={ModalStack}
          options={{ headerShown: false }}
        />
      </RootNavigator.Navigator>
    );
  }
};
export default RootStack;

const ModalStack = () => {
  const ModalNavigator = createStackNavigator();
  return (
    <ModalNavigator.Navigator presentation="modal">
      <ModalNavigator.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </ModalNavigator.Navigator>
  );
};
