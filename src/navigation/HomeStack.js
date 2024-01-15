import { createStackNavigator } from "@react-navigation/stack";
import Properties from "../screens/Properties";

const HomeStack = () => {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen
        name="Home"
        component={Properties}
        options={{ headerShown: false }}
      />
    </HomeNavigator.Navigator>
  );
};
export default HomeStack;
