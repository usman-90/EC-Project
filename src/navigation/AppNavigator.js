import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search/index";
import LoginStack from "./LoginStackNavigator";
import BottomNavigator from "./BottomNavigator";

const RootStack = () => {
  const RootNavigator = createStackNavigator();
  return (
    <RootNavigator.Navigator>
      <RootNavigator.Screen
        name="LoginStack"
        component={LoginStack}
        options={{ headerShown: false }}
      />
      <RootNavigator.Screen
        name="HomeStack"
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
